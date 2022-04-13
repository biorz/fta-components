import { CSSProperties, FC } from 'react'
import BaseComponent from './base'
import { ImageProps } from './image'

export type AvatarSize = 'mini' | 'small' | 'medium' | 'large'

export interface AvatarProps extends BaseComponent, Omit<ImageProps, 'src'> {
  /**
   * 头像是否圆形
   * mini - 48px
   * small - 56px
   * normal - 72px
   * large - 96px
   * @default 'normal'
   */
  size?: AvatarSize
  /**
   * 头像是否圆形
   * @default false
   */
  circle?: boolean
  /**
   * 以文字形式展示头像
   */
  text?: string
  /**
   * 文本类名
   */
  textClassName?: string
  /**
   * 文本内联样式
   */
  textStyle?: CSSProperties
  /**
   * 头像图片地址
   */
  src?: string
  /**
   * 参考微信[开放数据](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)
   *
   * **注意：** openData 仅支持 type 为 userAvatarUrl
   * @supported weapp
   */
  openData?: { type: 'userAvatarUrl' }
}

declare const Avatar: FC<AvatarProps>

export default Avatar
