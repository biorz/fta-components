import { CSSProperties, FC, ReactNode } from 'react'
import BaseComponent from './base'

export interface ScrollAreaProps {
  className?: string
  style?: CSSProperties
  /**
   * 数据列表
   */
  options: Option[] | null | undefined
  /**
   * 每个item的绝对高度
   * @default 46
   */
  itemHeight?: number
}

export type Option = {
  /**
   * 绑定值
   */
  value?: string | number
  /**
   * 显示的标签
   */
  label?: ReactNode
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 子节点
   */
  children?: Option
}

export interface SelectorProps extends BaseComponent {
  /**
   * 指定选中项
   */
  value: string[] | number[]
  /**
   * 选择器深度
   * @default 3
   */
  depth?: number
  /**
   * 是否支持多选
   * @default false
   */
  multiple?: boolean
  /**
   *（多选时生效）多选上限
   * @default 3
   */
  limit?: number
  /**
   * 主题色，默认为满帮橙
   * @default '#FA871E'
   */
  theme?: string
  /**
   * 是否显示搜索框
   * @default false
   */
  showSearch?: boolean
  /**
   * 自定义选择的后缀图标, 传入字符串默认为图片URL
   */
  suffixIcon?: ReactNode
  /**
   * 自定义选中的后缀图标，传入字符串默认为图片URL
   */
  activeSuffixIcon?: ReactNode

  /**
   * 自定义options中的label value children 字段
   * @default {label: 'label', value: 'value', children: 'children', [key: string]: any}
   */
  fieldNames?: {
    label?: string
    value?: string
    children?: string
    [key: string]: string
  }
  /**
   * （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示
   * @default false
   */
  changeOnSelect?: boolean
  /**
   * 滚动容器类名
   */
  containerClassName?: string
  /**
   * 滚动容器内联样式
   */
  containerStyle?: CSSProperties
  /**
   * 选择改变后的回调
   */
  onChange?: (value, selectedOptions) => void

  [key: string]: any
}

declare const Selector: FC<SelectorProps>

export default Selector
