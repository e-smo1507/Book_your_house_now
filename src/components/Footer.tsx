import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-200 mt-16 text-gray-700 text-sm">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-200">
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 text-sm">Support</h5>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="hover:underline cursor-pointer">Help Center</li>
              <li className="hover:underline cursor-pointer">AirCover</li>
              <li className="hover:underline cursor-pointer">Anti-discrimination</li>
              <li className="hover:underline cursor-pointer">Disability support</li>
              <li className="hover:underline cursor-pointer">Cancellation options</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 text-sm">Hosting</h5>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="hover:underline cursor-pointer">Airbnb your home</li>
              <li className="hover:underline cursor-pointer">AirCover for Hosts</li>
              <li className="hover:underline cursor-pointer">Hosting resources</li>
              <li className="hover:underline cursor-pointer">Community forum</li>
              <li className="hover:underline cursor-pointer">Hosting responsibly</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 text-sm">Airbnb</h5>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="hover:underline cursor-pointer">Newsroom</li>
              <li className="hover:underline cursor-pointer">New features</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Investors</li>
              <li className="hover:underline cursor-pointer">Gift cards</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 text-sm">Candolim Getaways</h5>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore North Goa’s best romantic villas, beachside homestays, and serviced apartments with private jacuzzis.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Company details</span>
          </div>

          <div className="flex items-center gap-6 font-semibold text-gray-800">
            <div className="flex items-center gap-2 hover:underline cursor-pointer">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </div>
            <div className="hover:underline cursor-pointer">
              <span>₹ INR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};