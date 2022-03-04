import { useCarelessClass } from '@fta/common'
import { Text, View } from '@tarojs/components'
import React from 'react'
import { TextProps, TypographyProps } from '../types'
import './style/index.scss'

function Typography(props: TypographyProps): JSX.Element {
  return <View className='fta-typography'>{props.children}</View>
}

/**
 * 标题
 */
function Title(): JSX.Element {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

/**
 * 超链接
 */
function Link(): JSX.Element {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

/**
 * 正文
 */
function MainText(props: TextProps): JSX.Element {
  const { className, style, level, children, ...extraProps } = props
  const textClz = useCarelessClass([`fta-text--${level}`], [className])
  return (
    <Text className={textClz} style={style} {...extraProps}>
      {children}
    </Text>
  )
}

const textDefaultProps: TextProps = {
  level: 4,
  children: '',
}

MainText.defaultProps = textDefaultProps

export { Title, Link, MainText as Text }

export default Typography
