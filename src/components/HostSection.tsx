import React, { useState } from 'react';
import { Award, ShieldCheck, MessageCircle, Star, X, Check } from 'lucide-react';
import type { HostInfo } from '../types';

interface HostSectionProps {
  host: HostInfo;
}

export const HostSection: React.FC<HostSectionProps> = ({ host }) => {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMessageText('');
      setShowMessageModal(false);
    }, 2000);
  };

  return (
    <section className="py-10 border-b border-gray-200">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
        <div className="w-full md:w-80 bg-[#f7f7f7] border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-28 h-28 rounded-full object-cover shadow-md border-2 border-white"
            />
            {host.isSuperhost && (
              <div className="absolute bottom-0 right-0 bg-[#FF385C] text-white p-2 rounded-full shadow-md">
                <Award className="w-4 h-4" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{host.name}</h3>
            <div className="flex items-center justify-center gap-1 text-xs text-gray-600 font-semibold mt-1">
              <Award className="w-3.5 h-3.5 text-gray-800" />
              <span>Superhost</span>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full pt-4 border-t border-gray-200 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-gray-900">{host.reviewsCount}</div>
              <div className="text-[11px] text-gray-500 uppercase tracking-wider">Reviews</div>
            </div>
            <div className="border-l border-gray-200">
              <div className="text-xl font-bold text-gray-900 flex items-center justify-center gap-0.5">
                {host.rating.toFixed(2)}
                <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
              </div>
              <div className="text-[11px] text-gray-500 uppercase tracking-wider">Rating</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <h4 className="text-xl font-bold text-gray-900">About {host.name}</h4>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {host.bio}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Response rate:</span>
              <span>{host.responseRate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Responds:</span>
              <span>{host.responseTime}</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowMessageModal(true)}
              className="px-6 py-3 border border-gray-900 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-100 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message Host</span>
            </button>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600">
            <ShieldCheck className="w-6 h-6 text-gray-700 shrink-0 mt-0.5" />
            <span>
              To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
            </span>
          </div>
        </div>
      </div>

      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowMessageModal(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer absolute top-4 right-4"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Message {host.name}</h3>
            <p className="text-xs text-gray-500 mb-4">Usually responds within an hour</p>

            {messageSent ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-semibold text-gray-900 text-base">Message Sent!</div>
                <div className="text-xs text-gray-500">The host has been alerted on their app.</div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Hi Mirashya Homes, we're planning a trip to Candolim..."
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#FF385C] hover:bg-[#E00B41] text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};