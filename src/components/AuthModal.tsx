import React, { useState } from 'react';
import { X, Mail, Check } from 'lucide-react';

interface AuthModalProps {
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; avatar: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      const loggedInUser = {
        name: name.trim() || (authMethod === 'phone' ? 'Guest Traveler' : email.split('@')[0] || 'Guest Traveler'),
        email: email || 'guest@airbnb-clone.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      };
      onLoginSuccess(loggedInUser);
      onClose();
    }, 1200);
  };

  const handleSocialLogin = (provider: string) => {
    setIsSubmitted(true);
    setTimeout(() => {
      onLoginSuccess({
        name: `${provider} Traveler`,
        email: `user@${provider.toLowerCase()}.com`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-gray-800" />
          </button>
          <div className="font-bold text-gray-900 text-sm">
            {mode === 'login' ? 'Log in' : 'Sign up'}
          </div>
          <div className="w-8" />
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900">
              Welcome to Airbnb
            </h3>
            <p className="text-xs text-gray-500">
              {mode === 'login'
                ? 'Sign in to access your wishlist, bookings, and messages'
                : 'Create an account to book unique homes and romantic getaways'}
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-7 h-7" />
              </div>
              <div className="font-bold text-lg text-gray-900">
                {mode === 'login' ? 'Logging you in...' : 'Account Created!'}
              </div>
              <p className="text-xs text-gray-500">Redirecting you to your session...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              )}

              {authMethod === 'phone' ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Country code & Phone number</label>
                  <div className="border border-gray-300 rounded-xl overflow-hidden divide-y divide-gray-300 focus-within:ring-2 focus-within:ring-black">
                    <select className="w-full p-3 text-xs bg-white text-gray-800 font-medium border-none outline-none">
                      <option>India (+91)</option>
                      <option>United States (+1)</option>
                      <option>United Kingdom (+44)</option>
                      <option>United Arab Emirates (+971)</option>
                      <option>Germany (+49)</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone number (e.g. 9876543210)"
                      className="w-full p-3 text-sm border-none outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              )}

              <p className="text-[11px] text-gray-500 leading-relaxed">
                We’ll call or text you to confirm your number. Standard message and data rates apply.{' '}
                <span className="underline cursor-pointer font-medium">Privacy Policy</span>
              </p>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-md active:scale-98"
              >
                {mode === 'login' ? 'Continue / Log in' : 'Create Account'}
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px bg-gray-200 flex-1" />
                <span className="text-xs text-gray-400 font-medium uppercase">or</span>
                <div className="h-px bg-gray-200 flex-1" />
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setAuthMethod(authMethod === 'phone' ? 'email' : 'phone')}
                  className="w-full py-2.5 px-4 border border-gray-800 hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Continue with {authMethod === 'phone' ? 'Email' : 'Phone'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-gray-600">
                {mode === 'login' ? (
                  <span>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="font-bold text-black underline cursor-pointer"
                    >
                      Sign up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-black underline cursor-pointer"
                    >
                      Log in
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};