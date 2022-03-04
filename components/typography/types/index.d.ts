import { Text as TaroText } from '@tarojs/components'
import { ComponentProps, FC, ReactNode } from 'react'

export interface BaseProps extends ComponentProps<typeof TaroText> {
  children: ReactNode
}

export interface TitleProps extends BaseProps {}

export interface LinkProps extends BaseProps {}

export type TextLevel = 1 | 2 | 3 | 4 | 5 | 6
export interface TextProps extends BaseProps {
  /**
   * 文字等级
   * @default
   */
  level?: TextLevel
}

export interface TypographyProps extends BaseProps {
  children: ReactNode
}

declare const Text: FC<TextProps>

export { Text }

declare const Typography: FC<TypographyProps>

export default Typography
