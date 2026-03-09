import { ScheduleItem } from '@/components/types'
import { parseCurrency } from './currency'

const monthlyPayment = (principal: number, annualRate: number, months: number) => {
  const monthlyRate = annualRate / 12 / 100
  return Math.round((principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)))
}

const calculateEIM = ({
  loanAmount,
  loanTerm,
  periods,
}: {
  loanAmount: number
  loanTerm: number
  periods: { months: number; rate: number }[]
}): { schedule: ScheduleItem[]; totalPayment: number; totalInterest: number } => {
  {
    let balance = loanAmount
    let remainingMonths = loanTerm * 12
    let monthIndex = 1

    const schedule = []

    for (const period of periods) {
      const { months, rate } = period

      const emi = monthlyPayment(balance, rate, remainingMonths)

      const r = rate / 12 / 100

      for (let i = 0; i < months; i++) {
        const interest = Math.round(balance * r)
        let principalPayment = emi - interest

        if (monthIndex === loanTerm * 12) {
          principalPayment = balance
        }

        balance -= principalPayment

        schedule.push({
          month: monthIndex,
          rate,
          payment: principalPayment + interest,
          principal: principalPayment,
          interest,
          balance: balance > 0 ? balance : 0,
        })

        monthIndex++
        remainingMonths--

        if (balance <= 0) break
      }
    }
    const totalPayment = schedule.reduce((sum, p) => sum + p.payment, 0)
    return {
      schedule,
      totalPayment,
      totalInterest: totalPayment - loanAmount,
    }
  }
}

const calculateDecliningBalance = ({
  loanAmount,
  loanTerm,
  periods,
}: {
  loanAmount: number
  loanTerm: number
  periods: { months: number; rate: number }[]
}): { schedule: ScheduleItem[]; totalPayment: number; totalInterest: number } => {
  let balance = loanAmount
  let monthIndex = 1
  const monthlyPrincipal = Math.round(loanAmount / (loanTerm * 12))

  const schedule = []
  for (const period of periods) {
    const { months, rate } = period
    for (let i = 0; i < months; i++) {
      const interest = Math.round(balance * (rate / 12 / 100))
      let principalPayment = monthlyPrincipal
      if (monthIndex === loanTerm * 12) {
        principalPayment = balance
      }

      const payment = principalPayment + interest
      balance -= principalPayment

      schedule.push({
        month: monthIndex,
        rate,
        payment,
        principal: monthlyPrincipal,
        interest,
        balance: balance > 0 ? balance : 0,
      })

      monthIndex++
      if (balance <= 0) {
        break
      }
    }
  }
  const totalPayment = schedule.reduce((sum, p) => sum + p.payment, 0)
  return {
    schedule,
    totalPayment,
    totalInterest: totalPayment - loanAmount,
  }
}

export const generateSchedule = (values: {
  loanAmount: string
  loanTerm: string
  preferentialInterestRate: string
  preferentialTime: string
  rateAfterPreferential: string
  paymentType: 'emi' | 'decliningBalance'
}) => {
  const periods = []
  if (parseInt(values.preferentialTime, 10) > 0) {
    periods.push({
      months: parseInt(values.preferentialTime, 10) * 12,
      rate: parseFloat(values.preferentialInterestRate),
    })
  }
  periods.push({
    months: (parseInt(values.loanTerm, 10) - parseInt(values.preferentialTime, 10)) * 12,
    rate: parseFloat(values.rateAfterPreferential),
  })
  console.log(periods)

  return values.paymentType === 'emi'
    ? calculateEIM({
        loanAmount: parseInt(parseCurrency(values.loanAmount)),
        loanTerm: parseInt(values.loanTerm, 10),
        periods,
      })
    : calculateDecliningBalance({
        loanAmount: parseInt(parseCurrency(values.loanAmount)),
        loanTerm: parseInt(values.loanTerm, 10),
        periods,
      })
}
