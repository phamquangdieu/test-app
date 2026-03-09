'use client'
import { Form, Input, Row, Col } from 'antd'

const ContactInfoStep = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Số điện thoại di động"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/, message: 'Số điện thoại không hợp lệ' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại chính chủ" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="Nhập địa chỉ email" />
          </Form.Item>
        </Col>
      </Row>

      <div className="text-base font-medium mb-4 mt-6">Người tham chiếu 1</div>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Họ và tên"
            name="reference1Name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên người tham chiếu' }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Mối quan hệ"
            name="reference1Relationship"
            rules={[{ required: true, message: 'Vui lòng nhập mối quan hệ' }]}
          >
            <Input placeholder="Ví dụ: Cha/Mẹ, Anh/Chị, Đồng nghiệp" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Số điện thoại"
            name="reference1Phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/, message: 'Số điện thoại không hợp lệ' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
      </Row>

      <div className="text-base font-medium mb-4 mt-6">Người tham chiếu 2</div>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Họ và tên" name="reference2Name">
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Mối quan hệ" name="reference2Relationship">
            <Input placeholder="Ví dụ: Cha/Mẹ, Anh/Chị, Đồng nghiệp" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Số điện thoại"
            name="reference2Phone"
            rules={[
              { pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/, message: 'Số điện thoại không hợp lệ' },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default ContactInfoStep
