import React, { useState } from 'react';
import { Search, MapPin, Plus, Minus, X } from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';

interface SearchModalProps {
  initialTab?: 'destination' | 'dates' | 'guests';
  onClose: () => void;
  onApplySearch: (params: { location: string; checkIn: Date | null; checkOut: Date | null; guests: number }) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  initialTab = 'destination',
  onClose,
  onApplySearch
}) => {
  const today = startOfToday();
  const [activeTab, setActiveTab] = useState<'destination' | 'dates' | 'guests'>(initialTab);
  const [location, setLocation] = useState('Candolim, Goa');
  const [checkIn, setCheckIn] = useState<Date | null>(addDays(today, 2));
  const [checkOut, setCheckOut] = useState<Date | null>(addDays(today, 7));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const destinations = [
    { title: 'Candolim, Goa', subtitle: 'Beachfront suites & jacuzzis', icon: '🏖️' },
    { title: 'North Goa', subtitle: 'Baga, Calangute, Anjuna', icon: '🌴' },
    { title: 'South Goa', subtitle: 'Palolem, Colva, Agonda', icon: '🌊' },
    { title: 'I’m flexible', subtitle: 'Search anywhere worldwide', icon: '🗺️' }
  ];

  const totalGuests = adults + children;

  const handleSearch = () => {
    onApplySearch({
      location,
      checkIn,
      checkOut,
      guests: totalGuests
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-200">
        {/* Top Search Capsule Tabs */}
        <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
          <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-xs divide-x divide-gray-200">
            <button
              onClick={() => setActiveTab('destination')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'destination' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Where · {location || 'Search destinations'}
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dates' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              When · {checkIn && checkOut ? `${format(checkIn, 'MMM d')} – ${format(checkOut, 'MMM d')}` : 'Any week'}
            </button>
            <button
              onClick={() => setActiveTab('guests')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'guests' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Who · {totalGuests} guest{totalGuests > 1 ? 's' : ''}
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-8 min-h-[300px]">
          {activeTab === 'destination' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                  Search by destination
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Where are you going? (e.g. Candolim, Goa)"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Popular destinations
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destinations.map((d) => (
                    <div
                      key={d.title}
                      onClick={() => setLocation(d.title)}
                      className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                        location === d.title
                          ? 'border-black bg-gray-50 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{d.title}</div>
                        <div className="text-xs text-gray-500">{d.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-base">Select trip dates</h4>
                  <p className="text-xs text-gray-500">Choose when you want to visit Candolim</p>
                </div>
                <div className="text-xs bg-rose-50 text-[#FF385C] font-semibold px-3 py-1.5 rounded-full border border-rose-100">
                  {checkIn && checkOut
                    ? `${Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights selected`
                    : 'Select check-in date'}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: 'Weekend (2 nights)', days: 2 },
                  { label: 'Short getaway (4 nights)', days: 4 },
                  { label: 'Full week (7 nights)', days: 7 },
                  { label: 'Fortnight (14 nights)', days: 14 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      const newStart = addDays(today, 2);
                      setCheckIn(newStart);
                      setCheckOut(addDays(newStart, preset.days));
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-medium cursor-pointer transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-center text-sm">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="text-xs text-gray-500 font-semibold uppercase">Check-in</div>
                  <div className="text-base font-bold text-gray-900 mt-1">
                    {checkIn ? format(checkIn, 'EEE, MMM d, yyyy') : 'Select date'}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="text-xs text-gray-500 font-semibold uppercase">Checkout</div>
                  <div className="text-base font-bold text-gray-900 mt-1">
                    {checkOut ? format(checkOut, 'EEE, MMM d, yyyy') : 'Select date'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guests' && (
            <div className="space-y-6 max-w-lg mx-auto">
              <h4 className="font-bold text-gray-900 text-base">Who's coming?</h4>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-gray-900">Adults</div>
                  <div className="text-xs text-gray-500">Ages 13 or above</div>
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
                    disabled={adults + children >= 4}
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
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
                    disabled={adults + children >= 4}
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <div className="font-semibold text-sm text-gray-900">Infants</div>
                  <div className="text-xs text-gray-500">Under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={infants <= 0}
                    onClick={() => setInfants(infants - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{infants}</span>
                  <button
                    disabled={infants >= 2}
                    onClick={() => setInfants(infants + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-gray-900">Pets</div>
                  <div className="text-xs text-gray-500">Bringing a service animal?</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    disabled={pets <= 0}
                    onClick={() => setPets(pets - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{pets}</span>
                  <button
                    disabled={pets >= 2}
                    onClick={() => setPets(pets + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => {
              setLocation('Candolim, Goa');
              setAdults(2);
              setChildren(0);
              setInfants(0);
              setPets(0);
            }}
            className="text-xs font-semibold text-gray-600 underline hover:text-black cursor-pointer"
          >
            Reset filters
          </button>
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold rounded-full text-sm flex items-center gap-2 shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};