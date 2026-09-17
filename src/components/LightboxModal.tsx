import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share, Heart, Check } from 'lucide-react';
import type { ListingPhoto } from '../types';

interface LightboxModalProps {
  photos: ListingPhoto[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const totalPhotos = photos.length;
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex - 1 + totalPhotos) % totalPhotos);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onNavigate((currentIndex + 1) % totalPhotos);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + totalPhotos) % totalPhotos);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % totalPhotos);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalPhotos, onClose, onNavigate]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col justify-between select-none animate-fade-in">
      <div className="px-6 py-5 flex items-center justify-between z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors text-white font-semibold cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
          <span className="text-sm hidden md:inline">Close</span>
        </button>

        <div className="text-sm font-semibold tracking-wide">
          {currentIndex + 1} / {totalPhotos}
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            title="Share"
          >
            <Share className="w-5 h-5" />
          </button>
          {showShareToast && (
            <div className="absolute top-12 right-0 bg-white text-gray-900 text-xs py-1.5 px-3 rounded-md shadow-lg flex items-center gap-1.5 whitespace-nowrap z-30 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Link copied!
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            title="Save"
          >
            <Heart
              className={`w-5 h-5 ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-white'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 md:px-16 overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute left-6 z-20 w-12 h-12 rounded-full border border-white/30 bg-black/40 hover:bg-white hover:text-black transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="max-w-5xl max-h-[75vh] flex flex-col items-center justify-center">
          <img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 animate-fade-in"
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-6 z-20 w-12 h-12 rounded-full border border-white/30 bg-black/40 hover:bg-white hover:text-black transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-6 text-center z-20 max-w-2xl mx-auto">
        <div className="font-semibold text-base text-white">{currentPhoto.title}</div>
        <div className="text-xs text-gray-400 mt-1 leading-relaxed">
          {currentPhoto.caption}
        </div>
      </div>
    </div>
  );
};