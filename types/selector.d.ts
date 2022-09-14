import { ScrollViewProps } from '@tarojs/components/types/ScrollView'
import {
  ComponentType,
  CSSProperties,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react'
import BaseComponent from './base'

export interface IndexLeaf {
  [key: number]: null | undefined | {} | IndexLeaf
}

export interface FieldNames {
  label: string
  value: string
  children: string
  [key: string]: string
}

export interface TagProps extends BaseComponent {
  /**
   * tag文本
   */
  children: string
  /**
   * 文字和边框颜色
   */
  color?: string
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 自定义关闭图标
   */
  closeIcon?: string
  /**
   * 文字样式
   */
  textClassName?: string
  /**
   * 文字样式
   */
  textStyle?: CSSProperties
  /**
   * 点击关闭按钮的回调
   */
  onClose?(): void
  /**
   * 点击标签时的回调
   */
  onClick?(): void
}

export interface SearchProps {
  value?: string
  placeholder?: string
  onChange(value: string): void
  [key: string]: any
}

export interface ScrollAreaProps {
  className?: string
  style?: CSSProperties
  /**
   * 当前激活的索引
   * @default 0
   */
  activeIndex?: number
  /**
   * 多选时选中的索引数组
   */
  seletedIndexes?: number[]
  /**
   * 数据列表
   */
  options: Option[] | null | undefined
  /**
   * 每个item的绝对高度
   * @default 46
   */
  itemHeight?: number
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
   * 允许全选
   */
  enableCheckAll?: boolean
  /**
   * 主题色，默认为满帮橙
   * @default '#FA871E'
   */
  theme?: CSSProperties['color']
  /**
   * 子项选择的数目
   */
  counts?: { [key: number]: number | undefined | null }
  /**
   * (多选时生效)是否显示子级已选择数量
   * @default true
   */
  showCount?: boolean
  /**
   * 是否自适应item高度，设置后没有自动对齐效果
   */
  autoHeight?: boolean
  /**
   * 自定义选择的后缀图标, 传入字符串默认为图片URL
   */
  suffixIcon?: string | false
  /**
   * 自定义选中的后缀图标，传入字符串默认为图片URL
   */
  activeSuffixIcon?: string | false
  /**
   * 自定义options中的label value children 字段
   * @default {label: 'label', value: 'value', children: 'children', [key: string]: any}
   */
  fieldNames?: FieldNames
  /**
   *
   */
  itemClassName?: string
  /**
   *
   */
  itemStyle?: CSSProperties
  /**
   *
   */
  activeItemClassName?: string
  /**
   *
   */
  activeItemStyle?: CSSProperties
  /**
   * 自定义渲染
   */
  component?: ComponentType<{
    option: Option
    active: boolean
  }>
  /**
   * 选择项发生变化
   */
  onChange?: (index: number, cursor: number, cancel: boolean) => void

  /**
   * @internal
   */
  _index?: number
  /**
   * @internal
   */
  _end?: boolean
  /**
   * @internal
   */
  _parent?: Option
}

export type Option = {
  /**
   * 默认绑定的值
   * 多选传数组
   */
  value?: (string | number) | (string | number)[]
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
  children?: Option[] | null | false
  /**
   * 其他属性
   */
  [key: string]: any
}

export interface OptionWithParent extends Option {
  __parent__: OptionWithParent | null
  __index__: number
}

export interface SelectorContext
  extends Pick<
    ScrollAreaProps,
    | 'itemHeight'
    | 'fieldNames'
    | 'multiple'
    | 'limit'
    | 'suffixIcon'
    | 'activeSuffixIcon'
    | 'activeItemClassName'
    | 'itemClassName'
    | 'itemStyle'
    | 'activeItemStyle'
    | 'showCount'
    | 'autoHeight'
    | 'theme'
  > {
  /**
   * 传递给各列ScrollView组件的props
   */
  scrollViewProps?: ScrollViewProps & {
    /**
     * 是否显示滚动条
     * @supported rn
     */
    showsVerticalScrollIndicator?: boolean
    [key: string]: any
  }
}

export type HitFn = (keyword: string, label: string, option: Option) => boolean

export interface SelectorProps extends BaseComponent, SelectorContext {
  /**
   * 选项列表
   */
  options: Option[]
  /**
   * 默认选中项，多选传数组，单选传基础类型
   */
  defaultValue?: string[] | number[] | string | number
  /**
   * 选择器深度
   * @default 3
   */
  depth?: number
  /**
   * 自定义渲染Item
   */
  // items: Array<ComponentType<{itemHeight: numb}>>,
  /**
   * 是否显示搜索框
   * @default false
   */
  showSearch?: boolean
  /**
   * 是否严格匹配搜索字符串，传入回调可自定义搜索命中
   * @default false
   */
  strictSearch?: boolean | HitFn
  /**
   * 是否显示选择结果
   * @default false
   */
  showResult?: boolean
  /**
   * 输入框文本
   * @default '支持按城市、区县名称搜索'
   */
  placeholder?: string
  /**
   * 搜索无结果的文本
   * @default '暂无搜索结果'
   */
  emptyHint?: string
  /**
   * 最多可选择几项的提示
   */
  limitHint?: string
  /**
   * （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示
   * @default false
   */
  // changeOnSelect?: boolean
  /**
   * 是否允许全选
   * 数组长度是深度 - 1
   */
  enableCheckAll?: boolean[]
  /**
   * 滚动容器类名
   */
  containerClassName?: string
  /**
   * 滚动容器内联样式
   */
  containerStyle?: CSSProperties
  /**
   * 标签颜色
   */
  tagColor?: string
  /**
   * 标签背景颜色
   */
  tagBgColor?: string
  /**
   * 滚动列类名
   */
  columnClassName?: (depth: number) => string | undefined
  /**
   * 滚动列内联样式
   */
  columnStyle?: (depth: number) => CSSProperties | undefined
  /**
   * 选择改变后的回调
   */
  onChange?: (
    selectedOptions: (Option[] | Option)[],
    lastSelectedOptions: OptionWithParent[] | OptionWithParent
  ) => void
  /**
   * （多选生效）选择项溢出时的回调
   */
  onExceed?: () => void

  [key: string]: any
}

export interface SelectorCoreRefMethods {
  /** 重置选择项 */
  reset: () => void
  /** 取消选中 */
  uncheck: ((indexes: number[]) => void) | ((option: OptionWithParent) => void)
}

declare const SelectorCore: ForwardRefExoticComponent<SelectorProps> &
  RefAttributes<SelectorCoreRefMethods>

declare function useSelectorCore(
  initialProps: SelectorProps,
  deps?: any[]
): readonly [React.MutableRefObject<undefined>, JSX.Element]

export { SelectorCore, useSelectorCore }
