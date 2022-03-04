import { px } from '@fta/common'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Component, CSSProperties } from 'react'
import { GapProps } from '../types'
import './style/index.scss'

const mergeNonNullable = (record: object, attrs: Array<[keyof CSSProperties, unknown]>) =>
  attrs.forEach(([key, value]) => {
    if (value != null) record[key] = value
  })

class Gap extends Component<GapProps> {
  public render(): JSX.Element {
    const {
      style,
      className,
      bgColor,
      top,
      bottom,
      left,
      right,
      width,
      height,
      children,
      ...props
    } = this.props
    const rootClass = classNames('fta-gap', className)
    const rootStyle = { ...style }
    mergeNonNullable(rootStyle, [
      ['backgroundColor', bgColor],
      ['marginBottom', px(bottom)],
      ['marginTop', px(top)],
      ['marginLeft', px(left)],
      ['marginRight', px(right)],
      ['height', px(height)],
      ['width', px(width)],
    ])

    return (
      <View style={rootStyle} className={rootClass} {...props}>
        {children}
      </View>
    )
  }
}

export default Gap
