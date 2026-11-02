export interface Event {
  name: string;
  year: number;
  location: string;
  status: 'completed' | 'upcoming';
}

export interface EventCategory {
  category: string;
  events: Event[];
}
