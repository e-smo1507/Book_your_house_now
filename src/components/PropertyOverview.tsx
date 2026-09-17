import React, { useState } from 'react';
import type { PropertyListing } from '../types';
import {
  Wifi,
  KeyRound,
  Award,
  CalendarCheck,
  BedDouble,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';

interface PropertyOverviewProps {
  listing: PropertyListing;
}

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-gray-700" />,
  KeyRound: <KeyRound className="w-6 h-6 text-gray-700" />,
  Award: <Award className="w-6 h-6 text-gray-700" />,
  CalendarCheck: <CalendarCheck className="w-6 h-6 text-gray-700" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#FF385C]" />,
};

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ listing }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="space-y-8">
      {/* Host Summary & Spec Pill */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-[22px] font-semibold text-gray-900 leading-tight">
            {listing.tagline} hosted by {listing.host.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {listing.guestsCount} guests · {listing.bedroomsCount} bedroom · {listing.bedsCount} bed · {listing.bathsCount} bath
          </p>
        </div>
        <img
          src={listing.host.avatar}
          alt={listing.host.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
        />
      </div>

      {/* Guest Favorite Badge Banner (Airbnb Trophy / Laurel Banner) */}
      {listing.isGuestFavorite && (
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100/70 text-amber-800">
              <Sparkles className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-base flex items-center gap-1.5">
                Guest favorite
                <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Top 5%
                </span>
              </div>
              <div className="text-xs text-gray-600">
                One of the most loved homes on Airbnb based on ratings, reviews, and reliability
              </div>
            </div>
          </div>
          <div className="text-right pl-4 border-l border-gray-200">
            <div className="text-xl font-bold text-gray-900">{listing.rating.toFixed(2)}</div>
            <div className="text-[11px] text-gray-500 underline font-medium">
              {listing.reviewsCount} reviews
            </div>
          </div>
        </div>
      )}

      {/* Highlights List */}
      <div className="py-2 border-b border-gray-200 space-y-5">
        {listing.highlights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="mt-0.5">{iconMap[item.icon] || <Sparkles className="w-6 h-6 text-gray-700" />}</div>
            <div>
              <div className="font-semibold text-gray-900 text-[15px]">{item.title}</div>
              <div className="text-gray-500 text-sm mt-0.5">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* AirCover Banner */}
      <div className="py-6 border-b border-gray-200">
        <div className="text-xl font-bold tracking-tight text-gray-900 flex items-center">
          <span className="text-[#FF385C]">air</span>
          <span className="text-gray-900">cover</span>
        </div>
        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
          Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
        </p>
        <button
          onClick={() => setShowFullDescription(true)}
          className="font-semibold text-sm underline text-gray-900 mt-2 block hover:text-black cursor-pointer"
        >
          Learn more
        </button>
      </div>

      {/* Description Section */}
      <div className="py-6 border-b border-gray-200">
        <div className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-line line-clamp-6">
          {listing.description}
        </div>
        <button
          onClick={() => setShowFullDescription(true)}
          className="flex items-center gap-1 font-semibold text-[15px] underline text-gray-900 mt-4 hover:text-black cursor-pointer"
        >
          <span>Show more</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Where you will sleep (Bedroom Card) */}
      <div className="py-6 border-b border-gray-200">
        <h3 className="text-[22px] font-semibold text-gray-900 mb-4">Where you'll sleep</h3>
        <div className="p-6 border border-gray-200 rounded-2xl w-full max-w-xs space-y-3 hover:border-gray-300 transition-colors">
          <BedDouble className="w-7 h-7 text-gray-800 stroke-[1.5]" />
          <div>
            <div className="font-semibold text-gray-900 text-base">Bedroom</div>
            <div className="text-gray-500 text-sm mt-0.5">1 king bed with orthopaedic mattress</div>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {showFullDescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative">
            <button
              onClick={() => setShowFullDescription(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer absolute top-6 right-6"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">About this space</h3>
            <div className="text-gray-700 text-base leading-relaxed space-y-4 whitespace-pre-line">
              {listing.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
