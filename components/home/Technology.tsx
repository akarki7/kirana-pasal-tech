import { Smartphone, Wifi, Shield, Zap, MessageSquare, BarChart3 } from 'lucide-react';

export default function Technology() {
  const features = [
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile-First Design',
      description: 'Works perfectly on tablets and phones'
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'Voice Commands',
      description: 'Speak in Nepali to control the system'
    },
    {
      icon: <Wifi size={32} />,
      title: 'Offline Mode',
      description: 'Keep working even without internet'
    },
    {
      icon: <Shield size={32} />,
      title: 'Bank-Level Security',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'No lag, instant responses'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Smart Analytics',
      description: 'AI-powered insights for better decisions'
    }
  ];

  const integrations = [
    { name: 'eSewa', color: 'bg-esewa' },
    { name: 'Khalti', color: 'bg-khalti' },
    { name: 'ConnectIPS', color: 'bg-tech-blue' },
    { name: 'IME Pay', color: 'bg-heritage-red' },
    { name: 'WhatsApp', color: 'bg-success' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 153, 51, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(107, 70, 193, 0.3) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-heritage-gold/20 text-heritage-gold px-4 py-2 rounded-full font-semibold mb-4">
            Technology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Yet <span className="text-heritage-gold">Simple</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade technology designed for simplicity. Built for Nepal, built for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              <div className="text-heritage-gold mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Integrations */}
        <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Integrated with Nepal's Leading Payment Platforms
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className={`${integration.color} px-8 py-4 rounded-lg text-white font-bold text-lg shadow-lg hover:scale-110 transition-transform`}
              >
                {integration.name}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-8">
            Real-time payment notifications • Automatic reconciliation • Zero transaction errors
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-heritage-gold mb-2">99.9%</div>
            <div className="text-gray-300">Uptime Guarantee</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-heritage-gold mb-2">&lt;2s</div>
            <div className="text-gray-300">Response Time</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-heritage-gold mb-2">ISO</div>
            <div className="text-gray-300">Security Certified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
