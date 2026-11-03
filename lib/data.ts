import fs from 'fs';
import path from 'path';
import type { EventCategory } from '@/types/events';
import type { Investment } from '@/types/investments';

const read = <T>(file: string): T =>
  JSON.parse(fs.readFileSync(path.resolve(`./data/${file}`), 'utf-8')) as T;

export const getInvestments = (): Investment[] => read<Investment[]>('investments.json');
export const getEvents = (): EventCategory[] => read<EventCategory[]>('events.json');
