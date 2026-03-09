'use client'
import { Form, Input, Row, Col, Select } from 'antd'
import useLoanStore from '@/store/loanStore'
import { formatCurrency } from '@/utils/currency'
import { useEffect } from 'react'
import { LOAN_PURPOSE_OPTIONS, DISBURSEMENT_METHOD_OPTIONS, BANK_OPTIONS } from '@/constants'

const LoanDetailsStep = () => {
  const form = Form.useFormInstance()
  const totalPayment = useLoanStore((state) => state.totalPayment)
  const totalInterest = useLoanStore((state) => state.totalInterest)
  const loanAmount = useLoanStore((state) => state.loanAmount)
  const loanTerm = useLoanStore((state) => state.loanTerm)

  useEffect(() => {
    form.setFieldsValue({
      requestedAmount: loanAmount,
      loanDuration: loanTerm,
    })
  }, [form, loanAmount, loanTerm])

  return (
    <>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="text-base font-medium mb-3">Thông tin khoản vay đã tính toán</div>
        <Row gutter={16}>
          <Col span={8}>
            <div className="text-gray-500 text-sm">Tổng tiền thanh toán</div>
            <div className="text-lg font-semibold text-primary">
              {formatCurrency(totalPayment)} VNĐ
            </div>
          </Col>
          <Col span={8}>
            <div className="text-gray-500 text-sm">Tổng tiền lãi</div>
            <div className="text-lg font-semibold text-orange-500">
              {formatCurrency(totalInterest)} VNĐ
            </div>
          </Col>
          <Col span={8}>
            <div className="text-gray-500 text-sm">Tổng tiền gốc</div>
            <div className="text-lg font-semibold text-blue-500">
              {formatCurrency(totalPayment - totalInterest)} VNĐ
            </div>
          </Col>
        </Row>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Số tiền cần vay (VNĐ)" name="requestedAmount">
            <Input disabled style={{ textAlign: 'right', backgroundColor: '#f5f5f5' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mục đích vay"
            name="loanPurpose"
            rules={[{ required: true, message: 'Vui lòng chọn mục đích vay' }]}
          >
            <Select placeholder="Chọn mục đích vay" options={LOAN_PURPOSE_OPTIONS} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Thời gian vay (năm)" name="loanDuration">
            <Input disabled style={{ textAlign: 'right', backgroundColor: '#f5f5f5' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Hình thức nhận tiền"
            name="disbursementMethod"
            rules={[{ required: true, message: 'Vui lòng chọn hình thức nhận tiền' }]}
          >
            <Select placeholder="Chọn hình thức nhận tiền" options={DISBURSEMENT_METHOD_OPTIONS} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Tên ngân hàng"
            name="bankName"
            rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng' }]}
          >
            <Select placeholder="Chọn ngân hàng" options={BANK_OPTIONS} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số tài khoản ngân hàng"
            name="bankAccountNumber"
            rules={[
              { required: true, message: 'Vui lòng nhập số tài khoản' },
              { pattern: /^[0-9]+$/, message: 'Số tài khoản chỉ được chứa số' },
            ]}
          >
            <Input placeholder="Nhập số tài khoản để nhận giải ngân" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Tên chủ tài khoản"
        name="bankAccountName"
        rules={[{ required: true, message: 'Vui lòng nhập tên chủ tài khoản' }]}
      >
        <Input
          placeholder="Nhập tên chủ tài khoản (viết hoa không dấu)"
          style={{ textTransform: 'uppercase' }}
        />
      </Form.Item>
    </>
  )
}

export default LoanDetailsStep
