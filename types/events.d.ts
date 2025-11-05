export interface Event {
  name: string;
  year: number;
  location: string;
}

export interface EventCategory {
  category: string;
  emoji: string;
  color: string;
  comingSoon?: boolean;
  events: Event[];
}
