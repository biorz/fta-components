import { ComponentProps, ComponentType, FC, Provider } from 'react'

export type Step = any

export interface IntroContext {
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
  register(step: Step): void
  /**
   * 移除步骤
   */
  unregister(step: Step): void
  /**
   * 移除所有步骤
   */
  destroy(): void
}

export type WithIntro = <T extends ComponentType<any>, P extends ComponentProps<T>>(
  ChildComponent: T,
  props: P = any
) => JSX.Element

export interface IntroProps {}

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
