'use client';

import { Phone, Mail, MapPin, MessageSquare, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    phone: '',
    location: '',
    message: '',
    language: 'nepali',
    contactTime: 'morning'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon. (This is a demo - no data is actually sent)');
  };

  const contactMethods = [
    {
      icon: <Phone size={32} />,
      title: 'Phone Support',
      subtitle: 'Nepali-speaking team',
      detail: '+977 1-234-5678',
      hours: '7 AM - 7 PM (7 days)',
      color: 'heritage-red'
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'WhatsApp',
      subtitle: 'Instant messaging',
      detail: 'Click to chat',
      hours: 'Fast response guaranteed',
      color: 'success'
    },
    {
      icon: <Mail size={32} />,
      title: 'Email',
      subtitle: '24/7 inbox',
      detail: 'info@kiranadigital.com.np',
      hours: 'Response within 24 hours',
      color: 'tech-blue'
    },
    {
      icon: <MapPin size={32} />,
      title: 'Visit Us',
      subtitle: 'Main office',
      detail: 'Kathmandu, Nepal',
      hours: 'Mon-Sat: 9 AM - 5 PM',
      color: 'tech-purple'
    }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-heritage-red to-heritage-gold text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            We're Here to Help
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Speak to us in Nepali, English, or both. Our team is ready to answer your questions.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className={`text-${method.color} mb-4`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.subtitle}</p>
                <p className="font-semibold text-gray-900 mb-2">{method.detail}</p>
                <p className="text-sm text-gray-500">{method.hours}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ram Bahadur Thapa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Shop Name</label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                    placeholder="Ram Ko Pasal"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Kathmandu, Lalitpur, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Preferred Language</label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="language"
                        value="nepali"
                        checked={formData.language === 'nepali'}
                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                        className="text-heritage-red focus:ring-heritage-red"
                      />
                      <span>Nepali (नेपाली)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="language"
                        value="english"
                        checked={formData.language === 'english'}
                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                        className="text-heritage-red focus:ring-heritage-red"
                      />
                      <span>English</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="language"
                        value="both"
                        checked={formData.language === 'both'}
                        onChange={(e) => setFormData({...formData, language: e.target.value})}
                        className="text-heritage-red focus:ring-heritage-red"
                      />
                      <span>Both</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Best Time to Contact</label>
                  <select
                    value={formData.contactTime}
                    onChange={(e) => setFormData({...formData, contactTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red"
                  >
                    <option value="morning">Morning (7 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 7 PM)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your shop and how we can help..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage-red resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center">
                  <Send className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-gradient-to-br from-heritage-red to-heritage-gold p-8 rounded-2xl text-white">
                <Clock size={40} className="mb-4" />
                <h3 className="text-2xl font-bold mb-4">Support Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Phone Support:</span>
                    <span className="font-semibold">7 AM - 7 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>WhatsApp:</span>
                    <span className="font-semibold">24/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Email:</span>
                    <span className="font-semibold">24/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Office Visits:</span>
                    <span className="font-semibold">Mon-Sat 9-5</span>
                  </div>
                </div>
                <p className="mt-6 text-white/90 text-sm">
                  All support available in both Nepali and English
                </p>
              </div>

              {/* Quick Contact */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+9771234567890" className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Phone className="text-heritage-red" size={24} />
                    <div>
                      <div className="font-semibold">Call Us Now</div>
                      <div className="text-sm text-gray-600">+977 1-234-5678</div>
                    </div>
                  </a>
                  <a href="mailto:info@kiranadigital.com.np" className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="text-tech-blue" size={24} />
                    <div>
                      <div className="font-semibold">Email Us</div>
                      <div className="text-sm text-gray-600">info@kiranadigital.com.np</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <MessageSquare className="text-success" size={24} />
                    <div>
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-sm text-gray-600">Instant messaging</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p className="font-semibold">Main Office</p>
                  <p className="text-sm">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Common Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How quickly can someone contact me after I submit the form?',
                a: 'Our team typically responds within 2 hours during business hours. For urgent matters, please call us directly.'
              },
              {
                q: 'Do you provide support in Nepali?',
                a: 'Yes! All our support staff are fluent in both Nepali and English. We can communicate in whichever language you prefer.'
              },
              {
                q: 'Can I visit your office?',
                a: 'Absolutely! We welcome shop owners to visit our office. Please call ahead to schedule an appointment so we can give you our full attention.'
              },
              {
                q: 'Is there a cost for the initial consultation?',
                a: 'No, the initial consultation and shop assessment are completely free with no obligation.'
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
    </main>
  );
}
