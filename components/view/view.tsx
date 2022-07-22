import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { cloneElement, Component, ReactElement } from 'react'
import { createSelectorQuery, inRN } from '../../common'
import '../../style/components/view/index.scss'
import {
  BaseViewProps,
  NativeLayoutEvent,
  TouchableHighlightProps,
  TouchableOpacityProps,
  ViewProps,
} from '../../types/view'
import { colorList, colorMap, opacityList } from './shared'

let count = 0
class LayoutView extends Component<ViewProps> {
  private _id: number

  constructor(props: ViewProps) {
    super(props)
    this._id = ++count
    this._onLayout = this._onLayout.bind(this)
  }

  private _onLayout(evt: NativeLayoutEvent) {
    this.props.onLayout?.(evt.nativeEvent.layout, evt)
  }

  public static defaultProps: ViewProps

  public componentDidMount() {
    this.props.onLayout &&
      !inRN &&
      createSelectorQuery?.(`._fta-view-layout__${this._id}`, (result) => {
        this.props.onLayout!(result, result)
      })
  }

  public render(): JSX.Element {
    if (this.props.disabled) return renderDisabledView(this.props)
    const { onLayout, className, children, style, ...props } = this.props
    const rootClass = classNames(`_fta-view-layout__${this._id}`, className)
    return (
      // @ts-ignore onLayout没有类型声明
      <View onLayout={onLayout && this._onLayout} className={rootClass} style={style} {...props}>
        {/*  className和style同时存在，动态props不能被合并 */}
        {children}
      </View>
    )
  }
}

LayoutView.defaultProps = {
  onLayout: null,
  disabled: false,
}

export default LayoutView

export { LayoutView as View }
/**
 * TouchableWithoutFeedback
 * @component
 */
export { View as TouchableWithoutFeedback }

/**
 * TouchableOpacity
 * @component
 */
export class TouchableOpacity extends Component<TouchableOpacityProps> {
  public static defaultProps: TouchableOpacityProps
  public static propTypes: InferProps<TouchableOpacityProps>

  public render() {
    if (this.props.disabled) return renderDisabledView(this.props)
    const { children, activeOpacity, ...props } = this.props
    // console.log(activeOpacity, 'activeOpacity', props)
    return (
      <View
        {...props}
        hoverStyle={{ opacity: activeOpacity }}
        hoverClass={`fta-view-hover__${activeOpacity! * 10}`}>
        {children}
      </View>
    )
  }
}

TouchableOpacity.defaultProps = {
  activeOpacity: 0.8,
}

TouchableOpacity.propTypes = {
  activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
}

/**
 * TouchableHighlight
 * @component
 */
export class TouchableHighlight extends Component<TouchableHighlightProps> {
  public static defaultProps: TouchableHighlightProps
  public static propTypes: InferProps<TouchableHighlightProps>

  public render() {
    if (this.props.disabled) return renderDisabledView(this.props)
    let { activeOpacity, underlayColor, children, underlayClass, ...props } = this.props
    let hoverClass: string
    if (underlayClass) hoverClass = underlayClass
    else if (!inRN) {
      if (!~colorList.indexOf(underlayColor!)) {
        underlayColor = '#000'
      } else {
        hoverClass = `fta-view-hover__${colorMap[underlayColor!]}`
      }
    }
    // 给子组件加额外的props
    const clonedChildren = cloneElement(children as ReactElement, {
      hoverClass: `fta-view-hover__${activeOpacity! * 10}`,
      hoverStyle: { opacity: activeOpacity },
    })
    // console.log(clonedChildren, 'clonedChildren')
    return (
      <View hoverStyle={{ backgroundColor: underlayColor }} hoverClass={hoverClass!} {...props}>
        {clonedChildren}
      </View>
    )
  }
}

TouchableHighlight.defaultProps = {
  underlayColor: '#000',
  activeOpacity: 0.2,
}

TouchableHighlight.propTypes = {
  underlayColor: inRN ? PropTypes.any : PropTypes.oneOf(colorList),
  activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
}

/**
 * 禁用的View样式
 */
function renderDisabledView(props: BaseViewProps): JSX.Element {
  const {
    // 忽略active属性
    hoverClass,
    hoverStyle,
    // 禁用click事件
    onClick,
    disabled,
    disabledClassName,
    children,
    className,
    style,
    ..._props
  } = props
  const rootClass = classNames(className, 'fta-view-disabled', disabledClassName)
  return (
    <View {..._props} style={style} className={rootClass}>
      {children}
    </View>
  )
}
