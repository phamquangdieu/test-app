'use client'
import { Form, Input, InputNumber, Row, Col, Select } from 'antd'
import CurrencyInput from '../CalculationInfo/CurrencyInput'
import { OCCUPATION_OPTIONS, INCOME_TYPE_OPTIONS } from '@/constants'

const EmploymentInfoStep = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Nghề nghiệp/Vị trí công tác"
            name="occupation"
            rules={[{ required: true, message: 'Vui lòng chọn nghề nghiệp' }]}
          >
            <Select placeholder="Chọn nghề nghiệp" options={OCCUPATION_OPTIONS} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Tên đơn vị/Công ty"
            name="companyName"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
          >
            <Input placeholder="Nhập tên công ty/đơn vị đang làm việc" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Địa chỉ công ty"
            name="companyAddress"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ công ty' }]}
          >
            <Input placeholder="Nhập địa chỉ công ty" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số điện thoại công ty" name="companyPhone">
            <Input placeholder="Nhập số điện thoại công ty (nếu có)" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Thu nhập hàng tháng (VNĐ)"
            name="monthlyIncome"
            rules={[{ required: true, message: 'Vui lòng nhập thu nhập' }]}
          >
            <CurrencyInput style={{ textAlign: 'right' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Thâm niên công tác (tháng)"
            name="workExperience"
            rules={[
              { required: true, message: 'Vui lòng nhập thâm niên' },
              {
                validator: (_, value) => {
                  if (value && parseInt(value) < 3) {
                    return Promise.reject('Thâm niên tối thiểu 3 tháng')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <InputNumber
              min={0}
              placeholder="Số tháng làm việc"
              style={{ width: '100%', textAlign: 'right' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Hình thức thu nhập"
            name="incomeType"
            rules={[{ required: true, message: 'Vui lòng chọn hình thức thu nhập' }]}
          >
            <Select placeholder="Chọn hình thức thu nhập" options={INCOME_TYPE_OPTIONS} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default EmploymentInfoStep
