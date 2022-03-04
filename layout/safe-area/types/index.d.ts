import { ComponentClass, Consumer, CSSProperties, Provider, ReactNode } from 'react'
import { _safeArea } from '../src/utils'

export interface SafeAreaContext {
  /**
   * 是否禁用安全区
   * @default false
   */
  disabled: boolean

  // children?: ReactNode | ElementType
}

export interface BaseSafeAreaViewProps {
  /**
   * 类名
   */
  className?: string
  /**
   * CSS样式
   */
  style?: CSSProperties
  /**
   * 是否禁用安全区
   * @default false
   */
  disabled?: boolean
  /**
   * 使用margin来适配安全区，默认是padding
   * @default false
   */
  useMargin?: boolean
}

export interface SafeAreaViewProps extends BaseSafeAreaViewProps {}

declare const SafeAreaView: ComponentClass<SafeAreaViewProps>

export interface SafeAreaProps extends BaseSafeAreaViewProps {
  /**
   * 顶部安全区
   * @default false
   */
  top?: boolean

  /**
   * 底部安全区
   * @default true
   */
  bottom?: safeAreaPosition

  /**
   * 子节点
   */
  children?: ReactNode
}

declare const SafeArea: ComponentClass<SafeAreaProps> & {
  Provider: Provider<SafeAreaContext>
  Consumer: Consumer<SafeAreaContext>
  View: typeof SafeAreaView
}

declare const _safeArea: typeof _safeArea

export default SafeArea

export { SafeAreaView }
