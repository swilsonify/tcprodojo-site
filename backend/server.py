from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Wrestling Class Models
class WrestlingClass(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: int
    day: str
    time: str
    title: str
    instructor: str
    level: str
    spots: int

# Booking Models
class BookingCreate(BaseModel):
    class_id: int
    name: str
    email: str
    date: str

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    class_id: int
    name: str
    email: str
    date: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Contact Form Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    subject: str
    message: str


# Admin Authentication Models
SECRET_KEY = os.environ.get('JWT_SECRET', 'tcprodojo-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours

security = HTTPBearer()

class AdminUser(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Admin Content Models
class EventModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    date: str
    time: str
    location: str
    description: str
    attendees: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TrainerModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    aka: str = ""
    title: str
    specialty: str
    experience: str
    bio: str
    achievements: List[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialModel(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    text: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Helper functions for admin auth
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Classes Endpoints
@api_router.get("/classes", response_model=List[WrestlingClass])
async def get_classes():
    # Return default classes with both wrestling and boxing
    default_classes = [
        # PRO WRESTLING CLASSES
        {"id": 1, "day": "Monday", "time": "6:00 PM - 8:00 PM", "title": "Beginner Pro Wrestling", "instructor": "Coach Mike", "level": "Beginner", "spots": 8},
        {"id": 2, "day": "Monday", "time": "8:00 PM - 10:00 PM", "title": "Advanced Pro Wrestling", "instructor": "Coach Sarah", "level": "Advanced", "spots": 5},
        {"id": 3, "day": "Tuesday", "time": "7:00 PM - 9:00 PM", "title": "High-Flying & Lucha", "instructor": "Coach James", "level": "Intermediate", "spots": 6},
        {"id": 4, "day": "Wednesday", "time": "6:00 PM - 8:00 PM", "title": "Ring Psychology & Promos", "instructor": "Coach Mike", "level": "All Levels", "spots": 10},
        {"id": 5, "day": "Thursday", "time": "7:00 PM - 9:00 PM", "title": "Technical Wrestling", "instructor": "Coach Sarah", "level": "Intermediate", "spots": 7},
        {"id": 6, "day": "Friday", "time": "6:00 PM - 8:00 PM", "title": "Pro Wrestling Fundamentals", "instructor": "Coach Mike", "level": "Beginner", "spots": 8},
        {"id": 7, "day": "Friday", "time": "8:00 PM - 10:00 PM", "title": "Pro Wrestling Sparring", "instructor": "All Coaches", "level": "Advanced", "spots": 10},
        {"id": 8, "day": "Saturday", "time": "10:00 AM - 12:00 PM", "title": "Pro Pathway Weekend Training", "instructor": "Coach James", "level": "All Levels", "spots": 15},
        # BOXING CLASSES
        {"id": 9, "day": "Monday", "time": "5:00 PM - 6:30 PM", "title": "Boxing Beginners", "instructor": "Coach Tony", "level": "Beginner", "spots": 12},
        {"id": 10, "day": "Tuesday", "time": "6:00 PM - 7:30 PM", "title": "Advanced Boxing", "instructor": "Coach Tony", "level": "Advanced", "spots": 8},
        {"id": 11, "day": "Wednesday", "time": "5:00 PM - 6:30 PM", "title": "Boxing Technique", "instructor": "Coach Marcus", "level": "Intermediate", "spots": 10},
        {"id": 12, "day": "Thursday", "time": "6:00 PM - 7:30 PM", "title": "Boxing Sparring", "instructor": "Coach Tony", "level": "Advanced", "spots": 6},
        {"id": 13, "day": "Saturday", "time": "9:00 AM - 10:30 AM", "title": "Self-Defense Boxing", "instructor": "Coach Marcus", "level": "All Levels", "spots": 15},
        # FITNESS
        {"id": 14, "day": "Wednesday", "time": "8:00 PM - 10:00 PM", "title": "Strength & Conditioning", "instructor": "Coach Tony", "level": "All Levels", "spots": 12},
        {"id": 15, "day": "Saturday", "time": "2:00 PM - 4:00 PM", "title": "Pro Athlete Training", "instructor": "Coach Sarah", "level": "Advanced", "spots": 5},
    ]
    return default_classes

# Bookings Endpoints
@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):
    booking = Booking(**booking_data.model_dump())
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = booking.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    try:
        await db.bookings.insert_one(doc)
        logger.info(f"Booking created: {booking.name} for class {booking.class_id}")
    except Exception as e:
        logger.error(f"Error creating booking: {e}")
    
    return booking

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for booking in bookings:
        if isinstance(booking.get('created_at'), str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return bookings

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(contact_data: ContactCreate):
    contact = ContactMessage(**contact_data.model_dump())
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    try:
        await db.contacts.insert_one(doc)
        logger.info(f"Contact form submitted: {contact.name} - {contact.subject}")
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
    
    return contact

@api_router.get("/contacts", response_model=List[ContactMessage])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    
    return contacts

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()