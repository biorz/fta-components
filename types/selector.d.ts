import { ScrollViewProps } from '@tarojs/components/types/ScrollView'
import { ComponentType, CSSProperties, FC, ReactNode } from 'react'
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
  children?: Option[] | null | false
  /**
   * 其他属性
   */
  [key: string]: any
}

export interface OptionWithParent extends Option {
  __parent__: OptionWithParent | null
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

export interface SelectorProps extends BaseComponent, SelectorContext {
  /**
   * 选项列表
   */
  options: Option[]
  /**
   * 指定选中项，多选传数组，单选传基础类型
   */
  value?: string[] | number[] | string | number
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
   * 输入框文本
   * @default '支持按城市、区县名称搜索'
   */
  placeholder?: string
  /**
   * （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示
   * @default false
   */
  // changeOnSelect?: boolean
  /**
   * 滚动容器类名
   */
  containerClassName?: string
  /**
   * 滚动容器内联样式
   */
  containerStyle?: CSSProperties
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

declare const SelectorCore: FC<SelectorProps>

declare function useSelectorCore(
  initialProps: SelectorProps,
  deps?: any[]
): readonly [React.MutableRefObject<undefined>, JSX.Element]

export { SelectorCore, useSelectorCore }
