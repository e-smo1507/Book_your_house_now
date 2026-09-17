import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share, Heart, Check } from 'lucide-react';
import type { ListingPhoto } from '../types';

interface PhotoTourModalProps {
  photos: ListingPhoto[];
  onClose: () => void;
  onSelectPhoto: (index: number) => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  photos,
  onClose,
  onSelectPhoto
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSaved, setIsSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const categories = [
    { id: 'all', label: 'Photo tour' },
    { id: 'living_room', label: 'Living room' },
    { id: 'jacuzzi_bath', label: 'Jacuzzi & Bath' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'kitchen_dining', label: 'Kitchen & Dining' },
    { id: 'pool_exterior', label: 'Pool & Exterior' },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const categoryGroups = [
    { id: 'living_room', title: 'Living room', photos: photos.filter(p => p.category === 'living_room') },
    { id: 'jacuzzi_bath', title: 'Jacuzzi & Bath', photos: photos.filter(p => p.category === 'jacuzzi_bath') },
    { id: 'bedroom', title: 'Bedroom', photos: photos.filter(p => p.category === 'bedroom') },
    { id: 'kitchen_dining', title: 'Kitchen & Dining', photos: photos.filter(p => p.category === 'kitchen_dining') },
    { id: 'pool_exterior', title: 'Pool & Exterior', photos: photos.filter(p => p.category === 'pool_exterior') },
  ].filter(g => g.photos.length > 0);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in">
      <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-2 text-gray-900 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span className="text-sm">Back</span>
        </button>

        <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer"
            title="Share"
          >
            <Share className="w-5 h-5" />
          </button>
          {showShareToast && (
            <div className="absolute top-12 right-0 bg-gray-900 text-white text-xs py-1.5 px-3 rounded-md shadow-lg flex items-center gap-1.5 whitespace-nowrap z-30">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Link copied!
            </div>
          )}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer"
            title="Save"
          >
            <Heart
              className={`w-5 h-5 ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-gray-800'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="max-w-[1040px] mx-auto px-6 py-8">
        {selectedCategory === 'all' ? (
          <div className="space-y-12">
            {categoryGroups.map((group) => (
              <div key={group.id} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{group.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.photos.map((photo) => {
                    const originalIndex = photos.findIndex((p) => p.id === photo.id);
                    return (
                      <div
                        key={photo.id}
                        onClick={() => onSelectPhoto(originalIndex >= 0 ? originalIndex : 0)}
                        className="group cursor-pointer space-y-2 overflow-hidden"
                      >
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{photo.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-2">{photo.caption}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 capitalize">
              {categories.find((c) => c.id === selectedCategory)?.label}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPhotos.map((photo) => {
                const originalIndex = photos.findIndex((p) => p.id === photo.id);
                return (
                  <div
                    key={photo.id}
                    onClick={() => onSelectPhoto(originalIndex >= 0 ? originalIndex : 0)}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{photo.title}</div>
                      <div className="text-xs text-gray-500">{photo.caption}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};