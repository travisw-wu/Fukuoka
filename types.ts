export interface Activity {
  time: string;
  location: string;
  description: string;
  lat: number;
  lng: number;
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  tripTitle: string;
  overview: string;
  days: DayPlan[];
}