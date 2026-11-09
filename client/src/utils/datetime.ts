import dayjs from 'dayjs';

import type { Language } from '@client/src/i18n/dictionary';

const VI_WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const weekdayShort = (value: Date | string, lang: Language): string =>
  lang === 'vi'
    ? VI_WEEKDAYS[dayjs(value).day()]
    : dayjs(value).format('ddd').toUpperCase();

export const formatBoardDate = (value: Date | string, lang: Language = 'vi'): string =>
  lang === 'vi'
    ? `${weekdayShort(value, lang)}, ${dayjs(value).format('DD/MM/YYYY')}`
    : dayjs(value).format('ddd, DD MMM YYYY');

export const formatBoardTime = (value: Date | string): string =>
  dayjs(value).format('HH:mm:ss');

export const formatBoardDateLong = (value: Date | string): string =>
  dayjs(value).format('YYYY-MM-DD');

export const formatSyncStamp = (value: Date | string): string =>
  dayjs(value).format('YYYY-MM-DD HH:mm:ss');

export const formatBoardStampWithWeekday = (
  value: Date | string,
  lang: Language = 'vi',
): string =>
  `${dayjs(value).format('YYYY-MM-DD HH:mm:ss')} ${weekdayShort(value, lang)}`;
