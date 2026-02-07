import Link from 'next/link';
import { Check, ArrowRight, Star } from 'lucide-react';

export default function PricingPreview() {
  const plans = [
    {
      name: 'Starter',
      nepali: 'सुरुवात',
      description: 'Perfect for small neighborhood shops',
      oneTime: '28,000',
      monthly: '2,000',
      features: [
        'Nepali POS System',
        'Basic inventory tracking',
        'Payment integration (eSewa, Khalti)',
        'Email support',
        'Training included'
      ],
      popular: false
    },
    {
      name: 'Professional',
      nepali: 'व्यावसायिक',
      description: 'Most popular for medium shops',
      oneTime: '35,000',
      monthly: '3,500',
      features: [
        'Everything in Starter',
        'AI inventory forecasting',
        'Voice alerts in Nepali',
        'CRM with उधारो tracking',
        'WhatsApp integration',
        'Phone support'
      ],
      popular: true
    },
    {
      name: 'Premium',
      nepali: 'प्रिमियम',
      description: 'For growing multi-shop owners',
      oneTime: '45,000',
      monthly: '5,000',
      features: [
        'Everything in Professional',
        'Smart auto-reordering',
        'Advanced analytics',
        'Priority 24/7 support',
        'Custom training sessions',
        'Multiple shop management'
      ],
      popular: false
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block bg-heritage-red/10 text-heritage-red px-4 py-2 rounded-full font-semibold mb-4">
            Affordable Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Investment That <span className="text-gradient">Pays for Itself</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Transparent pricing with no hidden costs. ROI in 4-6 months guaranteed.
          </p>
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full font-semibold">
            <Check size={18} />
            <span>30 Days Free Trial • No Credit Card Required</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                plan.popular ? 'border-4 border-heritage-red transform md:scale-105' : 'border border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-heritage-red to-heritage-gold text-white px-6 py-2 rounded-bl-2xl font-bold flex items-center space-x-1">
                  <Star size={16} className="fill-white" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-heritage-red font-semibold mb-4">
                  {plan.nepali}
                </p>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-gray-600 text-sm mr-2">One-time:</span>
                    <span className="text-3xl font-bold text-gray-900">₹ {plan.oneTime}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-gray-600 text-sm mr-2">Monthly:</span>
                    <span className="text-3xl font-bold text-heritage-red">₹ {plan.monthly}</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="text-success flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/pricing"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
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

        {/* Bottom CTA */}
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Not sure which plan is right for you?
          </h3>
          <p className="text-gray-600 mb-6">
            Let us help you choose the perfect solution for your shop
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
              Talk to an Expert
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center">
              View Full Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
