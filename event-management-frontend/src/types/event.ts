export interface Event {
  id: string;
  name: string;
  date: string;
  endDate: string;
  location: string;
  clientId: string;
  estimatedGuests: number;
  eventType: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'canceled';
}

export interface EventTimeline {
  id: string;
  title: string;
  description: string;
  date: string;
  // ...other fields if needed
}