import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Plus, Minus, Flag, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import type { PropertyListing } from '../types';
import confetti from 'canvas-confetti';

interface ReservationCardProps {
  listing: PropertyListing;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onOpenCalendar?: () => void;
  onReviewsClick?: () => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  listing,
  checkInDate,
  checkOutDate,
  onOpenCalendar,
  onReviewsClick
}) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants] = useState(0);
  const [pets] = useState(0);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Calculate nights
  const nights =
    checkInDate && checkOutDate
      ? Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 5; // default 5 nights sample

  const baseTotal = listing.pricePerNight * nights;
  const serviceFee = Math.round(baseTotal * listing.serviceFeeRate);
  const taxes = Math.round(baseTotal * listing.taxRate);
  const grandTotal = baseTotal + listing.cleaningFee + serviceFee + taxes;

  const totalGuests = adults + children;

  const handleReserve = () => {
    setIsBooked(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] space-y-6">
      {/* Price & Rating Header */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">₹{listing.pricePerNight.toLocaleString('en-IN')}</span>
          <span className="text-gray-500 text-sm">night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
          <span className="font-semibold text-gray-900">{listing.rating.toFixed(2)}</span>
          <span className="text-gray-400">·</span>
          <button
            onClick={onReviewsClick}
            className="text-gray-500 underline font-medium cursor-pointer hover:text-black"
          >
            {listing.reviewsCount} reviews
          </button>
        </div>
      </div>

      {/* Date & Guest Selector Box */}
      <div className="border border-gray-300 rounded-xl overflow-hidden divide-y divide-gray-300">
        {/* Date Row */}
        <div
          onClick={onOpenCalendar}
          className="grid grid-cols-2 divide-x divide-gray-300 cursor-pointer hover:bg-gray-50/50 transition-colors"
        >
          <div className="p-3 text-left">
            <div className="text-[10px] font-bold tracking-wider text-gray-800 uppercase">Check-in</div>
            <div className="text-sm text-gray-800 font-normal truncate mt-0.5">
              {checkInDate ? format(checkInDate, 'dd/MM/yyyy') : 'Add date'}
            </div>
          </div>
          <div className="p-3 text-left">
            <div className="text-[10px] font-bold tracking-wider text-gray-800 uppercase">Checkout</div>
            <div className="text-sm text-gray-800 font-normal truncate mt-0.5">
              {checkOutDate ? format(checkOutDate, 'dd/MM/yyyy') : 'Add date'}
            </div>
          </div>
        </div>

        {/* Guests Row */}
        <div className="relative">
          <div
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
          >
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-gray-800 uppercase">Guests</div>
              <div className="text-sm text-gray-800 font-normal mt-0.5">
                {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                {infants > 0 ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}
                {pets > 0 ? `, ${pets} pet${pets > 1 ? 's' : ''}` : ''}
              </div>
            </div>
            {isGuestDropdownOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </div>

          {/* Guest Count Popover */}
          {isGuestDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-30 space-y-4 animate-fade-in">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-gray-900">Adults</div>
                  <div className="text-xs text-gray-500">Age 13+</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={adults <= 1}
                    onClick={() => setAdults(adults - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{adults}</span>
                  <button
                    disabled={adults + children >= listing.guestsCount}
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-gray-900">Children</div>
                  <div className="text-xs text-gray-500">Ages 2–12</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={children <= 0}
                    onClick={() => setChildren(children - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{children}</span>
                  <button
                    disabled={adults + children >= listing.guestsCount}
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-right pt-2 border-t border-gray-100">
                <button
                  onClick={() => setIsGuestDropdownOpen(false)}
                  className="text-xs font-semibold underline text-gray-900 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reserve Button */}
      <button
        onClick={handleReserve}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-semibold rounded-lg text-base shadow-md active:scale-98 transition-transform cursor-pointer"
      >
        {isBooked ? 'Reservation Requested ✓' : 'Reserve'}
      </button>

      <div className="text-center text-xs text-gray-500 font-normal">
        You won't be charged yet
      </div>

      {/* Dynamic Price Breakdown */}
      <div className="space-y-3 text-sm text-gray-700 pt-2">
        <div className="flex justify-between">
          <span className="underline cursor-pointer">
            ₹{listing.pricePerNight.toLocaleString('en-IN')} × {nights} night{nights > 1 ? 's' : ''}
          </span>
          <span>₹{baseTotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between">
          <span className="underline cursor-pointer">Cleaning fee</span>
          <span>₹{listing.cleaningFee.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between">
          <span className="underline cursor-pointer">Airbnb service fee</span>
          <span>₹{serviceFee.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between">
          <span className="underline cursor-pointer">Taxes (12% GST)</span>
          <span>₹{taxes.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Total row */}
      <div className="pt-4 border-t border-gray-200 flex justify-between font-bold text-base text-gray-900">
        <span>Total before taxes</span>
        <span>₹{(baseTotal + listing.cleaningFee + serviceFee).toLocaleString('en-IN')}</span>
      </div>

      <div className="flex justify-between font-extrabold text-lg text-gray-900 pt-1">
        <span>Grand Total (incl. GST)</span>
        <span className="text-[#FF385C]">₹{grandTotal.toLocaleString('en-IN')}</span>
      </div>

      {/* Report listing */}
      <div className="text-center pt-2">
        <button className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-gray-800 mx-auto cursor-pointer">
          <Flag className="w-3.5 h-3.5" />
          <span className="underline">Report this listing</span>
        </button>
      </div>

      {/* Reservation Confirmation Modal */}
      {isBooked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Reservation Confirmed!</h3>
            <p className="text-sm text-gray-600">
              Your booking for <span className="font-semibold text-gray-900">{listing.title}</span> for {nights} nights is reserved. Mirashya Homes has been notified.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-left text-xs text-gray-700 space-y-1">
              <div><span className="font-semibold">Dates:</span> {checkInDate ? format(checkInDate, 'MMM d, yyyy') : 'Selected dates'} – {checkOutDate ? format(checkOutDate, 'MMM d, yyyy') : 'Check-out'}</div>
              <div><span className="font-semibold">Guests:</span> {totalGuests} guests</div>
              <div><span className="font-semibold">Total Amount:</span> ₹{grandTotal.toLocaleString('en-IN')}</div>
            </div>
            <button
              onClick={() => setIsBooked(false)}
              className="w-full py-3 bg-[#FF385C] hover:bg-[#E00B41] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
