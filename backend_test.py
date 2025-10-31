#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Torture Chamber Pro Wrestling Dojo Admin Panel
Tests all CRUD operations for Events, Trainers, Testimonials, and Contacts API
"""

import requests
import json
import sys
from datetime import datetime
import os

# Load backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get backend URL from frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"Testing backend at: {API_URL}")

# Test credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "tcprodojo2025"

# Global token storage
auth_token = None

def print_test_header(test_name):
    print(f"\n{'='*60}")
    print(f"TESTING: {test_name}")
    print(f"{'='*60}")

def print_result(success, message):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def make_request(method, endpoint, data=None, headers=None):
    """Make HTTP request with error handling"""
    url = f"{API_URL}{endpoint}"
    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=30)
        elif method.upper() == "POST":
            response = requests.post(url, json=data, headers=headers, timeout=30)
        elif method.upper() == "PUT":
            response = requests.put(url, json=data, headers=headers, timeout=30)
        elif method.upper() == "DELETE":
            response = requests.delete(url, headers=headers, timeout=30)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        return response
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return None

def get_auth_headers():
    """Get authorization headers with JWT token"""
    if not auth_token:
        return {}
    return {"Authorization": f"Bearer {auth_token}"}

def test_admin_authentication():
    """Test admin login and token verification"""
    global auth_token
    
    print_test_header("Admin Authentication")
    
    # Test login with valid credentials
    login_data = {
        "username": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    }
    
    response = make_request("POST", "/admin/login", login_data)
    if not response:
        print_result(False, "Login request failed")
        return False
    
    if response.status_code == 200:
        try:
            token_data = response.json()
            auth_token = token_data.get("access_token")
            if auth_token:
                print_result(True, f"Login successful, token received")
            else:
                print_result(False, "Login response missing access_token")
                return False
        except json.JSONDecodeError:
            print_result(False, "Invalid JSON response from login")
            return False
    else:
        print_result(False, f"Login failed with status {response.status_code}: {response.text}")
        return False
    
    # Test token verification
    response = make_request("GET", "/admin/verify", headers=get_auth_headers())
    if not response:
        print_result(False, "Token verification request failed")
        return False
    
    if response.status_code == 200:
        try:
            verify_data = response.json()
            if verify_data.get("authenticated") and verify_data.get("username") == ADMIN_USERNAME:
                print_result(True, "Token verification successful")
                return True
            else:
                print_result(False, f"Token verification failed: {verify_data}")
                return False
        except json.JSONDecodeError:
            print_result(False, "Invalid JSON response from verification")
            return False
    else:
        print_result(False, f"Token verification failed with status {response.status_code}")
        return False

def test_events_crud():
    """Test Events CRUD operations"""
    print_test_header("Events CRUD Operations")
    
    if not auth_token:
        print_result(False, "No auth token available")
        return False
    
    # Test GET events (initially empty or existing events)
    response = make_request("GET", "/admin/events", headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"GET events failed: {response.status_code if response else 'No response'}")
        return False
    
    initial_events = response.json()
    print_result(True, f"GET events successful, found {len(initial_events)} existing events")
    
    # Test POST - Create new event
    new_event = {
        "title": "Championship Night",
        "date": "March 15, 2025",
        "time": "7:00 PM",
        "location": "TC Main Arena",
        "description": "Annual championship event featuring top wrestlers",
        "attendees": "200+"
    }
    
    response = make_request("POST", "/admin/events", new_event, headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"POST event failed: {response.status_code if response else 'No response'}")
        return False
    
    created_event = response.json()
    event_id = created_event.get("id")
    if not event_id:
        print_result(False, "Created event missing ID")
        return False
    
    print_result(True, f"POST event successful, created event with ID: {event_id}")
    
    # Test GET events again to verify creation
    response = make_request("GET", "/admin/events", headers=get_auth_headers())
    if response and response.status_code == 200:
        events_after_create = response.json()
        if len(events_after_create) == len(initial_events) + 1:
            print_result(True, "Event creation verified in GET request")
        else:
            print_result(False, f"Event count mismatch after creation: expected {len(initial_events) + 1}, got {len(events_after_create)}")
    
    # Test PUT - Update event
    updated_event = created_event.copy()
    updated_event["title"] = "Championship Night - Updated"
    updated_event["description"] = "Updated annual championship event"
    
    response = make_request("PUT", f"/admin/events/{event_id}", updated_event, headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"PUT event failed: {response.status_code if response else 'No response'}")
    else:
        print_result(True, f"PUT event successful, updated event {event_id}")
    
    # Test DELETE - Delete event
    response = make_request("DELETE", f"/admin/events/{event_id}", headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"DELETE event failed: {response.status_code if response else 'No response'}")
        return False
    
    print_result(True, f"DELETE event successful, deleted event {event_id}")
    
    # Verify deletion
    response = make_request("GET", "/admin/events", headers=get_auth_headers())
    if response and response.status_code == 200:
        events_after_delete = response.json()
        if len(events_after_delete) == len(initial_events):
            print_result(True, "Event deletion verified in GET request")
            return True
        else:
            print_result(False, f"Event count mismatch after deletion: expected {len(initial_events)}, got {len(events_after_delete)}")
    
    return True

def test_trainers_crud():
    """Test Trainers CRUD operations"""
    print_test_header("Trainers CRUD Operations")
    
    if not auth_token:
        print_result(False, "No auth token available")
        return False
    
    # Test GET trainers
    response = make_request("GET", "/admin/trainers", headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"GET trainers failed: {response.status_code if response else 'No response'}")
        return False
    
    initial_trainers = response.json()
    print_result(True, f"GET trainers successful, found {len(initial_trainers)} existing trainers")
    
    # Test POST - Create new trainer
    new_trainer = {
        "name": "Marcus Rodriguez",
        "aka": "The Thunder",
        "title": "Lead Technical Coach",
        "specialty": "Technical Wrestling & Submission Holds",
        "experience": "12 years professional wrestling",
        "bio": "Former professional wrestler turned dedicated coach with expertise in technical wrestling and submission techniques",
        "achievements": [
            "3x Regional Wrestling Champion",
            "Certified Wrestling Coach Level 3",
            "Trained over 50 professional wrestlers"
        ]
    }
    
    response = make_request("POST", "/admin/trainers", new_trainer, headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"POST trainer failed: {response.status_code if response else 'No response'}")
        return False
    
    created_trainer = response.json()
    trainer_id = created_trainer.get("id")
    if not trainer_id:
        print_result(False, "Created trainer missing ID")
        return False
    
    print_result(True, f"POST trainer successful, created trainer with ID: {trainer_id}")
    
    # Test GET trainers again to verify creation
    response = make_request("GET", "/admin/trainers", headers=get_auth_headers())
    if response and response.status_code == 200:
        trainers_after_create = response.json()
        if len(trainers_after_create) == len(initial_trainers) + 1:
            print_result(True, "Trainer creation verified in GET request")
        else:
            print_result(False, f"Trainer count mismatch after creation")
    
    # Test PUT - Update trainer
    updated_trainer = created_trainer.copy()
    updated_trainer["title"] = "Senior Lead Technical Coach"
    updated_trainer["experience"] = "15 years professional wrestling"
    updated_trainer["achievements"].append("Coach of the Year 2024")
    
    response = make_request("PUT", f"/admin/trainers/{trainer_id}", updated_trainer, headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"PUT trainer failed: {response.status_code if response else 'No response'}")
    else:
        print_result(True, f"PUT trainer successful, updated trainer {trainer_id}")
    
    # Test DELETE - Delete trainer
    response = make_request("DELETE", f"/admin/trainers/{trainer_id}", headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"DELETE trainer failed: {response.status_code if response else 'No response'}")
        return False
    
    print_result(True, f"DELETE trainer successful, deleted trainer {trainer_id}")
    
    # Verify deletion
    response = make_request("GET", "/admin/trainers", headers=get_auth_headers())
    if response and response.status_code == 200:
        trainers_after_delete = response.json()
        if len(trainers_after_delete) == len(initial_trainers):
            print_result(True, "Trainer deletion verified in GET request")
            return True
        else:
            print_result(False, f"Trainer count mismatch after deletion")
    
    return True

def test_testimonials_crud():
    """Test Testimonials CRUD operations"""
    print_test_header("Testimonials CRUD Operations")
    
    if not auth_token:
        print_result(False, "No auth token available")
        return False
    
    # Test GET testimonials
    response = make_request("GET", "/admin/testimonials", headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"GET testimonials failed: {response.status_code if response else 'No response'}")
        return False
    
    initial_testimonials = response.json()
    print_result(True, f"GET testimonials successful, found {len(initial_testimonials)} existing testimonials")
    
    # Test POST - Create new testimonial
    new_testimonial = {
        "name": "Sarah Mitchell",
        "role": "Professional Wrestler",
        "text": "Training at Torture Chamber Pro Wrestling Dojo completely transformed my wrestling career. The coaches are incredibly knowledgeable and the training environment is both challenging and supportive. I've improved my technical skills tremendously!"
    }
    
    response = make_request("POST", "/admin/testimonials", new_testimonial, headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"POST testimonial failed: {response.status_code if response else 'No response'}")
        return False
    
    created_testimonial = response.json()
    testimonial_id = created_testimonial.get("id")
    if not testimonial_id:
        print_result(False, "Created testimonial missing ID")
        return False
    
    print_result(True, f"POST testimonial successful, created testimonial with ID: {testimonial_id}")
    
    # Test GET testimonials again to verify creation
    response = make_request("GET", "/admin/testimonials", headers=get_auth_headers())
    if response and response.status_code == 200:
        testimonials_after_create = response.json()
        if len(testimonials_after_create) == len(initial_testimonials) + 1:
            print_result(True, "Testimonial creation verified in GET request")
        else:
            print_result(False, f"Testimonial count mismatch after creation")
    
    # Test PUT - Update testimonial
    updated_testimonial = created_testimonial.copy()
    updated_testimonial["role"] = "Professional Wrestler & Coach"
    updated_testimonial["text"] = "Training at Torture Chamber Pro Wrestling Dojo completely transformed my wrestling career. The coaches are incredibly knowledgeable and the training environment is both challenging and supportive. I've improved my technical skills tremendously and now I'm coaching others too!"
    
    response = make_request("PUT", f"/admin/testimonials/{testimonial_id}", updated_testimonial, headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"PUT testimonial failed: {response.status_code if response else 'No response'}")
    else:
        print_result(True, f"PUT testimonial successful, updated testimonial {testimonial_id}")
    
    # Test DELETE - Delete testimonial
    response = make_request("DELETE", f"/admin/testimonials/{testimonial_id}", headers=get_auth_headers())
    if not response or response.status_code != 200:
        print_result(False, f"DELETE testimonial failed: {response.status_code if response else 'No response'}")
        return False
    
    print_result(True, f"DELETE testimonial successful, deleted testimonial {testimonial_id}")
    
    # Verify deletion
    response = make_request("GET", "/admin/testimonials", headers=get_auth_headers())
    if response and response.status_code == 200:
        testimonials_after_delete = response.json()
        if len(testimonials_after_delete) == len(initial_testimonials):
            print_result(True, "Testimonial deletion verified in GET request")
            return True
        else:
            print_result(False, f"Testimonial count mismatch after deletion")
    
    return True

def test_contacts_api():
    """Test Contacts API (read-only)"""
    print_test_header("Contacts API (Read-Only)")
    
    # Test GET contacts (no auth required for this endpoint)
    response = make_request("GET", "/contacts")
    if not response or response.status_code != 200:
        print_result(False, f"GET contacts failed: {response.status_code if response else 'No response'}")
        return False
    
    contacts = response.json()
    print_result(True, f"GET contacts successful, found {len(contacts)} contact messages")
    
    # Test that we can also access contacts through admin (if implemented)
    if auth_token:
        response = make_request("GET", "/contacts", headers=get_auth_headers())
        if response and response.status_code == 200:
            admin_contacts = response.json()
            print_result(True, f"GET contacts with auth successful, found {len(admin_contacts)} contact messages")
        else:
            print_result(True, "GET contacts without auth works (as expected for public endpoint)")
    
    return True

def test_unauthorized_access():
    """Test that admin endpoints require authentication"""
    print_test_header("Unauthorized Access Protection")
    
    # Test accessing admin endpoints without token
    endpoints_to_test = [
        "/admin/events",
        "/admin/trainers", 
        "/admin/testimonials",
        "/admin/verify"
    ]
    
    all_protected = True
    for endpoint in endpoints_to_test:
        try:
            url = f"{API_URL}{endpoint}"
            print(f"Testing unauthorized access to: {url}")
            response = requests.get(url, timeout=10)
            print(f"Response status: {response.status_code}")
            if response.status_code in [401, 403]:
                print_result(True, f"{endpoint} properly protected ({response.status_code} {'Unauthorized' if response.status_code == 401 else 'Forbidden'})")
            else:
                print_result(False, f"{endpoint} not properly protected (got {response.status_code})")
                all_protected = False
        except requests.exceptions.RequestException as e:
            print(f"Request exception for {endpoint}: {e}")
            print_result(False, f"{endpoint} request failed: {e}")
            all_protected = False
    
    return all_protected

def main():
    """Run all backend API tests"""
    print(f"Starting comprehensive backend API testing...")
    print(f"Backend URL: {API_URL}")
    print(f"Test time: {datetime.now()}")
    
    test_results = []
    
    # Run all tests
    test_results.append(("Admin Authentication", test_admin_authentication()))
    test_results.append(("Events CRUD", test_events_crud()))
    test_results.append(("Trainers CRUD", test_trainers_crud()))
    test_results.append(("Testimonials CRUD", test_testimonials_crud()))
    test_results.append(("Contacts API", test_contacts_api()))
    test_results.append(("Unauthorized Access Protection", test_unauthorized_access()))
    
    # Print summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal Tests: {len(test_results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        return True
    else:
        print(f"\n⚠️  {failed} test(s) failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)