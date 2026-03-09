import type { RuleObject } from 'antd/es/form'

export const validateDecimalGreaterOrEqualZero = (
  _: RuleObject,
  value: string | undefined
): Promise<void> => {
  if (value === undefined || value === '') {
    return Promise.resolve()
  }
  const num = parseFloat(value)
  if (isNaN(num) || !/^\d*\.?\d*$/.test(value)) {
    return Promise.reject('Vui lòng nhập số thập phân hợp lệ')
  }
  if (num < 0) {
    return Promise.reject('Giá trị phải lớn hơn hoặc bằng 0')
  }
  return Promise.resolve()
}

export const validateIntegerGreaterOrEqualZero = (
  _: RuleObject,
  value: string | undefined
): Promise<void> => {
  if (value === undefined || value === '') {
    return Promise.resolve()
  }
  if (!/^\d+$/.test(value)) {
    return Promise.reject('Vui lòng nhập số nguyên')
  }
  const num = parseInt(value, 10)
  if (num < 0) {
    return Promise.reject('Giá trị phải lớn hơn hoặc bằng 0')
  }
  return Promise.resolve()
}

export const validateCurrencyNumber = (
  _: RuleObject,
  value: string | undefined,
  parseCurrency: (val: string | undefined) => string
): Promise<void> => {
  const numericValue = parseCurrency(value)
  if (numericValue && !/^\d+$/.test(numericValue)) {
    return Promise.reject('Vui lòng chỉ nhập số')
  }
  return Promise.resolve()
}
