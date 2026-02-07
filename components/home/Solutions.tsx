import Link from 'next/link';
import { Tablet, Brain, Users, ArrowRight } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      icon: <Tablet size={48} />,
      title: 'Simple Technology',
      nepali: 'सजिलो प्रविधि',
      description: 'Large Nepali interface designed for elderly shop owners. No complicated menus or confusing buttons.',
      features: ['Large fonts', 'Voice commands', 'One-tap operations'],
      color: 'from-tech-blue to-blue-600'
    },
    {
      icon: <Brain size={48} />,
      title: 'Smart Automation',
      nepali: 'स्मार्ट स्वचालन',
      description: 'AI-powered assistance that learns your business patterns and helps you make better decisions.',
      features: ['Auto-reordering', 'Sales forecasting', 'Waste reduction'],
      color: 'from-tech-purple to-purple-600'
    },
    {
      icon: <Users size={48} />,
      title: 'Community First',
      nepali: 'समुदाय पहिले',
      description: 'Built specifically for elderly owners with family support and Nepali-speaking assistance.',
      features: ['Family training', '24/7 Nepali support', 'No age barriers'],
      color: 'from-heritage-red to-red-600'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block bg-heritage-red/10 text-heritage-red px-4 py-2 rounded-full font-semibold mb-4">
            Our Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Transform Your Business in <span className="text-gradient">Three Ways</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete digital transformation designed specifically for Nepal's traditional Kirana shops
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Colored Header */}
              <div className={`bg-gradient-to-br ${solution.color} p-8 text-white`}>
                <div className="mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {solution.title}
                </h3>
                <p className="text-white/90 text-lg">
                  {solution.nepali}
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-gray-600 mb-6">
                  {solution.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-success"></div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t">
                  <Link
                    href="/solutions"
                    className="inline-flex items-center text-heritage-red font-semibold hover:gap-2 transition-all"
                  >
                    Learn More
                    <ArrowRight className="ml-1" size={18} />
                  </Link>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-heritage-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/solutions" className="btn-primary inline-flex items-center">
            Explore All Solutions
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
