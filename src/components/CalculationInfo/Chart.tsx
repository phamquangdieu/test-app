'use client'
import useLoanStore from '@/store/loanStore'
import React from 'react'
const Pie = React.lazy(() => import('@ant-design/plots').then((mod) => ({ default: mod.Pie })))

const LoanChart = () => {
  const totalInterest = useLoanStore((state) => state.totalInterest)
  const totalPayment = useLoanStore((state) => state.totalPayment)
  const principal = totalPayment - totalInterest

  const formatValue = (value: number) => value.toLocaleString('vi-VN') + ' VNĐ'

  const data = [
    {
      key: 'principal',
      type: 'Số tiền gốc',
      value: principal,
      color: '#ff9500',
    },
    { key: 'interest', type: 'Số tiền lãi', value: totalInterest, color: '#0069FF' },
  ]

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.8,
    label: false,
    color: ['#ff9500', '#0069FF'],
    scale: {
      color: {
        range: ['#ff9500', '#0069FF'],
      },
    },
    legend: false,
    tooltip: {
      title: 'type',
      items: [
        {
          field: 'value',
          name: 'Số tiền',
          valueFormatter: (value: number) => `${(value ?? 0).toLocaleString('vi-VN')} VNĐ`,
        },
      ],
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: totalPayment.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 30,
          fontStyle: 'bold',
        },
      },
    ],
  }
  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <div>
        <Pie {...config} width={400} height={400} />
      </div>
      <div>
        {data.map((item) => (
          <div key={item.key} className="flex items-center mb-2">
            <div
              style={{ backgroundColor: item.color }}
              className="w-4 h-4 rounded-full mr-2"
            ></div>
            <span>
              {item.type}: {formatValue(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoanChart
