'use client'
import { Col, Row } from 'antd'
import { useCallback, useState } from 'react'
import LoanChart from './Chart'
import LoanInfo from './LoanInfo'
import LoanApplicationForm from '../LoanApplicationForm'
import DetailTable from './DetailTable'

const CalculationInfo = () => {
  const [open, setOpen] = useState(false)
  const [applicationOpen, setApplicationOpen] = useState(false)
  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const onCancel = useCallback(() => {
    setOpen(false)
  }, [])
  const onApplicationOpen = useCallback(() => {
    setApplicationOpen(true)
  }, [])
  const onApplicationCancel = useCallback(() => {
    setApplicationOpen(false)
  }, [])
  return (
    <div className="m-10">
      <div className="text-2xl font-semibold uppercase tracking-wide">
        Công cụ tính toán khoản vay
      </div>
      <div className="mt-8 px-8 py-4 bg-white rounded-md">
        <Row gutter={32} className="mt-4">
          <Col span={12}>
            <LoanInfo onOpen={onOpen} onApplicationOpen={onApplicationOpen} />
          </Col>
          <Col span={12}>
            <LoanChart />
          </Col>
        </Row>
        <DetailTable open={open} onCancel={onCancel} />
        <LoanApplicationForm open={applicationOpen} onCancel={onApplicationCancel} />
      </div>
    </div>
  )
}

export default CalculationInfo
