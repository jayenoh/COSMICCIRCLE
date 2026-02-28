import { ZODIAC_SIGNS } from '@/constants/zodiac';

const SIGN_DATES: [number, number, string][] = [
  [1, 20, 'aquarius'],
  [2, 19, 'pisces'],
  [3, 21, 'aries'],
  [4, 20, 'taurus'],
  [5, 21, 'gemini'],
  [6, 21, 'cancer'],
  [7, 23, 'leo'],
  [8, 23, 'virgo'],
  [9, 23, 'libra'],
  [10, 23, 'scorpio'],
  [11, 22, 'sagittarius'],
  [12, 22, 'capricorn'],
];

export function getSunSign(birthdate: string | Date): string {
  // Parse date string manually to avoid timezone issues
  // new Date("1995-03-21") is UTC, but getDate() returns local date
  let month: number, day: number;
  if (typeof birthdate === 'string') {
    const parts = birthdate.split('-');
    month = parseInt(parts[1], 10);
    day = parseInt(parts[2], 10);
  } else {
    month = birthdate.getMonth() + 1;
    day = birthdate.getDate();
  }

  for (let i = SIGN_DATES.length - 1; i >= 0; i--) {
    const [startMonth, startDay, sign] = SIGN_DATES[i];
    if (month > startMonth || (month === startMonth && day >= startDay)) {
      return sign;
    }
  }
  return 'capricorn';
}

export function getZodiacInfo(sign: string) {
  return ZODIAC_SIGNS[sign] || ZODIAC_SIGNS.aries;
}

export function getElementColor(element: string): string {
  const colors: Record<string, string> = {
    fire: '#F43F5E',
    earth: '#10B981',
    air: '#22D3EE',
    water: '#6366F1',
  };
  return colors[element] || '#7C3AED';
}
