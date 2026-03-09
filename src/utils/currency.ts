export const formatCurrency = (value: string | number | undefined): string => {
  if (!value) return ''
  const numericValue = String(value).replace(/\D/g, '')
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const parseCurrency = (value: string | undefined): string => {
  return value ? value.replace(/,/g, '') : ''
}
