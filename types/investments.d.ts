export interface Investment {
  name: string;
  investedVia?: string;
  description: string;
  url: string;
  brandColor: string;
  brandAccent: string;
  brandHighlight?: string;
  status?: 'acquired';
  acquiredBy?: string;
}