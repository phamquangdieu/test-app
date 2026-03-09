'use client'
import { ConfigProvider, App } from 'antd'
import { ReactNode } from 'react'

const theme = {
  token: {
    colorPrimary: '#6e361a',
    colorLink: '#6e361a',
  },
}

interface AntdProviderProps {
  children: ReactNode
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  return (
    <ConfigProvider theme={theme}>
      <App>{children}</App>
    </ConfigProvider>
  )
}

export default AntdProvider
