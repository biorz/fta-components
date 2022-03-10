import { ViewProps } from '@tarojs/components/types/View'
import { FC } from 'react'
import BaseComponent, { BaseTextComponent, PropsWithChildren } from './base'

export type TagType = 'primary' | 'success' | 'warning' | 'info' | 'error'

export interface TagProps
  extends BaseComponent,
    BaseTextComponent,
    PropsWithChildren,
    Pick<ViewProps, 'onClick'> {
  /**
   * 标签类型
   */
  type?: TagType
  /**
   * 文字颜色
   */
  color?: string
  /**
   * 背景色
   */
  bgColor?: string
  /**
   * 边框色
   */
  borderColor?: string
  /**
   * 是否显示边框
   * @default true
   */
  border?: boolean
}
declare const Tag: FC<TagProps>

export default Tag
