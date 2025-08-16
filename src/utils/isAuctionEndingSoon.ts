import { differenceInDays, differenceInMinutes, parse } from 'date-fns'
import { t } from '../locales'

export function isAuctionEndingSoon(auctionDateTime: string): boolean {
  const auctionDate = parse(auctionDateTime, 'yyyy/MM/dd HH:mm:ss', new Date())
  const now = new Date()

  const diffDays = differenceInDays(auctionDate, now)

  return diffDays < 2
}

export function getAuctionTimeLeft(auctionDateTime: string) {
  const auctionDate = parse(auctionDateTime, 'yyyy/MM/dd HH:mm:ss', new Date())
  const now = new Date()

  const minutesLeft = differenceInMinutes(auctionDate, now)
  if (minutesLeft <= 0) return t('vehiclesListCard.auctionEnded')

  const days = Math.floor(minutesLeft / (60 * 24))
  const hours = Math.floor((minutesLeft % (60 * 24)) / 60)
  const minutes = minutesLeft % 60

  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export function getAuctionStatusText(auctionDateTime: string): string {
  const auctionDate = parse(auctionDateTime, 'yyyy/MM/dd HH:mm:ss', new Date())
  const now = new Date()

  const minutesDiff = differenceInMinutes(auctionDate, now)
  const absMinutes = Math.abs(minutesDiff)

  const days = Math.floor(absMinutes / (60 * 24))
  const hours = Math.floor((absMinutes % (60 * 24)) / 60)
  const minutes = absMinutes % 60

  if (minutesDiff > 0) {
    return t('auction.endsInSimple', { days, hours, minutes })
  } else {
    return t('auction.endedSimple', { days, hours, minutes })
  }
}

export function isAuctionEnded(auctionDateTime: string): boolean {
  const auctionDate = parse(auctionDateTime, 'yyyy/MM/dd HH:mm:ss', new Date())
  const now = new Date()

  return differenceInMinutes(auctionDate, now) <= 0
}
