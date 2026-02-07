import Link from 'next/link';
import { Check, X, ArrowRight, Calculator, CreditCard } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      nepali: 'सुरुवात',
      description: 'Perfect for small neighborhood shops',
      oneTime: 28000,
      monthly: 2000,
      features: [
        { text: 'Nepali POS System', included: true },
        { text: 'Basic inventory tracking', included: true },
        { text: 'eSewa & Khalti integration', included: true },
        { text: 'Email support', included: true },
        { text: 'Basic training (2 sessions)', included: true },
        { text: 'AI forecasting', included: false },
        { text: 'Voice alerts', included: false },
        { text: 'CRM system', included: false },
        { text: 'Phone support', included: false },
      ],
      popular: false,
      color: 'tech-blue'
    },
    {
      name: 'Professional',
      nepali: 'व्यावसायिक',
      description: 'Most popular for medium shops',
      oneTime: 35000,
      monthly: 3500,
      features: [
        { text: 'Everything in Starter', included: true },
        { text: 'AI inventory forecasting', included: true },
        { text: 'Voice alerts in Nepali', included: true },
        { text: 'CRM with उधारो tracking', included: true },
        { text: 'WhatsApp integration', included: true },
        { text: 'Phone support (9 AM - 6 PM)', included: true },
        { text: 'Advanced training (5 sessions)', included: true },
        { text: 'Smart auto-reordering', included: false },
        { text: '24/7 priority support', included: false },
      ],
      popular: true,
      color: 'heritage-red'
    },
    {
      name: 'Premium',
      nepali: 'प्रिमियम',
      description: 'For growing multi-shop owners',
      oneTime: 45000,
      monthly: 5000,
      features: [
        { text: 'Everything in Professional', included: true },
        { text: 'Smart auto-reordering assistant', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: '24/7 priority support', included: true },
        { text: 'Custom training sessions (unlimited)', included: true },
        { text: 'Multi-shop management', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'API access', included: true },
      ],
      popular: false,
      color: 'tech-purple'
    }
  ];

  const addons = [
    { name: 'Additional Tablet', price: 15000, type: 'one-time' },
    { name: 'Extra Training Session', price: 3000, type: 'per session' },
    { name: 'Custom Integration', price: 'Contact us', type: '' },
    { name: 'Hardware Maintenance', price: 1000, type: 'per month' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-heritage-red to-heritage-gold text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            No hidden costs. Investment that pays for itself in 4-6 months.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold">
            <Check size={20} />
            <span>30 Days Free Trial • No Credit Card Required</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  plan.popular ? 'border-4 border-heritage-red transform md:scale-105' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-heritage-red text-white px-6 py-2 rounded-full font-bold shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-${plan.color} font-semibold mb-2`}>{plan.nepali}</p>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6 pb-6 border-b">
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">One-time Setup:</span>
                      <div className="text-3xl font-bold">₹ {plan.oneTime.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Monthly:</span>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-heritage-red">₹ {plan.monthly.toLocaleString()}</span>
                        <span className="text-gray-500 ml-2">/month</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        {feature.included ? (
                          <Check className="text-success flex-shrink-0 mt-1" size={18} />
                        ) : (
                          <X className="text-gray-300 flex-shrink-0 mt-1" size={18} />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`block w-full text-center py-4 px-6 rounded-lg font-bold transition-all ${
                      plan.popular
                        ? 'bg-heritage-red text-white hover:bg-red-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-center">Add-Ons & Extras</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addons.map((addon, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-heritage-red transition-colors">
                  <h4 className="font-bold mb-2">{addon.name}</h4>
                  <div className="text-2xl font-bold text-heritage-red mb-1">
                    {typeof addon.price === 'number' ? `₹ ${addon.price.toLocaleString()}` : addon.price}
                  </div>
                  {addon.type && <div className="text-sm text-gray-600">{addon.type}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <Calculator size={48} className="mx-auto text-heritage-red mb-4" />
            <h2 className="text-4xl font-bold mb-4">Calculate Your ROI</h2>
            <p className="text-xl text-gray-600">See how quickly your investment pays for itself</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border-2 border-gray-200">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Current Monthly Revenue (₹)</label>
                <input
                  type="number"
                  placeholder="e.g., 200000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Current Monthly Inventory Cost (₹)</label>
                <input
                  type="number"
                  placeholder="e.g., 150000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red"
                />
              </div>
              <button className="w-full bg-heritage-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-all">
                Calculate Potential Savings
              </button>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-success mb-2">₹ 36,000</div>
                  <div className="text-gray-600">Additional Revenue/Year</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-heritage-red mb-2">₹ 18,000</div>
                  <div className="text-gray-600">Cost Savings/Year</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-tech-blue mb-2">5.2 Months</div>
                  <div className="text-gray-600">Payback Period</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <CreditCard size={48} className="mx-auto text-heritage-red mb-4" />
            <h2 className="text-4xl font-bold mb-4">Flexible Payment Options</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Full Payment</h3>
              <div className="text-3xl font-bold text-heritage-red mb-3">5% OFF</div>
              <p className="text-gray-600">Pay the setup fee in full and save 5% on your first year</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-heritage-red">
              <h3 className="text-xl font-bold mb-3">Installments</h3>
              <div className="text-3xl font-bold text-heritage-red mb-3">Available</div>
              <p className="text-gray-600">Split payments over 3-6 months with our partner banks</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Microfinance</h3>
              <div className="text-3xl font-bold text-heritage-red mb-3">Low Interest</div>
              <p className="text-gray-600">Special rates through our microfinance partnerships</p>
            </div>
          </div>

          <div className="mt-8 bg-success/10 border-2 border-success/30 rounded-xl p-6 text-center">
            <p className="text-lg font-semibold text-gray-900">
              🎉 Government Subsidy Eligible • Up to 30% funding available for eligible shops
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Pricing FAQ</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Are there any hidden costs?',
                a: 'Absolutely not. The prices shown include everything you need to get started. The only additional costs would be optional add-ons you choose to purchase.'
              },
              {
                q: 'What happens after the 30-day trial?',
                a: 'You can choose to continue with a paid plan or cancel with no obligation. We\'ll remind you 7 days before your trial ends.'
              },
              {
                q: 'Can I change plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. We\'ll adjust your billing accordingly.'
              },
              {
                q: 'Is there a refund policy?',
                a: 'We offer a 60-day money-back guarantee. If you\'re not satisfied, we\'ll refund your setup fee in full.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-heritage-red to-heritage-gold text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your free 30-day trial today. No credit card required.
          </p>
          <Link href="/contact" className="btn-primary bg-white text-heritage-red hover:bg-gray-100 inline-flex items-center">
            Start Free Trial
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
