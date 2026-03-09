'use client'
import { Form, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'

const AttachmentsStep = () => {
  const normFile = (e: { fileList: UploadFile[] }) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isValidType =
        file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf'
      if (!isValidType) {
        message.error('Chỉ chấp nhận file ảnh (JPG, PNG) hoặc PDF!')
        return Upload.LIST_IGNORE
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error('File phải nhỏ hơn 5MB!')
        return Upload.LIST_IGNORE
      }
      return false // Prevent auto upload
    },
    listType: 'picture-card',
    maxCount: 1,
  }

  return (
    <>
      <div className="text-base font-medium mb-4">Ảnh chụp CCCD/CMND</div>
      <div className="flex gap-8 mb-6">
        <Form.Item
          name="idFront"
          label="Mặt trước"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Vui lòng tải ảnh mặt trước CCCD/CMND' }]}
        >
          <Upload {...uploadProps}>
            <div className="flex flex-col items-center">
              <PlusOutlined />
              <div className="mt-2">Tải lên</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="idBack"
          label="Mặt sau"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Vui lòng tải ảnh mặt sau CCCD/CMND' }]}
        >
          <Upload {...uploadProps}>
            <div className="flex flex-col items-center">
              <PlusOutlined />
              <div className="mt-2">Tải lên</div>
            </div>
          </Upload>
        </Form.Item>
      </div>

      <div className="text-base font-medium mb-4">Ảnh chân dung</div>
      <Form.Item
        name="portrait"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Vui lòng tải ảnh chân dung' }]}
        extra="Ảnh chụp trực tiếp khuôn mặt, rõ nét, không đội mũ, không đeo kính"
      >
        <Upload {...uploadProps}>
          <div className="flex flex-col items-center">
            <PlusOutlined />
            <div className="mt-2">Tải lên</div>
          </div>
        </Upload>
      </Form.Item>

      <div className="text-base font-medium mb-4 mt-6">Chứng minh thu nhập</div>
      <Form.Item
        name="incomeProof"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Ảnh chụp bảng lương, sao kê ngân hàng hoặc hợp đồng lao động"
      >
        <Upload {...uploadProps}>
          <div className="flex flex-col items-center">
            <PlusOutlined />
            <div className="mt-2">Tải lên</div>
          </div>
        </Upload>
      </Form.Item>

      <div className="text-base font-medium mb-4 mt-6">Giấy tờ tài sản đảm bảo (nếu có)</div>
      <Form.Item
        name="collateralDocs"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Sổ tiết kiệm, cà vẹt xe, giấy tờ nhà đất..."
      >
        <Upload {...uploadProps}>
          <div className="flex flex-col items-center">
            <PlusOutlined />
            <div className="mt-2">Tải lên</div>
          </div>
        </Upload>
      </Form.Item>
    </>
  )
}

export default AttachmentsStep
