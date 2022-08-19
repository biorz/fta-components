import { ComponentType, CSSProperties, FC, ReactNode, RefObject } from 'react'
import { SafeAreaProps } from './safe-area'

export interface Option {
  label: string
  value?: any
}

export interface BaseDropdown {
  /**
   * 是否对item列表绝对定位，不支持RN
   * @unsupported rn
   * @default true
   */
  absolute?: boolean
  /**
   * 自定义激活时的箭头图标
   */
  arrow?: string
  /**
   * 自定义选中时的对号图标
   */
  check?: string
  /**
   * 级联选择的延迟效果，单位ms
   * @since 1.0.3-beta.5
   * @default 200
   */
  delay?: number
  /**
   * 是否显示下层遮罩层
   * @default true
   */
  overlay?: boolean
  /**
   * 遮罩层类名
   */
  overlayClassName?: string
  /**
   * 遮罩层内联样式
   */
  overlayStyle?: CSSProperties
  /**
   * 底部安全区相关属性
   * @since 1.0.3-beta.7
   */
  safeArea?: SafeAreaProps
  /**
   * 选中值改变的回调
   */
  onChange?(prop: string, value: any, depth?: number): any
}

export interface DropdownWithChildren extends BaseDropdown {
  /**
   * 自定义节点
   */
  children?: ReactNode
}

export interface DropdownWithList extends BaseDropdown {
  /**
   * 下拉菜单列表
   */
  list?: DropdownItemProps[]
}

export type DropdownProps = DropdownWithChildren | DropdownWithList

export interface DropdownItemProps {
  /**
   * 当前item标识
   */
  prop?: string
  /**
   * 显示的标题
   */
  title?: string
  /**
   * 列表
   */
  options?: Option[] | ((depth: number, opt: Option) => Option[] | false)
  /**
   * 指定选择的最大深度，仅在options返回函数时生效
   */
  maxDepth?: number
  /**
   * 默认激活的索引，设置为-1则默认不聚焦
   * 级联选择请传入数组
   */
  activeIndex?: number | number[]
  /**
   * 阻止默认展开事件
   * @default false
   * @since 1.0.3-beta.5
   */
  preventDefault?: boolean
  /**
   * menu 点击事件
   * @since 1.0.3-beta.5
   */
  onClick?: () => void
}

export interface DropdownOptionProps {
  /**
   * 展示文本
   */
  children: string
  /**
   * 当前项是否激活
   */
  active?: boolean
  /**
   * 不展示下边框
   */
  borderless?: boolean
  /**
   * 自定义选中图标
   */
  check?: string
  /**
   * 点击当前项的回调
   */
  onClick?: () => any
}

export interface DropdownSideEffectState
  extends Required<Pick<DropdownItemProps, 'options' | 'activeIndex' | 'prop'>>,
    Pick<DropdownItemProps, 'preventDefault' | 'maxDepth'> {
  //  activeItem: number
  /**
   * 是否打开选择面板
   * @private
   */
  isOpened: boolean
  /**
   * 值改变时候的回调
   */
  onChange: (activeIndex: number, depth?: number) => any

  rect: any

  height: number
}

export interface DropdownRef {
  /** 收起下拉菜单 */
  close: () => void
  /** 重新对下拉菜单进行定位，适用于滚动场景或元素位置会动态改变时 */
  measure: () => void
}

export interface DropdownItemRef extends Omit<DropdownRef, 'measure'> {
  isOpened?: () => boolean
}

export interface DropdownContext extends Pick<DropdownProps, 'arrow' | 'check'> {
  register: <T extends RefObject<any>>(ref: T) => void

  unregister: <T extends RefObject<any>>(ref: T) => void

  toggle: <T extends any, K extends any>(t: T, k?: K) => void

  [key: string]: any
}

declare const Dropdown: FC<DropdownProps>

declare const DropdownItem: FC<DropdownItemProps>

declare const DropdownOption: FC<DropdownOptionProps>

declare function withDropdown<P>(Component: ComponentType<P>): FC<P>

export { Dropdown as default, DropdownItem, DropdownOption, withDropdown }
