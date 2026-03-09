import { ScheduleItem } from '@/components/types'
import { create } from 'zustand'

type LoanStoreType = {
  schedule: ScheduleItem[]
  totalPayment: number
  totalInterest: number
  loanAmount: string
  loanTerm: string
  setLoanData: (schedule: ScheduleItem[], totalPayment: number, totalInterest: number) => void
  setLoanInfo: (loanAmount: string, loanTerm: string) => void
}

const useLoanStore = create<LoanStoreType>((set) => ({
  schedule: [],
  totalPayment: 0,
  totalInterest: 0,
  loanAmount: '',
  loanTerm: '',
  setLoanData: (schedule, totalPayment, totalInterest) =>
    set({ schedule, totalPayment, totalInterest }),
  setLoanInfo: (loanAmount, loanTerm) => set({ loanAmount, loanTerm }),
}))

export default useLoanStore
