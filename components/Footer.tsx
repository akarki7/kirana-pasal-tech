import Link from 'next/link';
import { Facebook, Youtube, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">Kirana Digital</h3>
            <p className="text-sm text-gray-400 mb-4">किराना डिजिटल</p>
            <p className="text-sm mb-4">Empowering Nepal's किराना Heritage</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-heritage-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-heritage-gold transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-heritage-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-heritage-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/solutions#pos" className="hover:text-heritage-gold transition-colors">POS System</Link></li>
              <li><Link href="/solutions#inventory" className="hover:text-heritage-gold transition-colors">Inventory Management</Link></li>
              <li><Link href="/solutions#payment" className="hover:text-heritage-gold transition-colors">Payment Integration</Link></li>
              <li><Link href="/solutions#crm" className="hover:text-heritage-gold transition-colors">CRM System</Link></li>
              <li><Link href="/solutions#reordering" className="hover:text-heritage-gold transition-colors">Reordering Assistant</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resources#videos" className="hover:text-heritage-gold transition-colors">Video Tutorials</Link></li>
              <li><Link href="/resources#downloads" className="hover:text-heritage-gold transition-colors">User Manual</Link></li>
              <li><Link href="/resources#blog" className="hover:text-heritage-gold transition-colors">Blog</Link></li>
              <li><Link href="/resources#case-studies" className="hover:text-heritage-gold transition-colors">Case Studies</Link></li>
              <li><Link href="/resources#faq" className="hover:text-heritage-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-heritage-gold transition-colors">About Us</Link></li>
              <li><Link href="/technology" className="hover:text-heritage-gold transition-colors">Technology</Link></li>
              <li><Link href="/pricing" className="hover:text-heritage-gold transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-heritage-gold transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-heritage-gold transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+9771234567890" className="hover:text-heritage-gold transition-colors">
                    +977 1-234-5678
                  </a>
                  <p className="text-xs text-gray-500">7 AM - 7 PM (7 days)</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a href="mailto:info@kiranadigital.com.np" className="hover:text-heritage-gold transition-colors">
                  info@kiranadigital.com.np
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-heritage-gold font-bold">ISO</span>
              </div>
              <span>ISO Certified</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-success font-bold">✓</span>
              </div>
              <span>Secure Payment</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-tech-blue font-bold">99.9%</span>
              </div>
              <span>Uptime</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-heritage-red font-bold">🇳🇵</span>
              </div>
              <span>Made in Nepal</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 space-y-4 md:space-y-0">
            <p>&copy; 2026 Kirana Digital. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-heritage-gold transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-heritage-gold transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-heritage-gold transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
