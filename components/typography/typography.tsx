import { Text as TaroText } from '@tarojs/components'
import React from 'react'
import { px, scale as scaleSize, useCarelessClass, useCareMode } from '../../common'
import '../../style/components/typography/index.scss'
import { TextProps } from '../../types/typography'

/**
 * 正文
 */
function Text(props: TextProps): JSX.Element {
  const {
    className,
    style,
    level,
    children,
    size,
    color,
    scale,
    weight,
    line,
    underline,
    type,
    strong,
    italic,
    ...extraProps
  } = props
  const textClz = useCarelessClass(
    ['fta-text', size ? '' : `fta-text--${level}`],
    [type && `fta-text--${type}`, className]
  )
  const careMode = useCareMode()
  const textStyle = { ...style }
  if (color) {
    textStyle.color = color
  }
  if (strong) {
    textStyle.fontWeight = '500'
  }
  if (weight) {
    textStyle.fontWeight = weight + ''
  }
  if (italic) {
    textStyle.fontStyle = 'italic'
  }
  if (line || underline) {
    textStyle.textDecorationLine = line ? 'line-through' : 'underline'
  }

  if (size) {
    const fontSize: string | number = careMode ? size * 1.3 : size
    textStyle.fontSize = scale ? scaleSize(fontSize) : px(fontSize)
  }
  return (
    <TaroText className={textClz} style={textStyle} {...extraProps}>
      {children}
    </TaroText>
  )
}

const textDefaultProps: TextProps = {
  level: 4,
  scale: true,
}

Text.defaultProps = textDefaultProps

export { Text }
