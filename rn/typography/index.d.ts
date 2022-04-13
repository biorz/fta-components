import { TextProps as TaroTextProps } from '@tarojs/components/types/Text'
import { CSSProperties, FC } from 'react'
import { PropsWithChildren } from './base'

export interface BaseProps extends TaroTextProps, PropsWithChildren {}

export interface TitleProps extends BaseProps {}

export interface LinkProps extends BaseProps {}

export type TextLevel = 1 | 2 | 3 | 4 | 5 | 6

export type TextWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export interface TextProps extends BaseProps {
  /**
   * 内联样式
   */
  style?: CSSProperties
  /**
   * 文字等级，默认32px(设计稿720px)
   * @default 4
   */
  level?: TextLevel
  /**
   * 字体大小（设计稿750px），优先级高于level
   */
  size?: number
  /**
   * 是否根据屏幕比例缩放，设置为false则为绝对尺寸
   * @default true
   */
  scale?: boolean
  /**
   * 字体颜色
   */
  color?: string
  /**
   * 字体字重
   */
  weight?: TextWeight
}

export interface TypographyProps extends BaseProps {}

declare const Text: FC<TextProps>

export { Text }

declare const Typography: FC<TypographyProps>

export default Typography
