import { FC } from 'react'
import BaseComponent from './base'

export type AvatarSize = 'mini' | 'small' | 'normal' | 'large'

export interface AvatarProps extends BaseComponent {
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
   * 头像图片地址
   */
  image?: string
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
