import * as React from 'react'

export interface CellProps {
  label?: React.ReactNode | string
  value?: React.ReactNode | string
  icon?: React.ReactNode
  align?: 'left' | 'right'
  placeholder?: string
  lineClamp?: number
  isLink?: boolean
  handleClick?: () => void
}
