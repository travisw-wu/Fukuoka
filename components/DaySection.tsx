import React from 'react';
import { DayPlan } from '../types';
import ActivityItem from './ActivityItem';
import { Map, Calendar } from 'lucide-react';

interface DaySectionProps {
  day: DayPlan;
}

const DaySection: React.FC<DaySectionProps> = ({ day }) => {
  // Construct a Google Maps Directions URL
  const generateRouteUrl = () => {
    if (day.activities.length === 0) return '#';
    
    const baseUrl = "https://www.google.com/maps/dir/";
    // Join locations by slash. Encode URI components just in case.
    const destinations = day.activities
      .map(act => `${act.lat},${act.lng}`)
      .join('/');
      
    return `${baseUrl}${destinations}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8 transition-transform hover:-translate-y-1 duration-300">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-100 text-sm uppercase tracking-wider font-bold mb-1">
            <Calendar className="w-4 h-4" />
            第 {day.dayNumber} 天
          </div>
          <h3 className="text-2xl font-bold">{day.theme}</h3>
        </div>
        <a
          href={generateRouteUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-4 py-2 rounded-full text-sm font-semibold flex items-center transition-all backdrop-blur-sm"
        >
          <Map className="w-4 h-4 mr-2" />
          路線規劃
        </a>
      </div>
      
      <div className="p-6 sm:p-8">
        {day.activities.map((activity, index) => (
          <ActivityItem 
            key={index} 
            activity={activity} 
            isLast={index === day.activities.length - 1} 
          />
        ))}
      </div>
    </div>
  );
};

export default DaySection;