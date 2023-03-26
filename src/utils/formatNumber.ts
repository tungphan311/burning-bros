export const formatPrice = (price: number, locale = 'en-US', currency = 'USD'): string => {
  const formatter = Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  })
  return formatter.format(price)
}
