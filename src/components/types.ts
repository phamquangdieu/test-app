export type LoanInfoFormValues = {
  loanAmount: string
  loanTerm: string
  preferentialInterestRate: string
  preferentialTime: string
  rateAfterPreferential: string
  paymentType: 'emi' | 'decliningBalance'
}

export type ScheduleItem = {
  month: number
  rate: number
  payment: number
  principal: number
  interest: number
  balance: number
}
