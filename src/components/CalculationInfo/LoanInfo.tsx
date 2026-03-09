'use client'
import { parseCurrency } from '@/utils/currency'
import {
  validateCurrencyNumber,
  validateDecimalGreaterOrEqualZero,
  validateIntegerGreaterOrEqualZero,
} from '@/utils/validators'
import { Button, Form, Input, Radio } from 'antd'
import CurrencyInput from './CurrencyInput'
import { generateSchedule } from '@/utils/calculator'
import { debounce } from 'lodash'
import useLoanStore from '@/store/loanStore'
import { useCallback, useEffect } from 'react'
import { LOAN_INITIAL_VALUES } from '@/constants'

const LoanInfo = ({
  onOpen,
  onApplicationOpen,
}: {
  onOpen: () => void
  onApplicationOpen: () => void
}) => {
  const [form] = Form.useForm()
  const setLoanData = useLoanStore((state) => state.setLoanData)
  const setLoanInfo = useLoanStore((state) => state.setLoanInfo)

  const calculate = useCallback(
    (values: typeof LOAN_INITIAL_VALUES) => {
      try {
        const { schedule, totalPayment, totalInterest } = generateSchedule({
          loanAmount: values.loanAmount,
          loanTerm: values.loanTerm,
          preferentialInterestRate: values.preferentialInterestRate || '0',
          preferentialTime: values.preferentialTime || '0',
          rateAfterPreferential: values.rateAfterPreferential,
          paymentType: values.paymentType || 'decliningBalance',
        })
        setLoanData(schedule, totalPayment, totalInterest)
        setLoanInfo(values.loanAmount, values.loanTerm)
      } catch {
        // Handle validation errors if needed
      }
    },
    [setLoanData, setLoanInfo]
  )

  const onChange = debounce(async () => {
    try {
      const values = await form.validateFields()
      calculate(values)
    } catch {
      // Handle validation errors if needed
    }
  }, 500)

  useEffect(() => {
    calculate(LOAN_INITIAL_VALUES)
  }, [calculate])

  return (
    <Form
      form={form}
      initialValues={LOAN_INITIAL_VALUES}
      name="loan-info"
      layout="vertical"
      onChange={onChange}
    >
      <Form.Item
        label="Số tiền vay"
        name="loanAmount"
        rules={[
          {
            validator: (_, value) => validateCurrencyNumber(_, value, parseCurrency),
          },
          { required: true, message: 'Vui lòng nhập số tiền vay' },
        ]}
      >
        <CurrencyInput style={{ textAlign: 'right' }} />
      </Form.Item>
      <Form.Item
        label="Thời gian vay (năm)"
        name="loanTerm"
        rules={[
          {
            validator: validateIntegerGreaterOrEqualZero,
          },
          {
            required: true,
            message: 'Vui lòng nhập thời gian vay',
          },
        ]}
      >
        <Input style={{ textAlign: 'right' }} />
      </Form.Item>
      <Form.Item
        label="Lãi suất ưu đãi (%)"
        name="preferentialInterestRate"
        rules={[{ validator: validateDecimalGreaterOrEqualZero }]}
      >
        <Input style={{ textAlign: 'right' }} />
      </Form.Item>
      <Form.Item
        label="Thời gian ưu đãi (năm)"
        name="preferentialTime"
        rules={[{ validator: validateIntegerGreaterOrEqualZero }]}
      >
        <Input style={{ textAlign: 'right' }} />
      </Form.Item>
      <Form.Item
        label="Lãi suất sau ưu đãi (%)"
        name="rateAfterPreferential"
        rules={[
          { validator: validateDecimalGreaterOrEqualZero },
          { required: true, message: 'Vui lòng nhập lãi suất sau ưu đãi' },
        ]}
      >
        <Input style={{ textAlign: 'right' }} />
      </Form.Item>
      <Form.Item label="Loại trả góp" name="paymentType">
        <Radio.Group>
          <Radio value="decliningBalance">Dư nợ giảm dần</Radio>
          <Radio value="emi">Trả đều hàng tháng</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <div className="flex gap-4">
          <Button className="w-full" onClick={onOpen}>
            Xem chi tiết
          </Button>
          <Button type="primary" className="w-full" onClick={onApplicationOpen}>
            Đăng ký vay vốn
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default LoanInfo
