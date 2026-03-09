import useLoanStore from '@/store/loanStore'
import { formatCurrency } from '@/utils/currency'
import { Modal, Table } from 'antd'

const DetailTable = ({ open, onCancel }: { open: boolean; onCancel: () => void }) => {
  const schedule = useLoanStore((state) => state.schedule)
  const columns = [
    { title: 'Tháng', dataIndex: 'month', key: 'month', align: 'center' as const, width: 50 },
    { title: 'Lãi suất (%)', dataIndex: 'rate', key: 'rate', align: 'right' as const, width: 50 },
    {
      title: 'Số tiền thanh toán (VNĐ)',
      dataIndex: 'payment',
      key: 'payment',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value),
      width: 100,
    },
    {
      title: 'Số tiền gốc (VNĐ)',
      dataIndex: 'principal',
      key: 'principal',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value),
      width: 100,
    },
    {
      title: 'Số tiền lãi (VNĐ)',
      dataIndex: 'interest',
      key: 'interest',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value),
      width: 100,
    },
    {
      title: 'Số dư nợ (VNĐ)',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value) || 0,
      width: 100,
    },
  ]

  return (
    <Modal open={open} title="Chi tiết lịch trả nợ" footer={null} width={1000} onCancel={onCancel}>
      <Table
        size="small"
        columns={columns}
        dataSource={schedule}
        pagination={false}
        scroll={{ y: 400 }}
        rowKey="month"
        rowClassName={(_, index) => (index % 2 === 0 ? '' : 'bg-[#f5f5f5]')}
      />
    </Modal>
  )
}

export default DetailTable
