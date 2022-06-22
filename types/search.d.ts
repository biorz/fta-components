import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'
import { CSSProperties, FC, ReactNode } from 'react'
import BaseComponent from './base'

export interface SearchResult {
  label: string
  value?: any
}
export interface SearchProps extends Omit<TaroInputProps, 'style' | 'onInput'>, BaseComponent {
  /**
   * 左侧图标
   */
  icon?: ReactNode
  /**
   * 占位文本颜色
   * @supported rn
   */
  placeholderTextColor?: string
  /**
   * 搜索结果高亮色
   */
  hightlightColor?: string
  /**
   * 搜索结果，无结果请传入空数组
   */
  result?: SearchResult[] | null
  /**
   * 自定义渲染搜索结果
   */
  children?: ReactNode
  /**
   * 右侧取消按钮文本
   * @default '取消'
   */
  cancelText?: string
  /**
   * 是否显示清除按钮
   * @default true
   */
  clearable?: boolean
  /**
   * 输入框类名
   */
  inputClassName?: string
  /**
   * 输入框内联样式
   */
  inputStyle?: CSSProperties
  /**
   * 点击取消时候的回调
   */
  onCancel?: () => any
  /**
   * 点击清除按钮的回调
   */
  onClear?: () => any
  /**
   * 输入值改变的回调
   */
  onChange?: (value: string) => any
  /**
   * 点击搜索结果的回调
   */
  onItemClick?: (value: any) => any
}

declare const Search: FC<SearchProps>

export default Search
