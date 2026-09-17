import React from 'react';
import { MapPin, Compass, Waves, Utensils } from 'lucide-react';
import type { PropertyListing } from '../types';

interface LocationSectionProps {
  listing: PropertyListing;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ listing }) => {
  return (
    <section className="py-10 border-b border-gray-200">
      <h3 className="text-[22px] font-semibold text-gray-900 mb-2">
        Where you'll be
      </h3>
      <div className="text-gray-700 text-sm mb-6 font-normal">
        {listing.location} · {listing.neighborhood}
      </div>

      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200 bg-[#e5e3df] shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-amber-50/30 to-blue-50/40 opacity-90">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0deda" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path
              d="M 80,0 Q 140,200 90,400"
              fill="none"
              stroke="#a5d8ff"
              strokeWidth="60"
              strokeOpacity="0.4"
            />
            <path
              d="M 0,0 L 70,0 Q 130,200 80,400 L 0,400 Z"
              fill="#d0ebff"
              opacity="0.6"
            />
            <path
              d="M 120,0 Q 200,180 180,400"
              fill="none"
              stroke="#fcc419"
              strokeWidth="5"
              strokeOpacity="0.8"
            />
            <path d="M 120,120 L 700,100" fill="none" stroke="#ffffff" strokeWidth="4" />
            <path d="M 150,230 L 750,220" fill="none" stroke="#ffffff" strokeWidth="4" />
            <path d="M 170,320 L 720,330" fill="none" stroke="#ffffff" strokeWidth="4" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 bg-[#FF385C]/20 rounded-full animate-ping pointer-events-none" />
            <div className="absolute w-14 h-14 bg-[#FF385C]/30 rounded-full" />
            <div className="relative w-12 h-12 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-xl border-2 border-white">
              <MapPin className="w-6 h-6 fill-white stroke-[#FF385C]" />
            </div>
          </div>
          <div className="mt-2 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-md text-xs font-semibold text-gray-900 border border-gray-200">
            Mirashya UG10 Candolim
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl shadow-md border border-gray-200 space-y-2 max-w-xs text-xs">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <Waves className="w-4 h-4 text-sky-500" />
            <span>Candolim Beach – 500m (5 min walk)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Utensils className="w-4 h-4 text-amber-500" />
            <span>Fisherman's Cove & Cafes – 300m</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Compass className="w-4 h-4 text-emerald-500" />
            <span>Aguada Fort & Lighthouse – 3.8 km</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-700 leading-relaxed space-y-2">
        <h4 className="font-semibold text-base text-gray-900">Candolim, Goa</h4>
        <p>
          Candolim is one of North Goa's most serene coastal towns, famous for its calm sands, upscale beach bars, and heritage Portuguese charm. The apartment is located in a quiet enclave right behind Candolim Main Street, providing the perfect blend of buzzing nightlife, gourmet seaside dining, and peaceful relaxation.
        </p>
      </div>
    </section>
  );
};