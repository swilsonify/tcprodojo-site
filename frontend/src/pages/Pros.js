import { useEffect } from 'react';
import { Award, Users as UsersIcon } from 'lucide-react';

const Pros = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trainers = [
    {
      name: 'Mike "The Hammer" Rodriguez',
      title: 'Head Coach & Founder',
      specialty: 'Technical Wrestling & Power Moves',
      experience: '20+ years',
      bio: 'Former world champion with over two decades of in-ring experience. Mike founded Torture Chamber in 2004 with a vision to create the premier wrestling training facility. His technical expertise and passion for teaching have shaped hundreds of successful careers.',
      achievements: [
        'World Heavyweight Champion (2x)',
        'Tag Team Champion (4x)',
        'Trained over 200 professional wrestlers',
        'Featured in major promotions worldwide'
      ]
    },
    {
      name: 'Sarah "Lightning" Chen',
      title: 'Senior Instructor',
      specialty: 'High-Flying & Technical Precision',
      experience: '15+ years',
      bio: 'One of the most respected names in women\'s wrestling. Sarah brings innovation and precision to every class. Her high-flying style and technical mastery make her an invaluable asset to our training team.',
      achievements: [
        'Women\'s Champion (3x)',
        'International Tournament Winner',
        'Recognized as "Wrestler of the Year" 2018',
        'Pioneer in women\'s wrestling techniques'
      ]
    },
    {
      name: 'James "Titan" Williams',
      title: 'Performance Coach',
      specialty: 'Character Work & Ring Psychology',
      experience: '12+ years',
      bio: 'A Torture Chamber alumni who returned to give back. James understands the journey from student to professional better than anyone. His focus on character development and storytelling sets our students apart.',
      achievements: [
        'Independent Circuit Champion',
        'Trained under Mike Rodriguez',
        'Over 500 professional matches',
        'Expert in promo and microphone work'
      ]
    },
    {
      name: 'Tony "The Beast" Morrison',
      title: 'Strength & Conditioning Coach',
      specialty: 'Physical Training & Power Development',
      experience: '18+ years',
      bio: 'Former powerlifter turned wrestling coach. Tony\'s strength and conditioning programs have helped countless wrestlers reach their physical peak. His focus on injury prevention and optimal performance is unmatched.',
      achievements: [
        'Certified Strength Coach',
        'Former Powerlifting Champion',
        'Sports Nutrition Specialist',
        'Developed TC training methodology'
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4" data-testid="pros-page">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white torture-text mb-4">OUR TRAINERS</h1>
          <div className="gradient-border mx-auto w-24 mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Learn from the best in the business. Our coaching staff brings decades of combined experience 
            from the world's top wrestling promotions.
          </p>
        </div>

        {/* Trainers */}
        <div className="max-w-6xl mx-auto space-y-12">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className={`bg-black border border-blue-500/20 rounded-lg overflow-hidden hover-lift ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex flex-col md:flex`}
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

        {/* Why Our Trainers Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-br from-black to-gray-900 border border-blue-500/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white torture-text text-center mb-8">WHY TRAIN WITH US</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Real Experience</h3>
              <p className="text-gray-300">
                Every coach on our team has competed at the professional level. They don't just teach theory - 
                they share real experiences from the ring.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Industry Connections</h3>
              <p className="text-gray-300">
                Our trainers maintain active relationships with promoters and bookers worldwide. Your success 
                is our success, and we'll help open doors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Personalized Attention</h3>
              <p className="text-gray-300">
                We limit class sizes to ensure every student gets individual feedback and coaching. 
                You're not just a number here.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Proven Track Record</h3>
              <p className="text-gray-300">
                With over 200 graduates competing professionally around the world, our results speak for themselves. 
                We build careers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pros;