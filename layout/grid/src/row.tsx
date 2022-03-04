import * as React from 'react'
import classNames from 'classnames'
import RowContext from './RowContext'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import { tuple } from './utils'

const RowAligns = tuple('top', 'middle', 'bottom', 'stretch')
const RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between')

export type Gutter = number
export interface RowProps extends ViewProps {
  gutter?: Gutter | [Gutter, Gutter]
  align?: typeof RowAligns[number]
  justify?: typeof RowJustify[number]
  wrap?: boolean
  style?: React.CSSProperties
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { justify, align, className, style = {}, children, gutter = 0, wrap, ...others } = props
  const prefixCls = 'fta-row'
  // const prefixCls = 'ant-row'

  // ================================== Render ==================================
  const getGutter = (): [number, number] => {
    const results: [number, number] = [0, 0]
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0]
    normalizedGutter.forEach((g, index) => {
      results[index] = g || 0
    })
    return results
  }

  const gutters = getGutter()

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${justify}`]: justify,
      [`${prefixCls}-${align}`]: align,
    },
    className
  )

  // Add gutter related style
  const rowStyle: React.CSSProperties = {}
  const horizontalGutter = gutters[0] > 0 ? gutters[0] / -2 : undefined

  if (horizontalGutter) {
    rowStyle.marginLeft = `${horizontalGutter}px`
    rowStyle.marginRight = `${horizontalGutter}px`
  }

  // Set gap direct if flex gap support
  ;[, rowStyle.rowGap] = gutters.map((gutter) => `${gutter}px`)

  const rowContext = React.useMemo(() => ({ gutter: gutters, wrap }), [gutters, wrap])

  const viewStyle = { ...rowStyle, ...style }

  return (
    <RowContext.Provider value={rowContext}>
      <View
        {...others}
        className={classes}
        style={viewStyle}
        // style={{ margin: 10 }}
        ref={ref}>
        {children}
      </View>
    </RowContext.Provider>
  )
})

Row.displayName = 'Row'

export default Row
