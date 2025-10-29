import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Classes = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState('All'); // New filter state

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API}/classes`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      // Use default classes if API fails
      setClasses(defaultClasses);
    } finally {
      setLoading(false);
    }
  };

  const defaultClasses = [
    // PRO WRESTLING CLASSES
    { id: 1, day: 'Monday', time: '6:00 PM - 8:00 PM', title: 'Beginner Pro Wrestling', instructor: 'Coach Mike', level: 'Beginner', spots: 8, type: 'Wrestling' },
    { id: 2, day: 'Monday', time: '8:00 PM - 10:00 PM', title: 'Advanced Pro Wrestling', instructor: 'Coach Sarah', level: 'Advanced', spots: 5, type: 'Wrestling' },
    { id: 3, day: 'Tuesday', time: '7:00 PM - 9:00 PM', title: 'High-Flying & Lucha', instructor: 'Coach James', level: 'Intermediate', spots: 6, type: 'Wrestling' },
    { id: 4, day: 'Wednesday', time: '6:00 PM - 8:00 PM', title: 'Ring Psychology & Promos', instructor: 'Coach Mike', level: 'All Levels', spots: 10, type: 'Wrestling' },
    { id: 5, day: 'Thursday', time: '7:00 PM - 9:00 PM', title: 'Technical Wrestling', instructor: 'Coach Sarah', level: 'Intermediate', spots: 7, type: 'Wrestling' },
    { id: 6, day: 'Friday', time: '6:00 PM - 8:00 PM', title: 'Pro Wrestling Fundamentals', instructor: 'Coach Mike', level: 'Beginner', spots: 8, type: 'Wrestling' },
    { id: 7, day: 'Friday', time: '8:00 PM - 10:00 PM', title: 'Pro Wrestling Sparring', instructor: 'All Coaches', level: 'Advanced', spots: 10, type: 'Wrestling' },
    { id: 8, day: 'Saturday', time: '10:00 AM - 12:00 PM', title: 'Pro Pathway Weekend Training', instructor: 'Coach James', level: 'All Levels', spots: 15, type: 'Wrestling' },
    
    // BOXING CLASSES
    { id: 9, day: 'Monday', time: '5:00 PM - 6:30 PM', title: 'Boxing Beginners', instructor: 'Coach Tony', level: 'Beginner', spots: 12, type: 'Boxing' },
    { id: 10, day: 'Tuesday', time: '6:00 PM - 7:30 PM', title: 'Advanced Boxing', instructor: 'Coach Tony', level: 'Advanced', spots: 8, type: 'Boxing' },
    { id: 11, day: 'Wednesday', time: '5:00 PM - 6:30 PM', title: 'Boxing Technique', instructor: 'Coach Marcus', level: 'Intermediate', spots: 10, type: 'Boxing' },
    { id: 12, day: 'Thursday', time: '6:00 PM - 7:30 PM', title: 'Boxing Sparring', instructor: 'Coach Tony', level: 'Advanced', spots: 6, type: 'Boxing' },
    { id: 13, day: 'Saturday', time: '9:00 AM - 10:30 AM', title: 'Self-Defense Boxing', instructor: 'Coach Marcus', level: 'All Levels', spots: 15, type: 'Boxing' },
    
    // STRENGTH & CONDITIONING
    { id: 14, day: 'Wednesday', time: '8:00 PM - 10:00 PM', title: 'Strength & Conditioning', instructor: 'Coach Tony', level: 'All Levels', spots: 12, type: 'Fitness' },
    { id: 15, day: 'Saturday', time: '2:00 PM - 4:00 PM', title: 'Pro Athlete Training', instructor: 'Coach Sarah', level: 'Advanced', spots: 5, type: 'Wrestling' },
  ];

  const currentClasses = classes.length > 0 ? classes : defaultClasses;
  
  // Filter classes based on selected type
  const filteredClasses = classFilter === 'All' 
    ? currentClasses 
    : currentClasses.filter(c => c.type === classFilter);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(selectedDate);

  const previousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handleBookClass = async (classItem) => {
    setSelectedClass(classItem);
    setShowBookingModal(true);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/bookings`, {
        class_id: selectedClass.id,
        name: bookingName,
        email: bookingEmail,
        date: selectedDate.toISOString()
      });
      alert('Class booked successfully!');
      setShowBookingModal(false);
      setBookingName('');
      setBookingEmail('');
    } catch (error) {
      console.error('Error booking class:', error);
      alert('Booking submitted! (Demo mode)');
      setShowBookingModal(false);
      setBookingName('');
      setBookingEmail('');
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  return (
    <div className="pt-28 pb-20 px-4" data-testid="classes-page">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white torture-text mb-4">CLASS SCHEDULE</h1>
          <div className="gradient-border mx-auto w-24 mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            View our weekly class schedule and book your spot. Classes fill up fast!
          </p>
        </div>

        {/* Calendar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-black border border-blue-500/20 rounded-lg p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-blue-500/10 rounded transition-colors"
                data-testid="prev-month-button"
              >
                <ChevronLeft className="text-blue-500" size={24} />
              </button>
              <h2 className="text-2xl font-bold text-white">
                {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-blue-500/10 rounded transition-colors"
                data-testid="next-month-button"
              >
                <ChevronRight className="text-blue-500" size={24} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Day Headers */}
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-blue-400 font-semibold text-sm py-2">
                  {day.slice(0, 3)}
                </div>
              ))}

              {/* Empty cells for days before month starts */}
              {[...Array(firstDay)].map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square"></div>
              ))}

              {/* Calendar Days */}
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                const dayName = daysOfWeek[date.getDay()];
                const hasClasses = currentClasses.some(c => c.day === dayName);
                const isToday = new Date().toDateString() === date.toDateString();

                return (
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg flex items-center justify-center cursor-pointer calendar-day ${
                      hasClasses ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-700'
                    } ${
                      isToday ? 'ring-2 ring-blue-500' : ''
                    }`}
                    data-testid={`calendar-day-${day}`}
                  >
                    <div className="text-center">
                      <div className={`text-lg font-semibold ${
                        hasClasses ? 'text-white' : 'text-gray-500'
                      }`}>
                        {day}
                      </div>
                      {hasClasses && (
                        <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white torture-text mb-4 text-center">WEEKLY CLASSES</h2>
          
          {/* Class Type Filter */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setClassFilter('All')}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                classFilter === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-black border border-blue-500/20 text-gray-400 hover:text-white'
              }`}
              data-testid="filter-all"
            >
              ALL CLASSES
            </button>
            <button
              onClick={() => setClassFilter('Wrestling')}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                classFilter === 'Wrestling' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-black border border-blue-500/20 text-gray-400 hover:text-white'
              }`}
              data-testid="filter-wrestling"
            >
              PRO WRESTLING
            </button>
            <button
              onClick={() => setClassFilter('Boxing')}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                classFilter === 'Boxing' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-black border border-blue-500/20 text-gray-400 hover:text-white'
              }`}
              data-testid="filter-boxing"
            >
              BOXING
            </button>
            <button
              onClick={() => setClassFilter('Fitness')}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                classFilter === 'Fitness' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-black border border-blue-500/20 text-gray-400 hover:text-white'
              }`}
              data-testid="filter-fitness"
            >
              FITNESS
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-black border border-blue-500/20 rounded-lg p-6 hover-lift"
                data-testid={`class-${classItem.id}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-white">{classItem.title}</h3>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-700 text-gray-300">
                        {classItem.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-400 mb-2">
                      <CalendarIcon size={16} />
                      <span className="font-semibold">{classItem.day}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock size={16} />
                      <span>{classItem.time}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(classItem.level)}`}>
                    {classItem.level}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-gray-300">
                    <span className="font-semibold">Instructor:</span> {classItem.instructor}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users size={16} />
                    <span>{classItem.spots} spots available</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBookClass(classItem)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                  data-testid={`book-class-${classItem.id}-button`}
                >
                  BOOK THIS CLASS
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" data-testid="booking-modal">
          <div className="bg-gray-900 border border-blue-500/20 rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Book {selectedClass?.title}</h3>
            <div className="text-gray-400 mb-6">
              <p>{selectedClass?.day} - {selectedClass?.time}</p>
              <p>Instructor: {selectedClass?.instructor}</p>
            </div>

            <form onSubmit={submitBooking}>
              <div className="mb-4">
                <label className="block text-white font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-black border border-blue-500/20 rounded text-white focus:outline-none focus:border-blue-500"
                  data-testid="booking-name-input"
                />
              </div>

              <div className="mb-6">
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-black border border-blue-500/20 rounded text-white focus:outline-none focus:border-blue-500"
                  data-testid="booking-email-input"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition-colors"
                  data-testid="cancel-booking-button"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                  data-testid="submit-booking-button"
                >
                  CONFIRM BOOKING
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;