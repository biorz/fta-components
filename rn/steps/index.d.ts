import { FC, ReactElement } from 'react'

export type StepType = 'dot' | 'ordered' | 'custom'

export interface StepsProps {
  /**
   * 当前步骤索引值，受控组件
   * @default 0
   */
  current?: number
  /**
   * 选项数组
   */
  items?: StepsItemProps[]
  /**
   * 子节点
   */
  children?: ReactElement[]
  /**
   * 控件类型
   * - 小圆点
   * - 有序列表
   * - 自定义
   * @default 'dot'
   */
  type?: StepType
  /**
   * 点击项目列表时的回调
   */
  onChange?: (index: number) => void
  /**
   * 格式化文本，默认为索引+1，在type不为dot时生效
   * @default (i) => i+1
   */
  format?: (string | number)[] | ((index: number) => string | number)
}

export interface StepsItemProps extends Pick<StepsProps, 'type' | 'onChange'> {
  /**
   * 当前是否是激活状态
   */
  active?: boolean
  /**
   * 标题
   */
  title?: ReactNode
  /**
   * 描述
   */
  desc?: ReactNode
  /**
   * type 为 ordered 时，圆形里面显示的文字
   */
  mark?: string | number
  /**
   * 自定义渲染圆形图示
   */
  render?: ReactNode
  /**
   * 是否是第一个节点
   * @default false
   */
  startpoint?: boolean
  /**
   * 是否是最后一个节点
   * @default false
   * @private
   */
  endpoint?: boolean
  /**
   * 当前是否最远的激活节点
   * @default false
   * @private
   */
  current?: boolean
  /**
   * 当前索引
   * @private
   */
  index?: number
}

declare const Steps: FC<StepsProps>

declare const StepsItem: FC<StepsItemProps>

export default Steps

export { StepsItem }
