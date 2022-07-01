import { ComponentProps, ComponentType, FC, Provider, ReactElement } from 'react'
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
}

export interface IntroContext {
  /**
   * 元素是否不可点击
   * @default true
   */
  readonly?: boolean
  /**
   * 显示指引
   */
  show(step?: number): void
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

export interface IntroProps extends BaseComponent, Pick<IntroContext, 'readonly'> {
  /**
   * 需要引导的节点组件
   */
  children: ReactElement
  /**
   * 提示文字/按钮框放置的位置
   * @default 'bottom'
   */
  placement?: 'top' | 'bottom'
}

declare const withIntro: WithIntro

declare const IntroProvider: Provider<{}>

declare const IntroConsumer: Consumer<IntroContext>

declare const useIntroContext: () => IntroContext

declare const Intro: FC<IntroProps> & {
  Provider: typeof IntroProvider
  Consumer: typeof IntroConsumer
  with: typeof withIntro
  useContext: typeof useIntroContext
}

export { Intro as default, withIntro, IntroProvider, IntroConsumer, useIntroContext }
