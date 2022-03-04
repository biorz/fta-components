import * as React from 'react'
import classNames from 'classnames'
import RowContext from './RowContext'
import { parseFlex, FlexType } from './utils'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'

// https://github.com/ant-design/ant-design/issues/14324
type ColSpanType = number | string

export interface ColSize {
  flex?: FlexType
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}

export interface ColProps extends ViewProps {
  flex?: FlexType
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
  xs?: ColSpanType | ColSize
  sm?: ColSpanType | ColSize
  md?: ColSpanType | ColSize
  lg?: ColSpanType | ColSize
  xl?: ColSpanType | ColSize
  xxl?: ColSpanType | ColSize
  prefixCls?: string
  style?: React.CSSProperties
}

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { gutter, wrap } = React.useContext(RowContext)
  const { span, order, offset, push, pull, className, children, flex, style, ...others } = props
  const prefixCls = 'fta-col'
  // const prefixCls = 'ant-col'

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    },
    className
  )

  const mergedStyle: React.CSSProperties = {}
  // Horizontal gutter use padding
  if (gutter && gutter[0] > 0) {
    const horizontalGutter = gutter[0] / 2
    mergedStyle.paddingLeft = `${horizontalGutter}px`
    mergedStyle.paddingRight = `${horizontalGutter}px`
  }

  if (flex) {
    mergedStyle.flex = parseFlex(flex)
    // Hack for Firefox to avoid size issue
    // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
    if (flex === 'auto' && wrap === false && !mergedStyle.minWidth) {
      mergedStyle.minWidth = '0px'
    }
  }

  const viewStyle = { ...mergedStyle, ...style }

  return (
    <View {...others} style={viewStyle} className={classes} ref={ref}>
      {children}
    </View>
  )
})

Col.displayName = 'Col'

export default Col
