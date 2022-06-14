import { FC } from 'react'

export type CouponStatus = 'new' | 'unchecked' | 'used' | 'expired' | 'disabled'

export interface CouponProps {
  /**
   * 优惠券金额
   * @default 50
   */
  price?: number
  /**
   * 使用条件，满xx元可用
   * @default 150
   */
  meet?: number
  /**
   * 优惠券名称
   */
  title?: string
  /**
   * 优惠券类型
   * @default '通用'
   */
  type?: string
  /**
   * 类型颜色
   */
  typeColor?: string
  /**
   * 类型背景色
   */
  typeBgColor?: string
  /**
   * 有效期
   */
  period?: string
  /**
   * 优惠券状态
   */
  status?: CouponStatus
  /**
   * 使用说明
   */
  desc?: string
}

declare const Coupon: FC<CouponProps>

export default Coupon
