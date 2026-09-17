import React, { useState } from 'react';
import type { Amenity } from '../types';
import {
  Sparkles,
  Wifi,
  Tv,
  Wind,
  Waves,
  Car,
  Sun,
  Utensils,
  Zap,
  Building2,
  Bath,
  ShieldCheck,
  X,
  Check
} from 'lucide-react';

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

const iconComponentMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-gray-700" />,
  Wifi: <Wifi className="w-6 h-6 text-gray-700" />,
  Tv: <Tv className="w-6 h-6 text-gray-700" />,
  Wind: <Wind className="w-6 h-6 text-gray-700" />,
  Waves: <Waves className="w-6 h-6 text-gray-700" />,
  Car: <Car className="w-6 h-6 text-gray-700" />,
  Sun: <Sun className="w-6 h-6 text-gray-700" />,
  Utensils: <Utensils className="w-6 h-6 text-gray-700" />,
  Zap: <Zap className="w-6 h-6 text-gray-700" />,
  Building2: <Building2 className="w-6 h-6 text-gray-700" />,
  Bath: <Bath className="w-6 h-6 text-gray-700" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-gray-700" />,
};

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => {
  const [showModal, setShowModal] = useState(false);

  // Take top 8 for preview
  const previewAmenities = amenities.slice(0, 8);

  // Group all amenities by category for modal
  const categorizedAmenities = amenities.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Amenity[]>);

  return (
    <div className="py-8 border-b border-gray-200">
      <h3 className="text-[22px] font-semibold text-gray-900 mb-6">
        What this place offers
      </h3>

      {/* 2-column Grid of amenities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
        {previewAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-4 text-gray-800">
            <div>{iconComponentMap[amenity.icon] || <Check className="w-6 h-6 text-gray-700" />}</div>
            <span className="text-[15px] font-normal">{amenity.name}</span>
          </div>
        ))}
      </div>

      {/* Show all amenities Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-2 px-6 py-3 border border-gray-900 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-100 active:scale-98 transition-all cursor-pointer"
      >
        Show all {amenities.length} amenities
      </button>

      {/* Amenities Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative">
            <div className="sticky top-0 bg-white pb-4 border-b border-gray-100 flex items-center justify-between z-10">
              <h3 className="text-2xl font-bold text-gray-900">What this place offers</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            <div className="py-6 space-y-8">
              {Object.entries(categorizedAmenities).map(([category, items]) => (
                <div key={category} className="space-y-4 pb-6 border-b border-gray-100 last:border-0">
                  <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="mt-0.5">{iconComponentMap[item.icon] || <Check className="w-5 h-5 text-gray-700" />}</div>
                        <div>
                          <div className="text-[15px] font-medium text-gray-800">{item.name}</div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
