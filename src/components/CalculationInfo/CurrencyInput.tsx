'use client'
import { Input, InputRef } from 'antd'
import { useRef, useEffect, useState, ChangeEvent } from 'react'
import { formatCurrency } from '@/utils/currency'

interface CurrencyInputProps {
  value?: string
  onChange?: (value: string) => void
  style?: React.CSSProperties
}

const CurrencyInput = ({ value, onChange, style }: CurrencyInputProps) => {
  const inputRef = useRef<InputRef>(null)
  const [cursorPosition, setCursorPosition] = useState<number | null>(null)

  useEffect(() => {
    if (cursorPosition !== null && inputRef.current?.input) {
      inputRef.current.input.setSelectionRange(cursorPosition, cursorPosition)
    }
  }, [cursorPosition, value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const rawValue = input.value
    const selectionStart = input.selectionStart || 0

    const newRawValue = rawValue

    const digitsBeforeCursor =
      selectionStart - (newRawValue.slice(0, selectionStart).match(/,/g) || []).length

    const formatted = formatCurrency(newRawValue)

    let newCursorPos = 0
    let digitCount = 0
    for (let i = 0; i < formatted.length; i++) {
      if (digitCount >= digitsBeforeCursor) {
        newCursorPos = i
        break
      }
      if (formatted[i] !== ',') {
        digitCount++
      }
      newCursorPos = i + 1
    }

    setCursorPosition(newCursorPos)
    onChange?.(formatted)
  }

  return <Input ref={inputRef} value={value} onChange={handleChange} style={style} />
}

export default CurrencyInput
