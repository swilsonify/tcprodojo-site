import { useEffect } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Student Showcase 2025',
      date: 'February 15, 2025',
      time: '7:00 PM',
      location: 'Torture Chamber Main Arena',
      description: 'Watch our students demonstrate what they\'ve learned in front of a live audience. See the future stars of professional wrestling in action!',
      attendees: '200+',
      price: 'Free',
      status: 'Open'
    },
    {
      id: 2,
      title: 'Pro Wrestling Workshop',
      date: 'March 8, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Torture Chamber Training Center',
      description: 'Special guest workshop with independent wrestling stars. Learn advanced techniques and get insider tips from working professionals.',
      attendees: '50',
      price: '$75',
      status: 'Selling Fast'
    },
    {
      id: 3,
      title: 'Championship Tryouts',
      date: 'April 22, 2025',
      time: '10:00 AM',
      location: 'Torture Chamber Main Arena',
      description: 'Open tryouts for our advanced performance team. Successful candidates will be featured in upcoming showcase events.',
      attendees: 'Limited',
      price: '$50',
      status: 'Registration Required'
    },
    {
      id: 4,
      title: 'Alumni Reunion Show',
      date: 'May 30, 2025',
      time: '6:00 PM',
      location: 'Torture Chamber Main Arena',
      description: 'A special event featuring Torture Chamber alumni who have gone on to professional success. Meet the graduates and see where training here can take you.',
      attendees: '300+',
      price: '$20',
      status: 'Open'
    }
  ];

  const pastEvents = [
    {
      title: 'Winter Training Camp 2024',
      date: 'December 2024',
      description: 'Intensive 2-week training camp with guest coaches from major promotions.'
    },
    {
      title: 'Fall Showcase 2024',
      date: 'October 2024',
      description: 'Student performance night featuring over 30 matches.'
    },
    {
      title: '20th Anniversary Celebration',
      date: 'April 2024',
      description: 'Celebrated 20 years of building champions with alumni from around the world.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Selling Fast': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Registration Required': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="pt-28 pb-20 px-4" data-testid="events-page">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white torture-text mb-4">EVENTS</h1>
          <div className="gradient-border mx-auto w-24 mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join us for showcases, workshops, and special events. Be part of the Torture Chamber community.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white torture-text mb-8">UPCOMING EVENTS</h2>
          
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-black border border-blue-500/20 rounded-lg p-6 hover-lift"
                data-testid={`event-${event.id}`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`mt-4 md:mt-0 inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{event.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-6 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Users size={16} />
                      <span>{event.attendees} attendees</span>
                    </div>
                    <div className="text-blue-400 font-semibold">{event.price}</div>
                  </div>
                  <Link
                    to="/contact"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors text-center"
                    data-testid={`register-event-${event.id}-button`}
                  >
                    REGISTER NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white torture-text mb-8">PAST EVENTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black to-gray-900 border border-blue-500/20 rounded-lg p-6"
                data-testid={`past-event-${index}`}
              >
                <div className="text-blue-400 text-sm font-semibold mb-2">{event.date}</div>
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6">
            Don't miss out on our events. Contact us to get added to our mailing list.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition-colors"
            data-testid="stay-updated-button"
          >
            GET NOTIFICATIONS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;