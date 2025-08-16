interface StartingBidFormatter {
  (startingBid: number): string
}

export const startingBidFormatted: StartingBidFormatter = (
  startingBid: number,
): string =>
  new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(startingBid)
