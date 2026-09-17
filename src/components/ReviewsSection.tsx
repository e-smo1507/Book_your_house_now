import React, { useState } from 'react';
import { Star, Search, X } from 'lucide-react';
import type { PropertyListing } from '../types';

interface ReviewsSectionProps {
  listing: PropertyListing;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ listing }) => {
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const ratingsList = [
    { label: 'Cleanliness', score: listing.ratingsBreakdown.cleanliness },
    { label: 'Accuracy', score: listing.ratingsBreakdown.accuracy },
    { label: 'Communication', score: listing.ratingsBreakdown.communication },
    { label: 'Location', score: listing.ratingsBreakdown.location },
    { label: 'Check-in', score: listing.ratingsBreakdown.checkIn },
    { label: 'Value', score: listing.ratingsBreakdown.value },
  ];

  const filteredReviews = listing.reviews.filter((r) =>
    r.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="reviews-section" className="py-10 border-b border-gray-200">
      <div className="flex items-center gap-2 mb-8">
        <Star className="w-6 h-6 fill-gray-900 text-gray-900" />
        <h3 className="text-2xl font-bold text-gray-900">
          {listing.rating.toFixed(2)} · {listing.reviewsCount} reviews
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-10">
        {ratingsList.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-800 font-normal w-36">{item.label}</span>
            <div className="flex items-center gap-3 flex-1 max-w-[200px]">
              <div className="h-1 bg-gray-200 rounded-full flex-1 overflow-hidden">
                <div
                  className="h-full bg-gray-900 rounded-full"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
              <span className="font-semibold text-xs text-gray-900 w-7 text-right">
                {item.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {listing.reviews.slice(0, 6).map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={review.authorAvatar}
                alt={review.authorName}
                className="w-11 h-11 rounded-full object-cover border border-gray-100"
              />
              <div>
                <div className="font-semibold text-sm text-gray-900">{review.authorName}</div>
                <div className="text-xs text-gray-500">{review.date} · {review.stayDuration || 'Stayed a few nights'}</div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => setShowAllReviewsModal(true)}
          className="px-6 py-3 border border-gray-900 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-100 active:scale-98 transition-all cursor-pointer"
        >
          Show all {listing.reviewsCount} reviews
        </button>
      </div>

      {showAllReviewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl relative">
            <div className="sticky top-0 bg-white pb-4 border-b border-gray-100 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-gray-900 text-gray-900" />
                <h3 className="text-xl font-bold text-gray-900">
                  {listing.rating.toFixed(2)} · {listing.reviewsCount} reviews
                </h3>
              </div>
              <button
                onClick={() => setShowAllReviewsModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            <div className="my-4 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reviews..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="space-y-6 pt-4">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No reviews match "{searchTerm}".
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 space-y-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.authorAvatar}
                        alt={review.authorName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{review.authorName}</div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{review.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};