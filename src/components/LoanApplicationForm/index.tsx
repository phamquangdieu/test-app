'use client'
import { Modal, Steps, Form, Button, App } from 'antd'
import { useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons'
import PersonalInfoStep from './PersonalInfoStep'
import ContactInfoStep from './ContactInfoStep'
import EmploymentInfoStep from './EmploymentInfoStep'
import LoanDetailsStep from './LoanDetailsStep'
import AttachmentsStep from './AttachmentsStep'
import SuccessStep from './SuccessStep'

const steps = [
  {
    title: 'Thông tin cá nhân',
    description: 'Định danh người vay',
    fields: [
      'fullName',
      'gender',
      'dateOfBirth',
      'idType',
      'idNumber',
      'idIssueDate',
      'idIssuePlace',
      'permanentAddress',
      'currentAddress',
    ],
  },
  {
    title: 'Thông tin liên lạc',
    description: 'Số điện thoại, email, người tham chiếu',
    fields: ['phoneNumber', 'email', 'reference1Name', 'reference1Relationship', 'reference1Phone'],
  },
  {
    title: 'Công việc & Thu nhập',
    description: 'Nghề nghiệp, công ty, thu nhập',
    fields: [
      'occupation',
      'companyName',
      'companyAddress',
      'monthlyIncome',
      'workExperience',
      'incomeType',
    ],
  },
  {
    title: 'Chi tiết khoản vay',
    description: 'Số tiền, mục đích, thời gian vay',
    fields: [
      'loanPurpose',
      'disbursementMethod',
      'bankName',
      'bankAccountNumber',
      'bankAccountName',
    ],
  },
  {
    title: 'Hồ sơ đính kèm',
    description: 'CCCD, ảnh chân dung, chứng từ',
    fields: ['idFront', 'idBack', 'portrait'],
  },
  {
    title: 'Hoàn tất',
    description: 'Đăng ký thành công',
    fields: [],
  },
]

const LoanApplicationForm = ({ open, onCancel }: { open: boolean; onCancel: () => void }) => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { modal } = App.useApp()

  const handleNext = async () => {
    try {
      const currentFields = steps[currentStep].fields
      await form.validateFields(currentFields)
      setCurrentStep(currentStep + 1)
    } catch {
      // Validation failed
    }
  }

  const handlePrev = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const currentFields = steps[currentStep].fields
      await form.validateFields(currentFields)
      const values = form.getFieldsValue(true)
      console.log('Form submitted:', values)
      // Move to success step
      setCurrentStep(currentStep + 1)
    } catch {
      // Validation failed
    } finally {
      setLoading(false)
    }
  }

  const isSuccessStep = currentStep === steps.length - 1

  const showConfirmCancel = () => {
    modal.confirm({
      title: 'Xác nhận hủy đăng ký',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn có chắc chắn muốn hủy? Tất cả thông tin đã nhập sẽ bị xóa.',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Tiếp tục nhập',
      onOk() {
        form.resetFields()
        setCurrentStep(0)
        onCancel()
      },
    })
  }

  const handleCancel = () => {
    if (isSuccessStep) {
      // If on success step, just close without confirm
      form.resetFields()
      setCurrentStep(0)
      onCancel()
    } else {
      showConfirmCancel()
    }
  }

  const handleClose = () => {
    form.resetFields()
    setCurrentStep(0)
    onCancel()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />
      case 1:
        return <ContactInfoStep />
      case 2:
        return <EmploymentInfoStep />
      case 3:
        return <LoanDetailsStep />
      case 4:
        return <AttachmentsStep />
      case 5:
        return <SuccessStep />
      default:
        return null
    }
  }

  return (
    <Modal
      open={open}
      title="Đăng ký vay vốn"
      footer={null}
      width={1000}
      onCancel={handleCancel}
      destroyOnHidden
    >
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0 py-6">
          <Steps
            orientation="vertical"
            size="small"
            current={currentStep}
            items={steps.map((step) => ({
              title: step.title,
              content: step.description,
            }))}
          />
        </div>
        <div className="flex-1 border-l p-6">
          <Form form={form} layout="vertical" className="p-2">
            {renderStepContent()}
          </Form>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            {isSuccessStep ? (
              <Button type="primary" onClick={handleClose}>
                Đóng
              </Button>
            ) : (
              <>
                {currentStep > 0 && <Button onClick={handlePrev}>Quay lại</Button>}
                {currentStep < steps.length - 2 ? (
                  <Button type="primary" onClick={handleNext}>
                    Tiếp tục
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleSubmit} loading={loading}>
                    Hoàn tất đăng ký
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LoanApplicationForm
