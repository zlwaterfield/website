export interface Event {
  name: string;
  year: number;
  location: string;
  status: 'completed' | 'upcoming';
}

export interface EventCategory {
  category: string;
  emoji: string;
  color: string;
  events: Event[];
}
