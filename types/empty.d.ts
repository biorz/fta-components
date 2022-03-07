import { ComponentClass } from 'react'

export type EmptyType = 'empty' | 'error'

export interface EmptyProps {
  /**
   * 空状态或者是错误页面
   * @default 'empty'
   */
  type?: EmptyType
  /**
   * 展示的图片URL
   */
  src?: string
  /**
   * 提示标题
   */
  title?: string
  /**
   * 提示内容
   */
  desc?: string
  /**
   * 是否展示
   * @default true
   */
  show?: boolean
  /**
   * 是否展示按钮
   * @default true
   */
  showBtn?: boolean

  /**
   * 按钮文本
   * @default '刷新试试'
   */
  btnText?: string
  /**
   * 按钮点击事件
   */
  onClick?(): void
  // [key: string]: any
}

declare const Empty: ComponentClass<EmptyProps>

export default Empty
