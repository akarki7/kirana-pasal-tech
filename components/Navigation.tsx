'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'NP'>('EN');

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-bold text-heritage-red">Kirana Digital</span>
            <span className="text-xs text-gray-600">किराना डिजिटल</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-heritage-red transition-colors font-medium">
              Home
            </Link>

            <div className="relative group">
              <button className="text-gray-700 hover:text-heritage-red transition-colors font-medium">
                Solutions
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="/solutions#pos" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  Nepali POS System
                </Link>
                <Link href="/solutions#inventory" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  AI Inventory Management
                </Link>
                <Link href="/solutions#payment" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  Payment Speaker
                </Link>
                <Link href="/solutions#crm" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  CRM System
                </Link>
                <Link href="/solutions#reordering" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  Smart Reordering
                </Link>
              </div>
            </div>

            <Link href="/how-it-works" className="text-gray-700 hover:text-heritage-red transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-heritage-red transition-colors font-medium">
              Pricing
            </Link>

            <div className="relative group">
              <button className="text-gray-700 hover:text-heritage-red transition-colors font-medium">
                Resources
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="/resources#videos" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  Video Tutorials
                </Link>
                <Link href="/resources#downloads" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  Downloads
                </Link>
                <Link href="/resources#blog" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  Blog
                </Link>
                <Link href="/resources#case-studies" className="block px-4 py-3 hover:bg-gray-50 text-sm">
                  Case Studies
                </Link>
              </div>
            </div>

            <Link href="/about" className="text-gray-700 hover:text-heritage-red transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-heritage-red transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'NP' : 'EN')}
              className="flex items-center space-x-1 text-gray-600 hover:text-heritage-red transition-colors"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{language}</span>
            </button>

            <a href="tel:+9771234567890" className="flex items-center space-x-1 text-gray-600 hover:text-heritage-red transition-colors">
              <Phone size={18} />
            </a>

            <Link href="/admin" className="bg-tech-purple text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm">
              Admin
            </Link>

            <Link href="/pos" className="bg-success text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm">
              POS
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t">
            <Link href="/" className="block py-2 text-gray-700 hover:text-heritage-red" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/solutions" className="block py-2 text-gray-700 hover:text-heritage-red" onClick={toggleMenu}>
              Solutions
            </Link>
            <Link href="/how-it-works" className="block py-2 text-gray-700 hover:text-heritage-red" onClick={toggleMenu}>
              How It Works
            </Link>
            <Link href="/pricing" className="block py-2 text-gray-700 hover:text-heritage-red" onClick={toggleMenu}>
              Pricing
            </Link>
            <Link href="/resources" className="block py-2 text-gray-700 hover:text-heritage-red" onClick={toggleMenu}>
              Resources
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-heritage-red" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-heritage-red" onClick={toggleMenu}>
              Contact
            </Link>
            <Link href="/admin" className="block py-2 text-tech-purple hover:text-purple-700 font-semibold" onClick={toggleMenu}>
              Admin Dashboard
            </Link>
            <Link href="/pos" className="block py-2 text-success hover:text-green-700 font-semibold" onClick={toggleMenu}>
              POS System
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
