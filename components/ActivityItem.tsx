import React from 'react';
import { Activity } from '../types';
import { MapPin, Clock } from 'lucide-react';

interface ActivityItemProps {
  activity: Activity;
  isLast: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLast }) => {
  return (
    <div className="relative pl-8 pb-8 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute top-4 left-[11px] h-full w-0.5 bg-gray-200 group-hover:bg-indigo-200 transition-colors" />
      )}
      
      {/* Timeline Dot */}
      <div className="absolute top-1.5 left-0 w-6 h-6 rounded-full bg-white border-4 border-indigo-500 z-10 shadow-sm" />

      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
        <div className="flex items-center text-sm font-semibold text-indigo-600 min-w-[80px]">
          <Clock className="w-4 h-4 mr-1.5" />
          {activity.time}
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="text-lg font-bold text-gray-800 flex items-center mb-1">
            {activity.location}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {activity.description}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${activity.lat},${activity.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium text-indigo-500 hover:text-indigo-700 hover:underline"
          >
            <MapPin className="w-3 h-3 mr-1" />
            開啟地圖
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;