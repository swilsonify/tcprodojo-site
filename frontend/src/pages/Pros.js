import { useEffect } from 'react';
import { Award, Users as UsersIcon, Trophy } from 'lucide-react';

const Pros = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const proGraduates = [
    {
      name: 'Alex "The Apex" Martinez',
      promotion: 'Major League Wrestling',
      achievement: 'MLW Champion 2023',
      yearGraduated: '2018',
      bio: 'Trained at TC from 2016-2018. Now competing on national television and touring internationally.'
    },
    {
      name: 'Victoria "V-Force" Stone',
      promotion: 'Independent Circuit',
      achievement: 'Women\'s Champion (Multiple Promotions)',
      yearGraduated: '2019',
      bio: 'Started as a complete beginner at Torture Chamber. Now one of the most sought-after talents on the independent scene.'
    },
    {
      name: 'Marcus "The Machine" Johnson',
      promotion: 'International Tours',
      achievement: 'Touring UK & Japan',
      yearGraduated: '2020',
      bio: 'TC Pro Pathway graduate. Currently touring with major promotions across Europe and Asia.'
    },
    {
      name: 'Sofia "La Reina" Rodriguez',
      promotion: 'AAA Lucha Libre',
      achievement: 'Tag Team Champion',
      yearGraduated: '2021',
      bio: 'Specialized in high-flying Lucha style at TC. Now performing for one of Mexico\'s premier wrestling companies.'
    },
    {
      name: 'David "Dominator" Chen',
      promotion: 'NWA',
      achievement: 'Television Regular',
      yearGraduated: '2017',
      bio: 'One of our earliest success stories. Regular on NWA programming and mentor to current TC students.'
    },
    {
      name: 'Isabella "Fury" Thompson',
      promotion: 'GCW & Beyond',
      achievement: 'Death Match Specialist',
      yearGraduated: '2022',
      bio: 'Trained in both wrestling and boxing at TC. Known for her fearless hardcore style and technical prowess.'
    }
  ];

  const trainers = [
    {
      name: 'Rodney Kellman',
      aka: 'Dru Onyx / Soa Amin',
      title: 'Head Coach & Founder',
      specialty: 'All Aspects of Pro Wrestling',
      experience: '20+ years',
      bio: 'Founder of Torture Chamber Pro Wrestling Dojo in 2004. Rodney has over two decades of experience as both a performer and promoter. His vision was to create Montreal\'s premier training facility for aspiring professional wrestlers. Under his guidance, TC has produced champions who compete globally.',
      achievements: [
        'Founded Torture Chamber Dojo - 2004',
        'Trained 200+ professional wrestlers',
        'Promoter & Wrestling Coach',
        'Connections with major promotions worldwide'
      ]
    },
    {
      name: 'Coach Sarah Martinez',
      aka: 'Sarah "Lightning" Chen',
      title: 'Senior Wrestling Instructor',
      specialty: 'Technical Wrestling & High-Flying',
      experience: '15+ years',
      bio: 'Former independent circuit champion and one of the most respected names in women\'s wrestling. Sarah brings precision and innovation to every class. Her technical mastery and high-flying style make her an invaluable asset to our training team.',
      achievements: [
        'Women\'s Champion (3x)',
        'International Tournament Winner',
        'Technical Wrestling Specialist',
        'Pioneer in women\'s wrestling training'
      ]
    },
    {
      name: 'Coach Marcus "Titan" Williams',
      aka: '',
      title: 'Performance & Boxing Coach',
      specialty: 'Character Work, Boxing & Conditioning',
      experience: '12+ years',
      bio: 'Marcus specializes in character development, ring psychology, and boxing fundamentals. His comprehensive approach helps students develop both their in-ring skills and their on-camera presence. He understands what it takes to succeed in the modern wrestling landscape.',
      achievements: [
        'Former Independent Champion',
        'Certified Boxing Coach',
        'Over 500 professional matches',
        'Expert in promo and character work'
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4" data-testid="pros-page">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white torture-text mb-4">OUR PROS</h1>
          <div className="gradient-border mx-auto w-24 mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Meet the champions we've built and the world-class coaches who train them.
          </p>
        </div>

        {/* PRO GRADUATES SECTION */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-400 mb-4">TC GRADUATES GONE PRO</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our students compete on the biggest stages around the world. These are just a few of the many success stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {proGraduates.map((graduate, index) => (
              <div
                key={index}
                className="bg-black border border-blue-500/20 rounded-lg p-6 hover-lift"
                data-testid={`graduate-${index}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="text-blue-500" size={32} />
                  <span className="text-xs text-gray-500">Class of {graduate.yearGraduated}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{graduate.name}</h3>
                <div className="text-blue-400 text-sm font-semibold mb-1">{graduate.promotion}</div>
                <div className="text-gray-400 text-sm mb-3">{graduate.achievement}</div>
                
                <p className="text-gray-300 text-sm">{graduate.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TRAINERS SECTION */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-400 mb-4">OUR TRAINERS</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Learn from experienced professionals who have competed at the highest levels and are dedicated to developing the next generation.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {trainers.map((trainer, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black to-gray-900 border border-blue-500/20 rounded-lg overflow-hidden hover-lift flex flex-col md:flex-row"
                data-testid={`trainer-${index}`}
              >
                {/* Image Placeholder */}
                <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-900 to-black flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-blue-500/20 border-4 border-blue-500 flex items-center justify-center mb-4">
                      <UsersIcon size={64} className="text-blue-500" />
                    </div>
                    <div className="text-blue-400 font-semibold">{trainer.experience}</div>
                    <div className="text-gray-400 text-sm">Experience</div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-2/3 p-8">
                  <div className="mb-4">
                    <h2 className="text-3xl font-bold text-white mb-2">{trainer.name}</h2>
                    {trainer.aka && (
                      <div className="text-blue-400 text-sm mb-1">aka {trainer.aka}</div>
                    )}
                    <div className="text-blue-400 font-semibold mb-1">{trainer.title}</div>
                    <div className="text-gray-400 text-sm">
                      <span className="font-semibold">Specialty:</span> {trainer.specialty}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6">{trainer.bio}</p>

                  <div>
                    <div className="flex items-center space-x-2 text-blue-400 font-semibold mb-3">
                      <Award size={20} />
                      <span>Key Achievements</span>
                    </div>
                    <ul className="space-y-2">
                      {trainer.achievements.map((achievement, aIndex) => (
                        <li key={aIndex} className="text-gray-400 flex items-start space-x-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Them?</h2>
          <p className="text-blue-100 mb-6">
            Train with the best coaches and join our legacy of professional wrestlers. Your journey starts here.
          </p>
          <a
            href="/training"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition-colors"
            data-testid="cta-training-button"
          >
            START TRAINING TODAY
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pros;