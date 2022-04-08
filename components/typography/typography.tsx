import { Text as TaroText } from '@tarojs/components'
import React from 'react'
import { px, scale as scaleSize, useCarelessClass, useCareMode } from '../../common'
import '../../style/components/typography/index.scss'
import { TextProps } from '../../types/typography'

// function Typography(props: TypographyProps): JSX.Element {
//   return <View className='fta-typography'>{props.children}</View>
// }

/**
 * 标题
 */
// function Title(): JSX.Element {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   )
// }

/**
 * 超链接
 */
// function Link(): JSX.Element {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   )
// }

/**
 * 正文
 */
function Text(props: TextProps): JSX.Element {
  const { className, style, level, children, size, color, scale, weight, ...extraProps } = props
  const textClz = useCarelessClass(['fta-text', size ? '' : `fta-text--${level}`], [className])
  const careMode = useCareMode()
  const textStyle = { ...style }
  if (color) {
    textStyle.color = color
  }
  if (weight) {
    textStyle.fontWeight = weight
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
