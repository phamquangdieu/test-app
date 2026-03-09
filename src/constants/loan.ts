// Loan calculation initial values
export const LOAN_INITIAL_VALUES = {
  loanAmount: '2,000,000,000',
  loanTerm: '25',
  preferentialInterestRate: '8',
  preferentialTime: '2',
  rateAfterPreferential: '12',
  paymentType: 'decliningBalance' as const,
}

// Payment types
export const PAYMENT_TYPES = {
  DECLINING_BALANCE: 'decliningBalance',
  EMI: 'emi',
} as const

export type PaymentType = (typeof PAYMENT_TYPES)[keyof typeof PAYMENT_TYPES]

// Regex patterns
export const REGEX_PATTERNS = {
  PHONE_VN: /^(0[3|5|7|8|9])+([0-9]{8})$/,
  DIGITS_ONLY: /^[0-9]+$/,
  DECIMAL: /^\d*\.?\d*$/,
  INTEGER: /^\d+$/,
}

// Minimum values
export const MIN_VALUES = {
  WORK_EXPERIENCE_MONTHS: 3,
}
