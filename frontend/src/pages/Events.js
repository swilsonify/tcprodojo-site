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
      title: 'TC Winter Showcase 2025',
      date: 'February 15, 2025',
      time: '7:00 PM',
      location: 'Torture Chamber Main Arena',
      description: 'Watch our students and pro graduates battle it out in an action-packed evening of professional wrestling. Special guest appearances confirmed!',
      attendees: '200+',
      ticketLink: '/shop' // Links to shop page
    },
    {
      id: 2,
      title: 'Pro Wrestling Invitational',
      date: 'March 22, 2025',
      time: '8:00 PM',
      location: 'Montreal Convention Center',
      description: 'TC Pro Dojo presents an inter-promotional event featuring talent from across North America. Championship matches and special attractions.',
      attendees: '500+',
      ticketLink: '/shop'
    },
    {
      id: 3,
      title: 'Spring Training Exhibition',
      date: 'April 19, 2025',
      time: '6:00 PM',
      location: 'Torture Chamber Main Arena',
      description: 'See our advanced students showcase new moves and characters. Free admission for current TC students!',
      attendees: '150+',
      ticketLink: '/shop'
    },
    {
      id: 4,
      title: 'TC 21st Anniversary Celebration',
      date: 'June 7, 2025',
      time: '7:00 PM',
      location: 'Special Venue TBA',
      description: '21 years of building champions! A massive event celebrating TC history with alumni returns, championship matches, and surprises.',
      attendees: '1000+',
      ticketLink: '/shop'
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
                      <span>{event.attendees} expected</span>
                    </div>
                  </div>
                  <Link
                    to={event.ticketLink}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors text-center"
                    data-testid={`buy-tickets-${event.id}-button`}
                  >
                    BUY TICKETS
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