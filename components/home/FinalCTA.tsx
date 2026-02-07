import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-heritage-red via-red-700 to-heritage-gold relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 nepali-pattern"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your<br />
            <span className="text-heritage-gold">किराना पसल?</span>
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Join 50+ successful shop owners who have already taken the digital leap.<br />
            Start your free 30-day trial today. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-heritage-red font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2" size={24} />
            </Link>

            <a
              href="tel:+9771234567890"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white font-bold py-4 px-10 rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 text-lg"
            >
              <Phone className="mr-2" size={24} />
              Call Us Now
            </a>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-heritage-gold font-bold">✓</span>
              </div>
              <span>30-Day Free Trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-heritage-gold font-bold">✓</span>
              </div>
              <span>Nepali-Speaking Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-heritage-gold font-bold">✓</span>
              </div>
              <span>Money-Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-heritage-gold font-bold">✓</span>
              </div>
              <span>Setup Within 2 Weeks</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-12 border-t border-white/20">
            <p className="text-lg mb-4">
              Questions? We're here to help in English and Nepali
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-lg">
              <a href="tel:+9771234567890" className="hover:text-heritage-gold transition-colors font-semibold">
                📞 +977 1-234-5678
              </a>
              <span className="hidden sm:inline text-white/40">•</span>
              <a href="mailto:info@kiranadigital.com.np" className="hover:text-heritage-gold transition-colors font-semibold">
                ✉️ info@kiranadigital.com.np
              </a>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="font-semibold">
                💬 WhatsApp Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
