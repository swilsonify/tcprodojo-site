import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Training = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const programs = [
    {
      title: 'Beginner Fundamentals',
      duration: '3 Months',
      price: '$299/month',
      description: 'Perfect for those new to professional wrestling. Learn the basics of ring work, safety, and foundational techniques.',
      features: [
        'Basic bumps and falls',
        'Ring awareness and positioning',
        'Fundamental holds and moves',
        'Safety protocols',
        'Physical conditioning',
        '2 classes per week'
      ]
    },
    {
      title: 'Intermediate Development',
      duration: '6 Months',
      price: '$399/month',
      description: 'Take your skills to the next level. Advanced techniques, character development, and match psychology.',
      features: [
        'Advanced technical wrestling',
        'High-flying maneuvers',
        'Character development',
        'Promo and mic skills',
        'Match psychology',
        '3 classes per week',
        'Sparring sessions'
      ],
      popular: true
    },
    {
      title: 'Professional Track',
      duration: '12 Months',
      price: '$599/month',
      description: 'For serious athletes ready to go pro. Comprehensive training covering all aspects of professional wrestling.',
      features: [
        'All intermediate features',
        'Advanced character work',
        'Booking and promotion basics',
        'Industry connections',
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