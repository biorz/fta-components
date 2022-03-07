import { CommonEvent } from '@tarojs/components/types/common'
import { ComponentClass } from 'react'
import BaseComponent from './base'

export interface NoticeBarProps extends BaseComponent {
  /**
   * 是否需要关闭按钮
   * @default false
   */
  close?: boolean
  /**
   * 内容是否单行
   * @default false
   */
  single?: boolean
  /**
   * 内容是否滚动（内容只能单行）
   * @default false
   */
  marquee?: boolean
  /**
   * 内容滚动速度 （默认速度100px/秒）
   * @default 100
   */
  speed?: number
  /**
   * “查看更多”链接文本
   * @default '查看详情'
   */
  moreText?: string
  /**
   * “查看更多”是否显示（内容只能单行）
   * @default false
   */
  showMore?: boolean
  /**
   * 内容前的 Icon 图标(react native不支持)
   */
  icon?: string
  /**
   * 关闭时触发
   */
  onClose?: (event: CommonEvent) => void
  /**
   * 点击”查看更多“时触发
   */
  onGotoMore?: (event: CommonEvent) => void
}

export interface NoticeBarState {
  show: boolean
  animElemId?: string
  animationData?: {
    actions: object[]
  }
  dura?: number
  isWEAPP?: boolean
  isALIPAY?: boolean
  isWEB?: boolean
}

declare const NoticeBar: ComponentClass<NoticeBarProps>

export default NoticeBar
