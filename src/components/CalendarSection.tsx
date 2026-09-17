import React from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, isBefore, startOfToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarSectionProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClearDates: () => void;
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  checkInDate,
  checkOutDate,
  onSelectDate,
  onClearDates,
  currentMonth,
  onPrevMonth,
  onNextMonth
}) => {
  const nextMonth = addMonths(currentMonth, 1);
  const today = startOfToday();

  const renderMonthDays = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Day of week offset for start of month (0 = Sunday)
    const startDayOffset = monthStart.getDay();
    const blankDays = Array.from({ length: startDayOffset });

    return (
      <div className="w-full">
        <div className="text-center font-semibold text-gray-900 mb-4">
          {format(monthDate, 'MMMM yyyy')}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {blankDays.map((_, i) => (
            <div key={`blank-${i}`} className="h-10" />
          ))}
          {days.map((day) => {
            const isPast = isBefore(day, today);
            const isStart = checkInDate && isSameDay(day, checkInDate);
            const isEnd = checkOutDate && isSameDay(day, checkOutDate);
            const isInRange = checkInDate && checkOutDate && isWithinInterval(day, { start: checkInDate, end: checkOutDate });

            let dayStyle = 'hover:border-black cursor-pointer text-gray-900';
            let bgStyle = 'bg-transparent';

            if (isPast) {
              dayStyle = 'text-gray-300 cursor-not-allowed line-through';
            } else if (isStart || isEnd) {
              bgStyle = 'bg-black text-white rounded-full font-semibold';
            } else if (isInRange) {
              bgStyle = 'bg-gray-100 text-gray-900';
            }

            return (
              <button
                key={day.toISOString()}
                disabled={isPast}
                onClick={() => onSelectDate(day)}
                className={`h-10 w-10 mx-auto flex items-center justify-center text-sm rounded-full transition-colors relative ${dayStyle} ${bgStyle}`}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nightsCount =
    checkInDate && checkOutDate
      ? Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

  return (
    <div className="py-8 border-b border-gray-200 calendar-container">
      <div className="mb-6">
        <h3 className="text-[22px] font-semibold text-gray-900">
          {nightsCount > 0 ? `${nightsCount} nights in Candolim` : 'Select check-in date'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {checkInDate && checkOutDate
            ? `${format(checkInDate, 'MMM d, yyyy')} – ${format(checkOutDate, 'MMM d, yyyy')}`
            : 'Add your travel dates for exact pricing'}
        </p>
      </div>

      {/* Dual Month Calendar View */}
      <div className="relative">
        {/* Navigation Arrows */}
        <div className="flex justify-between items-center absolute -top-12 right-0 gap-2">
          <button
            onClick={onPrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
          {renderMonthDays(currentMonth)}
          {renderMonthDays(nextMonth)}
        </div>
      </div>

      {/* Clear Dates Action */}
      <div className="mt-6 flex justify-end">
        {(checkInDate || checkOutDate) && (
          <button
            onClick={onClearDates}
            className="text-sm font-semibold underline text-gray-900 hover:text-black cursor-pointer"
          >
            Clear dates
          </button>
        )}
      </div>
    </div>
  );
};
