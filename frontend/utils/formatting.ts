import { format, parseISO } from 'date-fns';

export function formatBirthdate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMMM d, yyyy');
}

export function formatShortDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM d');
}

export function formatScore(score: number): string {
  return `${Math.round(score)}%`;
}
