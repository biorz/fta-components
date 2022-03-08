import { ComponentClass } from 'react'
interface IProps {
  text: string
  shape?: string
  size?: string
  clickTag?: Function
  clickIcon?: Function
  closeable?: string
  color?: string
  bgColor?: string
  mode?: 'dark' | 'plain' | 'light'
  borderColor?: string
  type?: 'success' | 'info' | 'warning' | 'error' | 'primary'
}
interface Istate {
  isRN: boolean
}

declare const Tag: ComponentClass<IProps>

export default Tag
