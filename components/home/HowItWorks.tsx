import Link from 'next/link';
import { ClipboardCheck, Settings, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <ClipboardCheck size={40} />,
      title: 'Assessment',
      nepali: 'मूल्याङ्कन',
      description: 'We visit your shop, understand your needs, and create a customized plan that fits your business.',
      duration: 'Week 1',
      color: 'from-tech-blue to-blue-600'
    },
    {
      number: '02',
      icon: <Settings size={40} />,
      title: 'Setup',
      nepali: 'स्थापना',
      description: 'Professional installation of hardware and software. We handle everything while you focus on your business.',
      duration: 'Week 2-3',
      color: 'from-tech-purple to-purple-600'
    },
    {
      number: '03',
      icon: <GraduationCap size={40} />,
      title: 'Training',
      nepali: 'तालिम',
      description: 'Comprehensive training for you and your family in Nepali. Learn at your own pace with ongoing support.',
      duration: 'Week 4-8',
      color: 'from-heritage-gold to-yellow-600'
    },
    {
      number: '04',
      icon: <TrendingUp size={40} />,
      title: 'Growth',
      nepali: 'बृद्धि',
      description: 'Watch your business thrive with real-time insights, automated operations, and continuous improvement.',
      duration: 'Ongoing',
      color: 'from-success to-green-600'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block bg-tech-purple/10 text-tech-purple px-4 py-2 rounded-full font-semibold mb-4">
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Transform in <span className="text-gradient">Four Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From traditional to digital in just 6 months. We guide you every step of the way.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-tech-blue via-tech-purple via-heritage-gold to-success transform -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-transparent hover:border-heritage-red">
                  {/* Step Number */}
                  <div className="absolute -top-4 right-4 w-16 h-16 bg-gradient-to-br from-heritage-red to-heritage-gold rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 transform hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {step.duration}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-heritage-red font-semibold mb-4">
                    {step.nepali}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="text-gray-300" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-12 rounded-2xl border-2 border-gray-200">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to Start Your Transformation?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 50+ shop owners who have already transformed their business with our proven 4-step process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
                Schedule Free Assessment
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link href="/how-it-works" className="btn-secondary inline-flex items-center justify-center">
                Learn More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
