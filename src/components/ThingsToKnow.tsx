import React from 'react';
import type { PropertyListing } from '../types';
import { Clock, ShieldAlert, Calendar } from 'lucide-react';

interface ThingsToKnowProps {
  listing: PropertyListing;
}

export const ThingsToKnow: React.FC<ThingsToKnowProps> = ({ listing }) => {
  return (
    <section className="py-10">
      <h3 className="text-[22px] font-semibold text-gray-900 mb-6">
        Things to know
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="space-y-4">
          <h4 className="font-semibold text-base text-gray-900">House rules</h4>
          <div className="space-y-3 text-gray-700">
            {listing.houseRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{rule.title}</div>
                  <div className="text-xs text-gray-500">{rule.details}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-base text-gray-900">Safety & property</h4>
          <div className="space-y-3 text-gray-700">
            {listing.safetyRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{rule.title}</div>
                  <div className="text-xs text-gray-500">{rule.details}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-base text-gray-900">Cancellation policy</h4>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">{listing.cancellationPolicy.title}</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {listing.cancellationPolicy.details}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};