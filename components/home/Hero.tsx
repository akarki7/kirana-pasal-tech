'use client';

import Link from 'next/link';
import { Play, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-heritage-red min-h-[90vh] flex items-center nepali-pattern">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-block mb-6">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle2 size={20} className="text-heritage-gold" />
                <span className="text-sm font-medium">50+ Shops Already Digital</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your<br />
              <span className="text-heritage-gold">किराना पसल</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Empower your traditional shop with smart technology without losing your personal touch
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="inline-flex items-center justify-center bg-white text-heritage-red font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2" size={20} />
              </Link>

              <button className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
                <Play className="mr-2" size={20} />
                See How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-heritage-gold" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-heritage-gold" />
                <span>Made for Nepal</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-heritage-gold" />
                <span>30 Days Free</span>
              </div>
            </div>
          </div>

          {/* Right Content - Mockup/Image Placeholder */}
          <div className="relative lg:block">
            <div className="relative">
              {/* Main Device Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-900 font-bold text-2xl">आजको बिक्री</div>
                      <div className="text-success text-3xl font-bold">₹ 24,580</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-gray-600 text-sm">उधारो</div>
                        <div className="text-heritage-red text-xl font-bold">₹ 3,200</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-gray-600 text-sm">डिजिटल</div>
                        <div className="text-success text-xl font-bold">₹ 18,400</div>
                      </div>
                    </div>
                    <div className="bg-heritage-red/10 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-heritage-red font-semibold">
                        <div className="w-2 h-2 bg-heritage-red rounded-full animate-pulse"></div>
                        <span>5 वस्तु कम छन्</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-success text-white px-4 py-2 rounded-full font-bold shadow-xl animate-bounce">
                +20% Revenue ↑
              </div>
              <div className="absolute -bottom-4 -left-4 bg-tech-purple text-white px-4 py-2 rounded-full font-bold shadow-xl">
                Easy as ABC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FAF9F6"/>
        </svg>
      </div>
    </section>
  );
}
