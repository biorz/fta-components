import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Component, CSSProperties, Fragment } from 'react'
import { inAlipay, px, upperCase } from '../../common'
import '../../style/components/safe-area/index.scss'
import { SafeAreaProps, SafeAreaViewProps } from '../../types/safe-area'
import Context, { useSafeArea } from './context'
import { _safeArea } from './utils'

export { SafeAreaView, useSafeArea, _safeArea }

/**
 * safe area container
 * @component
 */
class SafeAreaView extends Component<SafeAreaViewProps> {
  public static defaultProps: SafeAreaViewProps

  public getInlineStyle(style: CSSProperties): CSSProperties {
    const attr = this.props.useMargin ? 'margin' : 'padding'
    const safeAreaStyle = {}

    if (_safeArea.top) safeAreaStyle[`${attr}Top`] = px(_safeArea.top)
    if (_safeArea.right) safeAreaStyle[`${attr}Right`] = px(_safeArea.right)
    if (_safeArea.left) safeAreaStyle[`${attr}Left`] = px(_safeArea.left)
    if (_safeArea.bottom) safeAreaStyle[`${attr}Bottom`] = px(_safeArea.bottom)

    return {
      ...safeAreaStyle,
      ...style,
    }
  }

  public render(): JSX.Element {
    if (inAlipay) return <Fragment>{this.props.children}</Fragment>
    return (
      <Context.Consumer>
        {(ctx) => {
          if (this.props.disabled || ctx.disabled) {
            const { disabled, ...props } = this.props
            return <View {...props}></View>
          }
          const { className, style, children, useMargin, ...props } = this.props
          const rootCla = classNames(
            className,
            `fta-safe-area-container${useMargin ? '__margin' : ''}`
          )
          const rootStyle = this.getInlineStyle(style!)
          return (
            <View {...props} className={rootCla} style={rootStyle}>
              {children}
            </View>
          )
        }}
      </Context.Consumer>
    )
  }
}

SafeAreaView.defaultProps = {
  style: {},
  disabled: false,
}

/**
 * 顶部或底部安全区
 * @component
 */
class SafeArea extends Component<SafeAreaProps> {
  public static defaultProps: SafeAreaProps
  public static Provider: typeof Context.Provider
  public static Consumer: typeof Context.Consumer
  public static View: typeof SafeAreaView

  public getInlineStyle(position: keyof SafeAreaProps, style: CSSProperties): CSSProperties {
    const attr = this.props.useMargin ? 'margin' : 'padding'
    return {
      [`${attr}${upperCase(position)}`]: px(_safeArea[position]),
      ...style,
    }
  }

  public renderSafeArea(position: keyof SafeAreaProps, props: Partial<SafeAreaProps>): JSX.Element {
    const { style, className, children, useMargin, ...extraProps } = props
    const rootStyle = this.getInlineStyle(position, props.style!)
    const rootCla = classNames(
      props.className,
      `fta-safe-area-${position}${useMargin ? '__margin' : ''}`
    )
    return (
      <View {...extraProps} style={rootStyle} className={rootCla}>
        {children}
      </View>
    )
  }

  public render(): JSX.Element | null {
    if (inAlipay) return null
    return (
      <Context.Consumer>
        {(ctx) => {
          if (this.props.disabled || ctx.disabled) {
            const { disabled, ...props } = this.props
            return <View {...props}></View>
          }
          const { top, bottom, ...props } = this.props
          const position = !top && bottom ? 'bottom' : 'top'
          return this.renderSafeArea(position, props)
        }}
      </Context.Consumer>
    )
  }
}

SafeArea.defaultProps = {
  bottom: true,
  top: false,
  style: {},
  disabled: false,
}

SafeArea.Consumer = Context.Consumer
SafeArea.Provider = Context.Provider
SafeArea.View = SafeAreaView

export default SafeArea
