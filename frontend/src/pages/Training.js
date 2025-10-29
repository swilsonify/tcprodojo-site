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
        'Video package creation',
        'Unlimited class access',
        'One-on-one coaching',
        'Performance opportunities'
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4" data-testid="training-page">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white torture-text mb-4">TRAINING PROGRAMS</h1>
          <div className="gradient-border mx-auto w-24 mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Choose the program that matches your goals. Whether you're just starting out or ready to turn pro, 
            we have a path designed for you.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`bg-black border rounded-lg p-8 hover-lift relative ${
                program.popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-blue-500/20'
              }`}
              data-testid={`program-${index}`}
            >
              {program.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
                <div className="text-blue-400 font-semibold mb-4">{program.duration} Program</div>
                <div className="text-4xl font-bold text-white mb-2">{program.price}</div>
              </div>

              <p className="text-gray-400 mb-6">{program.description}</p>

              <div className="space-y-3 mb-8">
                {program.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start space-x-2">
                    <Check className="text-blue-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-center transition-colors"
                data-testid={`enroll-${index}-button`}
              >
                ENROLL NOW
              </Link>
            </div>
          ))}
        </div>

        {/* What You'll Learn Section */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-black to-gray-900 border border-blue-500/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white torture-text text-center mb-8">WHAT YOU'LL LEARN</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">In-Ring Skills</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Safe bumping and falling techniques</li>
                <li>• Strike work and selling</li>
                <li>• Technical wrestling holds</li>
                <li>• High-flying maneuvers</li>
                <li>• Power moves and slams</li>
                <li>• Match flow and timing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Performance Skills</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Character development</li>
                <li>• Promo and microphone work</li>
                <li>• Crowd psychology</li>
                <li>• Storytelling in matches</li>
                <li>• Ring psychology</li>
                <li>• Professional presentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Physical Conditioning</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Strength training protocols</li>
                <li>• Cardiovascular conditioning</li>
                <li>• Flexibility and mobility</li>
                <li>• Injury prevention</li>
                <li>• Recovery techniques</li>
                <li>• Nutrition guidance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Professional Development</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Industry networking</li>
                <li>• Booking etiquette</li>
                <li>• Contract basics</li>
                <li>• Social media presence</li>
                <li>• Creating your brand</li>
                <li>• Career guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;