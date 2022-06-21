import { FC } from 'react'
import BaseComponent from './base'

export type CouponStatus = 'unused' | 'used' | 'expired' | 'disabled'

export type CouponType = 'simple' | 'rich'

export interface CouponProps extends BaseComponent {
  type?: CouponType
  /**
   * 优惠券金额
   * @default 50
   */
  price?: number
  /**
   * 使用条件，满xx元可用，传入字符串可自定义显示
   * @default 150
   */
  meet?: number | string
  /**
   * 优惠券名称
   */
  title?: string
  /**
   * 优惠券类型
   * @default '通用券'
   */
  remark?: string
  /**
   * 类型颜色
   */
  remarkColor?: string
  /**
   * 类型背景色
   */
  remarkBgColor?: string
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
  /**
   * 背景图片
   */
  src?: string
  /**
   * 展开的使用说明
   */
  // extendDesc?: string

  /**
   * 按钮文本，仅在type='rich' && status='unused'时生效
   * @default '去使用'
   */
  btnText?: string
  /**
   * 是否展示展开图标
   * @default true
   */
  showExpand?: boolean
  /**
   * 点击优惠券的回调
   */
  onClick?: () => any
  /**
   * 按钮或单选框点击回调，status='unused'时生效
   */
  onBtnClick?: () => any
  /**
   * 点击展开（下箭头）的回调
   */
  onExpand?: () => any
}

declare const Coupon: FC<CouponProps>

export default Coupon
