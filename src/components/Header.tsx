import React, { useState } from 'react';
import { Search, Globe, Menu, User, Sparkles, LogOut, Heart, Briefcase, Settings, HelpCircle, Check } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { SearchModal } from './SearchModal';

interface UserState {
  name: string;
  email: string;
  avatar: string;
}

interface HeaderProps {
  searchLocation?: string;
  searchDatesText?: string;
  searchGuestsCount?: number;
  onOpenArchitecture?: () => void;
  onApplySearch?: (params: { location: string; checkIn: Date | null; checkOut: Date | null; guests: number }) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchLocation = 'Anywhere',
  searchDatesText = 'Any week',
  searchGuestsCount = 0,
  onOpenArchitecture,
  onApplySearch
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserState | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | null>(null);
  const [searchModalTab, setSearchModalTab] = useState<'destination' | 'dates' | 'guests' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLoginSuccess = (user: UserState) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsMenuOpen(false);
    showToast('Logged out successfully.');
  };

  const handleSearchSubmit = (params: { location: string; checkIn: Date | null; checkOut: Date | null; guests: number }) => {
    if (onApplySearch) {
      onApplySearch(params);
    }
    showToast(`Search updated: ${params.location} · ${params.guests} guests`);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer"
          >
            <svg
              className="h-8 w-auto text-[#FF385C]"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 4.116 8.358 6.095 12.82 1.488 3.355 2.621 6.223 2.621 8.886 0 4.418-3.582 8-8 8-2.663 0-5.531-1.133-8.886-2.621-3.355 1.488-6.223 2.621-8.886 2.621-4.418 0-8-3.582-8-8 0-2.663 1.133-5.531 2.621-8.886 1.979-4.462 4.141-8.99 6.095-12.82l.533-1.025C8.537 1.963 9.992 1 12 1h4zm0 2.222h-4c-1.336 0-2.316.637-3.354 2.489l-.513.987C6.22 10.457 4.093 14.908 2.146 19.301.769 22.404-.002 24.966 0 27c0 3.194 2.584 5.778 5.778 5.778 2.034 0 4.596-.771 7.7-2.148l2.522-1.121 2.522 1.121c3.104 1.377 5.666 2.148 7.7 2.148 3.194 0 5.778-2.584 5.778-5.778.002-2.034-.769-4.596-2.146-7.699-1.947-4.393-4.074-8.844-5.987-12.603l-.513-.987C21.316 3.859 20.336 3.222 19 3.222h-3zm0 9.778a5 5 0 110 10 5 5 0 010-10zm0 2.222a2.778 2.778 0 100 5.556 2.778 2.778 0 000-5.556z"/>
            </svg>
            <span className="text-[#FF385C] font-bold text-xl tracking-tight hidden md:inline">
              airbnb
            </span>
          </div>

          {/* Interactive Compact Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full py-1.5 px-3 shadow-sm hover:shadow-md transition-shadow divide-x divide-gray-200">
            {/* Anywhere button */}
            <button
              onClick={() => setSearchModalTab('destination')}
              className="text-xs md:text-sm font-semibold pr-3 pl-1 text-gray-800 hover:text-black cursor-pointer truncate max-w-[120px]"
            >
              {searchLocation}
            </button>

            {/* Any week button */}
            <button
              onClick={() => setSearchModalTab('dates')}
              className="text-xs md:text-sm font-semibold px-3 text-gray-800 hover:text-black cursor-pointer truncate max-w-[110px]"
            >
              {searchDatesText}
            </button>

            {/* Add guests button + Search icon */}
            <div className="flex items-center pl-3 gap-2">
              <button
                onClick={() => setSearchModalTab('guests')}
                className="text-xs md:text-sm text-gray-500 font-normal hover:text-gray-900 cursor-pointer"
              >
                {searchGuestsCount > 0 ? `${searchGuestsCount} guest${searchGuestsCount > 1 ? 's' : ''}` : 'Add guests'}
              </button>
              <button
                onClick={() => setSearchModalTab('destination')}
                className="bg-[#FF385C] text-white p-2 rounded-full flex items-center justify-center hover:bg-[#E00B41] transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* User Navigation & Actions */}
          <div className="flex items-center gap-2">
            {onOpenArchitecture && (
              <button
                onClick={onOpenArchitecture}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-rose-50 to-pink-50 text-[#FF385C] border border-rose-200 hover:border-rose-300 hover:shadow-sm transition-all cursor-pointer"
                title="View Scale Architecture & Tech Specs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF385C]" />
                <span className="hidden sm:inline">System Architecture</span>
              </button>
            )}

            <button
              onClick={() => showToast('Become an Airbnb host feature available soon!')}
              className="text-sm font-semibold py-2 px-3 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-800 hidden md:inline"
            >
              Airbnb your home
            </button>

            <button
              onClick={() => showToast('Language: English (IN) · Currency: INR (₹)')}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-700"
              title="Language and currency"
            >
              <Globe className="w-4 h-4" />
            </button>

            {/* User Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2.5 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-md transition-shadow cursor-pointer bg-white"
              >
                <Menu className="w-4 h-4 text-gray-600" />
                {currentUser ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="bg-gray-700 text-white rounded-full p-1 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 text-sm animate-fade-in divide-y divide-gray-100">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-3 bg-gray-50/70">
                        <div className="font-bold text-gray-900 text-sm">{currentUser.name}</div>
                        <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
                      </div>
                      <div className="py-1 text-gray-700">
                        <div
                          onClick={() => { setIsMenuOpen(false); showToast('Navigating to Trips...'); }}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2.5 font-medium"
                        >
                          <Briefcase className="w-4 h-4 text-gray-500" />
                          <span>Trips</span>
                        </div>
                        <div
                          onClick={() => { setIsMenuOpen(false); showToast('Opening Wishlists...'); }}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2.5 font-medium"
                        >
                          <Heart className="w-4 h-4 text-gray-500" />
                          <span>Wishlists</span>
                        </div>
                        <div
                          onClick={() => { setIsMenuOpen(false); showToast('Opening Account Settings...'); }}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2.5"
                        >
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span>Account settings</span>
                        </div>
                      </div>
                      <div className="py-1">
                        <div
                          onClick={handleLogout}
                          className="px-4 py-2.5 hover:bg-rose-50 text-rose-600 font-semibold cursor-pointer flex items-center gap-2.5"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log out</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="py-1">
                        <div
                          onClick={() => { setIsMenuOpen(false); setAuthModalMode('signup'); }}
                          className="font-semibold px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-900"
                        >
                          Sign up
                        </div>
                        <div
                          onClick={() => { setIsMenuOpen(false); setAuthModalMode('login'); }}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium"
                        >
                          Log in
                        </div>
                      </div>
                      <div className="py-1 text-gray-700">
                        <div
                          onClick={() => { setIsMenuOpen(false); showToast('Airbnb your home registration opens soon!'); }}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
                        >
                          Airbnb your home
                        </div>
                        <div
                          onClick={() => { setIsMenuOpen(false); showToast('Help Center is 24/7 available via WhatsApp/Chat'); }}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                          <span>Help Center</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal (Log in / Sign up) */}
      {authModalMode && (
        <AuthModal
          initialMode={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Search Modal (Anywhere, Any week, Add guests) */}
      {searchModalTab && (
        <SearchModal
          initialTab={searchModalTab}
          onClose={() => setSearchModalTab(null)}
          onApplySearch={handleSearchSubmit}
        />
      )}

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};