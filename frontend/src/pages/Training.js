import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Training = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wrestlingPrograms = [
    {
      title: 'Beginner',
      subtitle: 'ALL AGES',
      duration: '3-6 Months',
      price: '$299/month',
      description: 'Step into the ring for the first time. Learn the fundamentals of pro wrestling from day one.',
      features: [
        'Safe bump falls, turnbuckle, clothesline',
        'Ring awareness and positioning',
        'Fundamental holds and moves',
        'Safety protocols and etiquette',
        'Basic training, conditioning and practice routines',
        '2-3 classes per week'
      ]
    },
    {
      title: 'Advanced',
      subtitle: 'Curriculum',
      duration: '6-12 Months',
      price: '$399/month',
      description: 'Develop cutting-edge ring psychology and high-skill sequences that will take your abilities to the next level.',
      features: [
        'Advanced technical wrestling',
        'High-flying maneuvers and specialty moves',
        'Character development and persona',
        'Promo and microphone skills',
        'Match psychology and storytelling',
        '3-4 classes per week',
        'Sparring sessions with pros'
      ],
      popular: true
    },
    {
      title: 'Pro Pathway',
      subtitle: 'Promotion Or Deployment',
      duration: '12+ Months',
      price: '$599/month',
      description: 'Join the Pro Track where student meets industry. Receive advanced training and booking opportunities into shows for real experience.',
      features: [
        'All intermediate curriculum included',
        'Advanced character work and branding',
        'Industry networking and connections',
        'Booking opportunities at live events',
        'Video package creation for promoters',
        'Unlimited class access',
        'One-on-one coaching sessions',
        'Performance opportunities at partner promotions'
      ]
    }
  ];

  const boxingPrograms = [
    {
      title: 'Boxing Beginners',
      subtitle: 'ALL AGES',
      duration: 'Ongoing',
      price: '$249/month',
      features: [
        'Foundation, proper stance, hand position',
        'Footwork, head movement, and defense',
        'Basic training, conditioning and practice routines',
        '2-3 classes per week'
      ]
    },
    {
      title: 'Advanced',
      subtitle: 'Curriculum',
      duration: 'Ongoing',
      price: '$349/month',
      features: [
        'Advanced combination techniques',
        'Sparring training with live opponents',
        'Strength and conditioning focus',
        'Competition prep if desired',
        '3-4 classes per week'
      ]
    },
    {
      title: 'Self-Defense',
      subtitle: 'Learn How To Protect Yourself',
      duration: 'Ongoing',
      price: '$199/month',
      features: [
        'Practical self-defense techniques',
        'Fitness, cardio, and endurance building',
        'For all levels of experience',
        'It makes you strong, capable and confident!',
        '2 classes per week'
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4" data-testid="training-page">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <img 
              src="/images/your-excuses-v2.webp" 
              alt="Your Excuses Are Your Own" 
              className="max-w-4xl mx-auto w-full px-4"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white torture-text mb-4">TRAINING PROGRAMS</h1>
          <div className="gradient-border mx-auto w-24 mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Whether you're here to train in pro wrestling, boxing, or want to push your limits through combat sports, 
            we have proven pathways to take you from beginner to professional athlete.
          </p>
        </div>

        {/* PRO WRESTLING CLASSES */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white torture-text text-center mb-4">PRO WRESTLING CLASSES</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Step into the ring. Commit to your strength. Built by world-class pro wrestlers for ALL ages. 
            Qualified instruction in a safe learning environment. Guidance at each stage of your respective progression. 
            Train with us from any experience - we'll train you to be the best.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {wrestlingPrograms.map((program, index) => (
              <div
                key={index}
                className={`bg-black border rounded-lg p-8 hover-lift relative ${
                  program.popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-blue-500/20'
                }`}
                data-testid={`wrestling-program-${index}`}
              >
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-white mb-1">{program.title}</h3>
                  <div className="text-blue-400 text-sm font-semibold mb-4">{program.subtitle}</div>
                  <div className="text-gray-400 mb-2">{program.duration} Program</div>
                  <div className="text-4xl font-bold text-white mb-2">{program.price}</div>
                </div>

                {program.description && (
                  <p className="text-gray-400 mb-6 text-center">{program.description}</p>
                )}

                <div className="space-y-3 mb-8">
                  {program.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start space-x-2">
                      <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-center transition-colors"
                  data-testid={`enroll-wrestling-${index}-button`}
                >
                  SIGN UP NOW
                </Link>
              </div>
            ))}
          </div>

          {/* Why Train With Us */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-black to-gray-900 border border-blue-500/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">Why Train With Us?</h3>
            <p className="text-gray-300 text-center">
              Founded by pro wrestlers Mike "The Hammer" Rodriguez and team in 2004, we've developed hundreds of successful 
              professional wrestlers. Our curriculum is designed by those who actually competed at the highest level. 
              We push you to your absolute limits - molding raw talent into championship-caliber athletes.
            </p>
          </div>
        </div>

        {/* BOXING CLASSES */}
        <div>
          <h2 className="text-4xl font-bold text-white torture-text text-center mb-4">BOXING CLASSES</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Boxing is more than sport. It's art, discipline, mindset — it's a skill today employed in many combat sports. 
            Whether you're looking to go pro or learn skills through our self-defense curriculum, we're ready to help your goals.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {boxingPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-black border border-blue-500/20 rounded-lg p-8 hover-lift"
                data-testid={`boxing-program-${index}`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-white mb-1">{program.title}</h3>
                  <div className="text-blue-400 text-sm font-semibold mb-4">{program.subtitle}</div>
                  <div className="text-gray-400 mb-2">{program.duration}</div>
                  <div className="text-4xl font-bold text-white mb-2">{program.price}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {program.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start space-x-2">
                      <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-center transition-colors"
                  data-testid={`enroll-boxing-${index}-button`}
                >
                  SIGN UP NOW
                </Link>
              </div>
            ))}
          </div>

          {/* Boxing Info */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-black to-gray-900 border border-blue-500/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">How To Enroll / Tryout Info</h3>
            <p className="text-gray-300 text-center">
              Ready to commit? First, submit an inquiry via our contact form. Our beginner classes start with free TRYOUT sessions 
              to see if we're right for you - no strings attached. We run classes throughout the week at various experience levels. 
              Each Training Track entry is a one-time sign-up fee and monthly membership. Reach out today to start your journey!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;