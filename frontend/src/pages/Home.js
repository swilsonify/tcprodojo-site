import { Link } from 'react-router-dom';
import { Dumbbell, Users, Trophy, Calendar } from 'lucide-react';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Dumbbell,
      title: 'Professional Training',
      description: 'Learn from experienced pros who have competed at the highest levels of professional wrestling.'
    },
    {
      icon: Users,
      title: 'Small Class Sizes',
      description: 'Personal attention in every session. We keep our classes small to ensure quality instruction.'
    },
    {
      icon: Trophy,
      title: 'Championship Results',
      description: 'Our graduates have gone on to compete in major promotions worldwide since 2004.'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Multiple class times throughout the week to fit your training into your busy life.'
    }
  ];

  const testimonials = [
    {
      name: 'Mike "The Hammer" Rodriguez',
      role: 'Professional Wrestler',
      text: 'Training at Torture Chamber transformed my career. The dedication and expertise of the coaches is unmatched. I went from amateur to pro in just two years.'
    },
    {
      name: 'Sarah "Lightning" Chen',
      role: 'Independent Circuit Champion',
      text: 'The intensity and professionalism here pushed me beyond my limits. Best decision I ever made was walking through these doors.'
    },
    {
      name: 'James "Titan" Williams',
      role: 'Former Student, Current Trainer',
      text: 'Started as a student in 2010, now I\'m proud to train the next generation. This place builds champions, period.'
    }
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-pattern pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-block">
              <img 
                src="/images/circle-logo.jpg" 
                alt="Torture Chamber Logo" 
                className="w-40 h-40 mx-auto rounded-full mb-4 object-cover"
                style={{ aspectRatio: '1/1' }}
              />
              <div className="text-blue-400 font-semibold tracking-widest text-sm">TRAIN LIKE A CHAMPION</div>
            </div>
          </div>

          {/* Main Title with Logo Image */}
          <div className="mb-6 animate-fade-in-up stagger-1">
            <img 
              src="/images/torture-chamber-logo.png" 
              alt="Torture Chamber" 
              className="max-w-2xl mx-auto w-full"
            />
          </div>
          <p className="text-blue-400 text-xl md:text-2xl font-semibold mb-4 animate-fade-in-up stagger-2">
            PRO WRESTLING DOJO
          </p>

          <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up stagger-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Excuses Are Your Own.</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Step into the ring. Commit to your strength. Whether you're here for pro wrestling, boxing, or pushing your limits, 
              Torture Chamber is where dreams become reality. We don't train amateurs. We build champions. 
              Train with the best to become the best. Founded by world-class pro wrestlers in 2004.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-4">
            <Link
              to="/classes"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-all hover-lift"
              data-testid="view-classes-button"
            >
              VIEW CLASS SCHEDULE
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-blue-500 hover:bg-blue-500 text-white font-bold rounded-lg text-lg transition-all hover-lift"
              data-testid="get-started-button"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white torture-text mb-4">WHY TRAIN WITH US</h2>
            <div className="gradient-border mx-auto w-24 mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We've been building champions for over two decades. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-blue-500/20 rounded-lg p-6 hover-lift"
                data-testid={`feature-${index}`}
              >
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white torture-text mb-4">CHAMPION TESTIMONIALS</h2>
            <div className="gradient-border mx-auto w-24 mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hear from those who've walked the path from trainee to champion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black to-gray-900 border border-blue-500/20 rounded-lg p-8 hover-lift"
                data-testid={`testimonial-${index}`}
              >
                <div className="text-blue-500 text-5xl mb-4">"</div>
                <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-blue-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-950">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white torture-text mb-6">READY TO BECOME A CHAMPION?</h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Join the next generation of professional wrestlers. Your journey starts here.
          </p>
          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xl transition-all hover-lift"
            data-testid="cta-contact-button"
          >
            START YOUR JOURNEY
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;