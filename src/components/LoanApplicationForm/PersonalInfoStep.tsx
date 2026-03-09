'use client'
import { Form, Input, DatePicker, Radio, Row, Col } from 'antd'
import { GENDER_OPTIONS, ID_TYPE_OPTIONS } from '@/constants'

const PersonalInfoStep = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input placeholder="Nhập họ và tên theo giấy tờ tùy thân" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
          >
            <Radio.Group options={GENDER_OPTIONS} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày sinh"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Loại giấy tờ"
            name="idType"
            rules={[{ required: true, message: 'Vui lòng chọn loại giấy tờ' }]}
          >
            <Radio.Group options={ID_TYPE_OPTIONS} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Số CCCD/CMND/Hộ chiếu"
            name="idNumber"
            rules={[
              { required: true, message: 'Vui lòng nhập số giấy tờ' },
              { pattern: /^[0-9]+$/, message: 'Chỉ được nhập số' },
            ]}
          >
            <Input placeholder="Nhập số giấy tờ" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Ngày cấp"
            name="idIssueDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày cấp' }]}
          >
            <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày cấp" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Nơi cấp"
            name="idIssuePlace"
            rules={[{ required: true, message: 'Vui lòng nhập nơi cấp' }]}
          >
            <Input placeholder="Nhập nơi cấp" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Địa chỉ thường trú"
        name="permanentAddress"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ thường trú' }]}
      >
        <Input.TextArea
          rows={2}
          placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
        />
      </Form.Item>

      <Form.Item
        label="Nơi ở hiện tại"
        name="currentAddress"
        rules={[{ required: true, message: 'Vui lòng nhập nơi ở hiện tại' }]}
      >
        <Input.TextArea
          rows={2}
          placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
        />
      </Form.Item>
    </>
  )
}

export default PersonalInfoStep
