import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import updateLocale from 'dayjs/plugin/updateLocale.js'

import 'dayjs/locale/ja.js'

const thresholds = [
  { l: 's', r: 59, d: 'second' },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'mmm', r: 60 * 24 - 1 },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y', r: 1 },
  { l: 'yy', d: 'year' },
]

dayjs.locale('ja')
dayjs.extend(updateLocale)
dayjs.extend(relativeTime, { thresholds, rounding: Math.floor })

dayjs.updateLocale('ja', {
  relativeTime: {
    future: '%s後',
    past: '%s前',

    s: '数十秒',
    m: '%d分',
    mm: '%d分',
    mmm: (abs) => {
      if (abs % 60 === 0) {
        return `${abs / 60}時間`
      }

      return `${Math.floor(abs / 60)}時間${abs % 60}分`
    },
    d: '%d日',
    dd: '%d日',
    M: '%dヶ月',
    MM: '%dヶ月',
    y: '%d年',
    yy: '%d年',
  },
})

export function getRelativeDate(date) {
  const relativeTimeString = dayjs(date).fromNow()
  const matches = relativeTimeString.match(/(\d+)(.*)/)

  if (matches && matches.length >= 3) {
    const number = matches[1]
    const text = matches[2]
    return { number, text }
  }

  return { number: '', text: '' }
}
