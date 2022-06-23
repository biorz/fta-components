import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import { isObject } from '../../common'
import '../../style/components/line/index.scss'
import { LineProps } from '../../types/line'

const upperCase = (s: string) => s[0].toUpperCase() + s.slice(1)

function Line(props: LineProps) {
  const {
    className,
    customStyle,
    color,
    col,
    // @ts-ignore
    style,
    length,
    margin,
    hairline,
    dashed,
  } = props
  const rootClass = classNames(
    'fta-line',
    col ? 'fta-line--col' : 'fta-line--row',
    {
      'fta-line--hairline': hairline,

      'fta-line--dashed': dashed,
    },
    className
  )
  const rootStyle: CSSProperties = {
    ...style,
    ...customStyle,
  }

  if (length) {
    rootStyle[col ? 'height' : 'width'] = length
  }

  if (color) {
    rootStyle[col ? 'borderRightColor' : 'borderBottomColor'] = color
  }

  if (margin) {
    if (isObject(margin)) {
      Object.entries(margin).forEach(([key, val]) => {
        rootStyle[`margin${upperCase(key)}`] = val
      })
    }
  }

  return <View className={rootClass} style={rootStyle} />
}

const defaultProps: LineProps = {
  col: false,
  hairline: false,
  dashed: false,
}

Line.defaultProps = defaultProps

export default Line
