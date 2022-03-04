import { ViewProps as TaroViewProps } from '@tarojs/components/types/View'
import Taro from '@tarojs/taro'
import { ComponentClass } from 'react'
interface LayoutEvent {
  layout: {
    /**
     * Width of the component after the layout changes.
     */
    width: number
    /**
     * Height of the component after the layout changes.
     */
    height: number
    /**
     * Component X coordinate inside the parent component.
     */
    x: number
    /**
     * Component Y coordinate inside the parent component.
     */
    y: number
  }
  /**
   * The node id of the element receiving the PressEvent.
   */
  target?: number | null
}

export interface NativeLayoutEvent {
  nativeEvent: LayoutEvent
}

type TaroLayout = Taro.NodesRef.BoundingClientRectCallbackResult

type Layout = LayoutEvent['layout'] | TaroLayout

export interface BaseViewProps extends TaroViewProps {
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 禁用类名
   */
  disabledClassName?: string

  [key: string]: any
}
export interface ViewProps extends BaseViewProps {
  /**
   * @param layout 元素尺寸信息
   * @default null
   */
  onLayout?: null | ((layout: Layout, raw: NativeLayoutEvent | TaroLayout) => void)
}

export type TouchableWithoutFeedbackProps = ViewProps

export interface TouchableOpacityProps extends BaseViewProps {
  /**
   * 视图区域按下去时候的透明度
   * @default 0.2
   */
  activeOpacity?: number
}

export interface TouchableHighlightProps extends BaseViewProps {
  /**
   * 视图区域按下去时候的透明度
   * @default 0.8
   */
  activeOpacity?: number
  /**
   * 视图区域按下去时候的底色
   * @default #000
   */
  underlayColor?: string
  /**
   * @supported h5, weapp, tt, alipay, baidu, jd
   */
  underlayClass?: string
}

declare const TouchableHighlight: ComponentClass<TouchableHighlightProps>

declare const LayoutView: ComponentClass<ViewProps>

declare const TouchableWithoutFeedback: ComponentClass<TouchableWithoutFeedbackProps>

declare const TouchableOpacity: ComponentClass<TouchableOpacityProps>

export default LayoutView
export { TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight }
