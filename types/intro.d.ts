import { ComponentProps, ComponentType, CSSProperties, FC, Provider, ReactElement } from 'react'
import BaseComponent from './base'

export type Step = any

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface MetaData extends Pick<IntroContext, 'readonly'> {
  el: ReactElement
  rect: Rect
  tooltip: TooltipProps
  /** 优先级 */
  priority: number
  /** id */
  prop?: string
}

export interface IntroContext {
  /**
   * 元素是否不可点击
   * @default true
   */
  readonly?: boolean
  /**
   * 收集定位的延迟，单位秒
   * @default 0
   */
  delay?: number
  /**
   * 显示指引
   * @param curosr 不传从0开始
   */
  show(curosr?: number): void
  /**
   * 显示指引
   * @param prop 不传从0开始
   */
  show(prop?: string): void
  /**
   * 隐藏指引
   */
  hide(): void
  /**
   * 切换到下一步
   */
  next(): void
  /**
   * 切换到上一步
   */
  prev(): void
  /**
   * 注册步骤
   */
  register(data: MetaData): void
  /**
   * 移除步骤
   */
  unregister(step: Step): void
  /**
   * 移除所有步骤
   */
  destroy(): void
  /**
   * 是否禁用提示
   * @default false
   */
  disabled(): boolean
  /**
   * 禁用提示
   */
  disable(): void
  /**
   * 启用提示
   */
  enable(): void
}

export type WithIntro = <T extends ComponentType<any>, P extends ComponentProps<T>>(
  ChildComponent: T,
  props: P = any
) => () => JSX.Element

export interface TooltipProps {
  /**
   * 类名
   */
  tooltipClassName?: string
  /**
   * 样式
   */
  tooltipStyle?: CSSProperties
  /**
   * 提示标题
   */
  title?: string
  /**
   * 提示内容，不传则不展示
   */
  desc?: string
  /**
   * 提示按钮文本，不传则不展示
   */
  text?: string
  /**
   * 提示文字/按钮框放置的位置
   * @default 'bottom'
   */
  placement?: 'top' | 'bottom'
  /**
   * icon三角形偏移百分比
   * @default '30%'
   */
  offset?: string
  /**
   * 点击按钮的回调，默认跳到下一步
   */
  onClick?(): void
}

export interface IntroProps
  extends BaseComponent,
    Pick<IntroContext, 'readonly' | 'delay'>,
    TooltipProps,
    Pick<MetaData, 'prop'> {
  /**
   * 需要引导的节点组件
   */
  children: ReactElement
}

declare const withIntro: WithIntro

declare const IntroProvider: Provider<{}>

declare const IntroConsumer: Consumer<IntroContext>

declare const useIntroContext: () => IntroContext

declare const Tooltip: FC<TooltipProps>

declare const Intro: FC<IntroProps> & {
  Provider: typeof IntroProvider
  Consumer: typeof IntroConsumer
  with: typeof withIntro
  useContext: typeof useIntroContext
  Tooltip: typeof Tooltip
}

export { Intro as default, withIntro, IntroProvider, IntroConsumer, useIntroContext }
