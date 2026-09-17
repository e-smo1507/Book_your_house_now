import React, { useState } from 'react';
import { addDays, startOfToday, addMonths, subMonths, format } from 'date-fns';
import { propertyData } from './data/listingData';
import { Header } from './components/Header';
import { PropertyHeader } from './components/PropertyHeader';
import { HeroGallery } from './components/HeroGallery';
import { PropertyOverview } from './components/PropertyOverview';
import { AmenitiesSection } from './components/AmenitiesSection';
import { CalendarSection } from './components/CalendarSection';
import { ReservationCard } from './components/ReservationCard';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostSection } from './components/HostSection';
import { ThingsToKnow } from './components/ThingsToKnow';
import { Footer } from './components/Footer';
import { PhotoTourModal } from './components/PhotoTourModal';
import { LightboxModal } from './components/LightboxModal';
import { ArchitectureModal } from './components/ArchitectureModal';

export const App: React.FC = () => {
  // Calendar state: default 5 days from tomorrow
  const today = startOfToday();
  const [checkInDate, setCheckInDate] = useState<Date | null>(addDays(today, 2));
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(addDays(today, 7));
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState<Date>(today);
  const [searchLocation, setSearchLocation] = useState<string>('Candolim, Goa');
  const [searchGuests, setSearchGuests] = useState<number>(2);

  // Modal states
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  // Calendar date range selection logic
  const handleSelectDate = (date: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      if (date < checkInDate) {
        setCheckInDate(date);
      } else {
        setCheckOutDate(date);
      }
    }
  };

  const handleClearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleOpenPhotoTour = () => {
    setIsPhotoTourOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleSelectPhotoFromTour = (index: number) => {
    setActivePhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleApplySearch = (params: { location: string; checkIn: Date | null; checkOut: Date | null; guests: number }) => {
    setSearchLocation(params.location);
    if (params.checkIn) setCheckInDate(params.checkIn);
    if (params.checkOut) setCheckOutDate(params.checkOut);
    setSearchGuests(params.guests);
  };

  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedDates =
    checkInDate && checkOutDate
      ? `${format(checkInDate, 'MMM d')} – ${format(checkOutDate, 'MMM d')}`
      : 'Any week';

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Interactive Header Bar with Search & Auth Modals */}
      <Header
        searchLocation={searchLocation}
        searchDatesText={formattedDates}
        searchGuestsCount={searchGuests}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onApplySearch={handleApplySearch}
      />

      {/* Main Container */}
      <main className="max-w-[1280px] w-full mx-auto px-6 flex-1">
        {/* Title, Rating & Sub-header */}
        <PropertyHeader
          listing={propertyData}
          onReviewsClick={scrollToReviews}
        />

        {/* 5-Photo Hero Grid */}
        <HeroGallery
          photos={propertyData.heroPhotos}
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* 2-Column Property Details & Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative pt-2">
          {/* Left Column (Details, Amenities, Calendar, Reviews, Map, Host) - 7 cols */}
          <div className="lg:col-span-7 space-y-2">
            <PropertyOverview listing={propertyData} />
            <AmenitiesSection amenities={propertyData.amenities} />
            <CalendarSection
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onSelectDate={handleSelectDate}
              onClearDates={handleClearDates}
              currentMonth={currentCalendarMonth}
              onPrevMonth={() => setCurrentCalendarMonth(subMonths(currentCalendarMonth, 1))}
              onNextMonth={() => setCurrentCalendarMonth(addMonths(currentCalendarMonth, 1))}
            />
          </div>

          {/* Right Column (Sticky Reservation Widget) - 5 cols */}
          <div className="lg:col-span-5 relative">
            <ReservationCard
              listing={propertyData}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onOpenCalendar={() => {
                const cal = document.querySelector('.calendar-container');
                cal?.scrollIntoView({ behavior: 'smooth' });
              }}
              onReviewsClick={scrollToReviews}
            />
          </div>
        </div>

        {/* Full Width Lower Sections */}
        <div className="mt-8">
          <ReviewsSection listing={propertyData} />
          <LocationSection listing={propertyData} />
          <HostSection host={propertyData.host} />
          <ThingsToKnow listing={propertyData} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlay View 1: Full-Screen Photo Tour */}
      {isPhotoTourOpen && (
        <PhotoTourModal
          photos={propertyData.allPhotos}
          onClose={() => setIsPhotoTourOpen(false)}
          onSelectPhoto={handleSelectPhotoFromTour}
        />
      )}

      {/* Overlay View 2: Lightbox Single Photo Viewer */}
      {isLightboxOpen && (
        <LightboxModal
          photos={propertyData.allPhotos}
          currentIndex={activePhotoIndex}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={(newIndex) => setActivePhotoIndex(newIndex)}
        />
      )}

      {/* Architecture Modal */}
      {isArchitectureOpen && (
        <ArchitectureModal onClose={() => setIsArchitectureOpen(false)} />
      )}
    </div>
  );
};

export default App;