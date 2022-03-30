import { CSSProperties, ReactNode } from 'react'

interface BaseComponent {
  className?: string

  customStyle?: CSSProperties
}

interface BaseTextComponent {
  textClassName?: string

  textStyle?: CSSProperties
}

interface BaseIconProps2 extends BaseComponent {
  value: string

  color?: string
}

interface BaseIconProps extends BaseComponent {
  value: string

  color?: string

  prefixClass?: string

  size?: number
}

interface PropsWithChildren {
  children?: ReactNode
}

export {
  BaseComponent,
  BaseTextComponent,
  PropsWithChildren,
  BaseIconProps,
  BaseIconProps2,
  BaseComponent as default,
}
