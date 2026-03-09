'use client'
import { Result } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'

const SuccessStep = () => {
  return (
    <div className="py-8">
      <Result
        icon={<CheckCircleFilled style={{ color: '#52c41a', fontSize: 72 }} />}
        title="Đăng ký khoản vay thành công!"
        subTitle={
          <div className="text-gray-500 mt-2">
            <p>Cảm ơn bạn đã đăng ký khoản vay tại hệ thống của chúng tôi.</p>
            <p className="mt-2">
              Chúng tôi sẽ xem xét hồ sơ của bạn và liên hệ trong vòng{' '}
              <span className="font-semibold text-primary">24-48 giờ làm việc</span>.
            </p>
            <p className="mt-4">Vui lòng giữ điện thoại để nhận cuộc gọi từ nhân viên tư vấn.</p>
          </div>
        }
      />
      <div className="bg-gray-50 rounded-lg p-4 mt-4 mx-8">
        <div className="text-base font-medium mb-3">Lưu ý quan trọng:</div>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Kiểm tra email thường xuyên để nhận thông báo cập nhật</li>
          <li>Chuẩn bị sẵn giấy tờ gốc khi nhân viên yêu cầu</li>
          <li>Không chia sẻ mã OTP với bất kỳ ai</li>
          <li>
            Liên hệ hotline <span className="font-semibold">1900 xxxx</span> nếu cần hỗ trợ
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SuccessStep
