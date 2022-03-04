import { ComponentClass, ReactNode } from 'react'

export type ResultType = 'success' | 'error' | 'info' | 'waiting' | 'warning'

export interface ResultProps {
  /**
   * 结果类型
   * @default 'success'
   */
  type?: ResultType
  /**
   * 结果标题文字（第一行）
   */
  title?: string
  /**
   * 结果描述文字（第二行）
   */
  desc?: string
  /**
   * 结果图URL
   */
  src?: string
  /**
   * 按钮文字
   * @default '返回'
   */
  btnText?: string
  /**
   * 自定义按钮节点
   */
  renderBtn?: ReactNode
  /**
   * 点击按钮时的回调
   */
  onClick?(): void
}

declare const Result: ComponentClass<ResultProps, ResultState>

export default Result
