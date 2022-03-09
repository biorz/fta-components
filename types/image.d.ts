import { ImageProps as TaroImageProps } from '@tarojs/components/types/Image'
import { ComponentClass, CSSProperties, ReactNode } from 'react'

export type ImageShape = 'square' | 'circle'

export interface ImageProps extends Omit<TaroImageProps, 'style'> {
  /**
   * 图片形状，circle-圆形，square-方形
   * @default 'square'
   */
  shape?: ImageShape
  /**
   * 加载失败时候显示的图片
   */
  errorIcon?: ReactNode
  /**
   * 是否显示加载错误的图片
   * @default true
   */
  showError?: boolean
  /**
   * 加载中的图片
   */
  loadingIcon?: ReactNode
  /**
   * 是否显示加载中的图片
   * @default true
   */
  showLoading?: boolean
  /**
   * 背景颜色
   * @default '#f3f4f6'
   */
  bgColor?: string

  /**
   * 内联样式
   */
  customStyle?: CSSProperties
}

export interface ImageState {
  /**
   * 是否加载失败
   * @default false
   */
  _errored: boolean
  /**
   * 是否已经加载完毕
   * @default false
   */
  _loaded: boolean
}

declare const Image: ComponentClass<ImageProps>

export default Image
