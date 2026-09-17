import React, { useState } from 'react';
import { Share, Heart, Star, Award, Check } from 'lucide-react';
import type { PropertyListing } from '../types';

interface PropertyHeaderProps {
  listing: PropertyListing;
  onReviewsClick?: () => void;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ listing, onReviewsClick }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  return (
    <section className="pt-6 pb-4">
      {/* Title */}
      <h1 className="text-[26px] md:text-[28px] font-semibold text-gray-900 tracking-tight leading-snug">
        {listing.title}
      </h1>

      {/* Subheader info & action buttons */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-800 mt-1 gap-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Star & Rating */}
          <div className="flex items-center gap-1 font-semibold">
            <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>

          <span className="text-gray-400">·</span>

          {/* Reviews Link */}
          <button
            onClick={onReviewsClick}
            className="underline font-semibold hover:text-black cursor-pointer underline-offset-2"
          >
            {listing.reviewsCount} reviews
          </button>

          <span className="text-gray-400">·</span>

          {/* Superhost Badge */}
          {listing.isSuperhost && (
            <>
              <div className="flex items-center gap-1 text-gray-700">
                <Award className="w-4 h-4 text-gray-800" />
                <span>Superhost</span>
              </div>
              <span className="text-gray-400">·</span>
            </>
          )}

          {/* Location */}
          <span className="underline font-medium text-gray-700 underline-offset-2 cursor-pointer hover:text-black">
            {listing.location}
          </span>
        </div>

        {/* Share and Save Actions */}
        <div className="flex items-center gap-4 relative">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-800 cursor-pointer underline underline-offset-2"
          >
            <Share className="w-4 h-4 stroke-[2]" />
            <span>Share</span>
          </button>

          {showShareToast && (
            <div className="absolute -top-10 left-0 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-md shadow-lg flex items-center gap-1.5 animate-fade-in whitespace-nowrap z-20">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Link copied to clipboard!
            </div>
          )}

          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-800 cursor-pointer underline underline-offset-2"
          >
            <Heart
              className={`w-4 h-4 stroke-[2] transition-colors ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-gray-800'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
