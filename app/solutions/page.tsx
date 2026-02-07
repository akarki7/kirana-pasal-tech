import Link from 'next/link';
import { Tablet, Brain, Volume2, Users, ShoppingCart, Check, ArrowRight } from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'pos',
      icon: <Tablet size={64} />,
      title: 'Nepali POS System',
      nepali: 'नेपाली POS प्रणाली',
      tagline: 'Simple billing in your language',
      description: 'A point-of-sale system designed specifically for elderly Nepali shop owners. Large fonts, simple interface, and complete Nepali language support.',
      oneTime: 20000,
      monthly: 2000,
      color: 'from-tech-blue to-blue-600',
      features: [
        'Large Nepali text and numbers',
        'One-tap product entry',
        'Barcode scanner support',
        'Print or SMS receipts',
        'Daily sales reports',
        'Cash and digital payment tracking',
        'Works offline',
        'Simple return handling'
      ],
      benefits: [
        'No more manual billing errors',
        'Faster checkout = happier customers',
        'Track all transactions accurately',
        'Professional receipts build trust'
      ],
      videoDemo: true
    },
    {
      id: 'inventory',
      icon: <Brain size={64} />,
      title: 'AI Inventory Management',
      nepali: 'AI स्टक व्यवस्थापन',
      tagline: 'Never run out, never overstock',
      description: 'Artificial intelligence that learns your sales patterns and predicts when you need to reorder. Get voice alerts in Nepali when stock is low.',
      oneTime: 15000,
      monthly: 1500,
      color: 'from-tech-purple to-purple-600',
      features: [
        'Automatic stock level tracking',
        'Smart reorder predictions',
        'Voice alerts in Nepali',
        'WhatsApp notifications',
        'Seasonal pattern detection',
        'Expiry date warnings',
        'Waste reduction insights',
        'Supplier performance tracking'
      ],
      benefits: [
        '10% reduction in waste',
        'Never miss a sale due to stockout',
        'Reduce excess inventory by 15%',
        'Save hours of manual counting'
      ],
      videoDemo: true
    },
    {
      id: 'payment',
      icon: <Volume2 size={64} />,
      title: 'Smart Payment Speaker',
      nepali: 'स्मार्ट भुक्तानी स्पिकर',
      tagline: 'Hear payments instantly',
      description: 'A Bluetooth speaker that announces payment confirmations in Nepali. Know immediately when eSewa, Khalti, or bank payments arrive.',
      oneTime: 5000,
      monthly: 0,
      color: 'from-success to-green-600',
      features: [
        'Voice announcements in Nepali',
        'eSewa integration',
        'Khalti integration',
        'ConnectIPS support',
        'IME Pay support',
        'Custom sound for each payment type',
        'Volume control',
        'Battery backup'
      ],
      benefits: [
        'No more checking phone constantly',
        'Instant payment confirmation',
        'Serve customers faster',
        'Professional payment experience'
      ],
      videoDemo: true
    },
    {
      id: 'crm',
      icon: <Users size={64} />,
      title: 'Customer Relationship Management',
      nepali: 'ग्राहक सम्बन्ध प्रणाली',
      tagline: 'Remember every customer',
      description: 'Digital उधारो (credit) management, loyalty programs, and automated SMS reminders. Strengthen customer relationships and improve collections.',
      oneTime: 10000,
      monthly: 1000,
      color: 'from-heritage-red to-red-600',
      features: [
        'Digital उधारो ledger',
        'Automatic SMS reminders',
        'Customer purchase history',
        'Loyalty points system',
        'Birthday reminders',
        'Bulk SMS campaigns',
        'Customer segmentation',
        'Payment collection tracking'
      ],
      benefits: [
        'Improve उधारो collection by 25%',
        'Never forget a debt',
        'Increase repeat customers',
        'Build stronger community ties'
      ],
      videoDemo: true
    },
    {
      id: 'reordering',
      icon: <ShoppingCart size={64} />,
      title: 'Smart Reordering Assistant',
      nepali: 'स्मार्ट पुन: अर्डर सहायक',
      tagline: 'Automated supplier orders',
      description: 'Connect with suppliers via WhatsApp. Get reorder suggestions based on AI predictions. Place orders with one tap.',
      oneTime: 12000,
      monthly: 1200,
      color: 'from-heritage-gold to-yellow-600',
      features: [
        'WhatsApp supplier integration',
        'AI-powered order suggestions',
        'One-tap order placement',
        'Order history tracking',
        'Price comparison',
        'Delivery scheduling',
        'Payment reminder to suppliers',
        'Quality feedback system'
      ],
      benefits: [
        'Save 5+ hours per week',
        'Better supplier negotiations',
        'Never miss profitable items',
        'Optimal stock levels always'
      ],
      videoDemo: true
    }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-heritage-red to-heritage-gold text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Complete Digital Transformation Suite
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Five powerful solutions designed specifically for Nepal's Kirana shops
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {solutions.map((solution) => (
              <a
                key={solution.id}
                href={`#${solution.id}`}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
              >
                {solution.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Detail */}
      {solutions.map((solution, index) => (
        <section
          key={solution.id}
          id={solution.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-block bg-gradient-to-r ${solution.color} p-4 rounded-2xl text-white mb-6`}>
                  {solution.icon}
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-3">
                  {solution.title}
                </h2>
                <p className="text-2xl text-heritage-red font-semibold mb-4">
                  {solution.nepali}
                </p>
                <p className="text-xl text-gray-600 mb-6 italic">
                  {solution.tagline}
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {solution.description}
                </p>

                {/* Pricing */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600">One-time Setup</div>
                      <div className="text-3xl font-bold">₹ {solution.oneTime.toLocaleString()}</div>
                    </div>
                    {solution.monthly > 0 && (
                      <>
                        <div className="text-gray-300">+</div>
                        <div>
                          <div className="text-sm text-gray-600">Monthly</div>
                          <div className="text-3xl font-bold text-heritage-red">₹ {solution.monthly.toLocaleString()}</div>
                        </div>
                      </>
                    )}
                  </div>
                  <Link href="/contact" className="btn-primary w-full text-center block">
                    Get This Solution
                  </Link>
                </div>

                {/* Key Benefits */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="text-success flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Features */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-heritage-red">
                  <h3 className="text-2xl font-bold mb-6">Complete Features</h3>
                  <ul className="space-y-4">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 group">
                        <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-success/30 transition-colors">
                          <Check className="text-success" size={16} />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {solution.videoDemo && (
                    <div className="mt-8 pt-8 border-t">
                      <button className="w-full bg-gradient-to-r from-heritage-red to-heritage-gold text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center">
                        <ArrowRight className="mr-2" size={20} />
                        Watch Video Demo
                      </button>
                    </div>
                  )}
                </div>

                {/* Case Study Teaser */}
                <div className="mt-6 bg-gradient-to-br from-gray-100 to-white p-6 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">SUCCESS STORY</p>
                  <p className="font-semibold text-gray-900 mb-2">
                    "This solution increased my efficiency by 40%"
                  </p>
                  <p className="text-sm text-gray-600">- Ram Bahadur, Kathmandu</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Compare Solutions</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-heritage-red text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Solution</th>
                  <th className="px-6 py-4 text-left">Best For</th>
                  <th className="px-6 py-4 text-left">Setup Cost</th>
                  <th className="px-6 py-4 text-left">Monthly</th>
                  <th className="px-6 py-4 text-left">ROI Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {solutions.map((solution, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{solution.title}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {index === 0 && 'All shops'}
                      {index === 1 && 'Medium-large shops'}
                      {index === 2 && 'Digital payment users'}
                      {index === 3 && 'उधारो heavy shops'}
                      {index === 4 && 'Busy shop owners'}
                    </td>
                    <td className="px-6 py-4">₹ {solution.oneTime.toLocaleString()}</td>
                    <td className="px-6 py-4">₹ {solution.monthly.toLocaleString()}</td>
                    <td className="px-6 py-4 text-success font-semibold">3-5 months</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-heritage-red to-heritage-gold text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose individual solutions or get our complete package with a discount
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary bg-white text-heritage-red hover:bg-gray-100 inline-flex items-center justify-center">
              View Pricing Packages
            </Link>
            <Link href="/contact" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white/10 inline-flex items-center justify-center">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
