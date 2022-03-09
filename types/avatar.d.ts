import { FC } from 'react'

export type AvatarSize = 'mini' | 'small' | 'normal' | 'large'

export interface AvatarProps {
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
   *
   */
}

declare const Avatar: FC<AvatarProps>

export default Avatar
