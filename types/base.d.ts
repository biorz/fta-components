import { CSSProperties } from 'react'

interface BaseComponent {
  className?: string

  customStyle?: CSSProperties
}

interface BaseIconProps2 extends BaseComponent {
  value: string

  color?: string
}

interface BaseIconProps extends BaseComponent {
  value: string

  color?: string

  prefixClass?: string

  size?: number | string
}

export { BaseComponent, BaseComponent as default, BaseIconProps, BaseIconProps2 }
