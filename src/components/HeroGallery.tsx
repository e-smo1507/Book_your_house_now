import React from 'react';
import { LayoutGrid } from 'lucide-react';
import type { ListingPhoto } from '../types';

interface HeroGalleryProps {
  photos: ListingPhoto[];
  onOpenPhotoTour: (initialIndex?: number) => void;
  onOpenLightbox: (initialIndex: number) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  photos,
  onOpenPhotoTour,
  onOpenLightbox
}) => {
  const mainPhoto = photos[0];
  const sidePhotos = photos.slice(1, 5);

  return (
    <div className="relative mt-2 mb-8">
      {/* 5-Photo Interactive Desktop Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] md:h-[480px] rounded-2xl overflow-hidden bg-gray-100">
        {/* Main large photo (left side 2 cols, 2 rows) */}
        <div
          onClick={() => onOpenLightbox(0)}
          className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group bg-gray-200"
        >
          <img
            src={mainPhoto?.url}
            alt={mainPhoto?.title || 'Main view'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 group-hover:brightness-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
        </div>

        {/* 4 smaller photos on the right */}
        {sidePhotos.map((photo, index) => {
          const photoIndex = index + 1;
          return (
            <div
              key={photo.id || index}
              onClick={() => onOpenLightbox(photoIndex)}
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group bg-gray-200"
            >
              <img
                src={photo.url}
                alt={photo.title || `Photo ${photoIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 group-hover:brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* "Show all photos" Pill Button (Floating in bottom-right) */}
      <button
        onClick={() => onOpenPhotoTour(0)}
        className="absolute bottom-6 right-6 flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm border border-black shadow-md hover:bg-gray-50 active:scale-98 transition-all cursor-pointer z-10"
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Show all photos</span>
      </button>
    </div>
  );
};
