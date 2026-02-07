'use client';

import { Star, Quote } from 'lucide-react';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Ram Bahadur Thapa',
      nepali: 'राम बहादुर थापा',
      age: 67,
      location: 'Kathmandu',
      shop: 'Ram Ko Pasal',
      quote: 'At first I was scared of technology. But this system is so simple, even my 7-year-old grandson helped me learn it. Now my sales are up 20% and I never run out of stock!',
      nepaliQuote: 'पहिले म प्रविधिदेखि डराएको थिएँ। तर यो प्रणाली यति सजिलो छ, मेरो ७ वर्षको नातिले पनि मलाई सिकायो।',
      revenue: '+18%',
      months: 4
    },
    {
      name: 'Sita Devi Sharma',
      nepali: 'सीता देवी शर्मा',
      age: 62,
      location: 'Lalitpur',
      shop: 'Sita Kirana Store',
      quote: 'The voice alerts in Nepali are wonderful! Now I know immediately when payment comes through eSewa or when stock is low. My daughter helped me set it up.',
      nepaliQuote: 'नेपालीमा आवाज सचेतना अद्भुत छ! अब मलाई तुरुन्तै थाहा हुन्छ।',
      revenue: '+22%',
      months: 6
    },
    {
      name: 'Krishna Prasad Poudel',
      nepali: 'कृष्ण प्रसाद पौडेल',
      age: 58,
      location: 'Bhaktapur',
      shop: 'Krishna General Store',
      quote: 'The digital उधारो system changed everything. No more forgotten debts, automatic SMS reminders, and my customers appreciate the professional approach.',
      nepaliQuote: 'डिजिटल उधारो प्रणालीले सबै परिवर्तन गर्यो। अब कुनै ऋण बिर्सिदैन।',
      revenue: '+15%',
      months: 5
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block bg-success/10 text-success px-4 py-2 rounded-full font-semibold mb-4">
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            From Struggle to <span className="text-success">Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real shop owners sharing their transformation journeys
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-heritage-gold/20">
                <Quote size={48} />
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-heritage-gold fill-heritage-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 relative z-10 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Nepali Quote */}
              <p className="text-gray-500 text-sm mb-6 italic border-l-4 border-heritage-gold pl-4">
                {testimonial.nepaliQuote}
              </p>

              {/* Owner Info */}
              <div className="border-t pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-heritage-red to-heritage-gold flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.nepali}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>{testimonial.shop} • {testimonial.location}</div>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center text-success font-semibold">
                      {testimonial.revenue} Revenue ↑
                    </span>
                    <span className="text-gray-400">•</span>
                    <span>{testimonial.months} months</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before/After Stats */}
        <div className="mt-16 bg-gradient-to-r from-heritage-red to-heritage-gold p-8 md:p-12 rounded-2xl text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-white/90">Shops Transformed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">18%</div>
              <div className="text-white/90">Average Revenue Increase</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">95%</div>
              <div className="text-white/90">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
