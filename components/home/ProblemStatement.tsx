import { AlertCircle, TrendingDown, FileText, Smartphone } from 'lucide-react';

export default function ProblemStatement() {
  const challenges = [
    {
      icon: <TrendingDown size={40} />,
      title: 'Declining Footfall',
      description: 'Modern stores and online shopping are taking away customers'
    },
    {
      icon: <FileText size={40} />,
      title: 'Manual Errors',
      description: 'Paper records lead to inventory mistakes and lost revenue'
    },
    {
      icon: <AlertCircle size={40} />,
      title: 'Competition Pressure',
      description: 'Struggling to compete with modern retail experiences'
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Technology Barriers',
      description: 'Complex systems that are difficult for elderly owners to use'
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Your <span className="text-heritage-red">Pasal</span> Deserves Better
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional Kirana shops face unique challenges in today's digital world.
            Your community needs your pasal to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-heritage-red"
            >
              <div className="text-heritage-red mb-4">
                {challenge.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {challenge.title}
              </h3>
              <p className="text-gray-600">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-heritage-red to-heritage-gold p-8 md:p-12 rounded-2xl text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            But There's Hope...
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Technology designed specifically for Nepal's Kirana shops can turn these challenges into opportunities
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="font-semibold">Simple • Affordable • Effective</span>
          </div>
        </div>
      </div>
    </section>
  );
}
