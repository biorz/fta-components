import { ConfigConsumer, useClassWithCare } from '@fta/common'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Component, CSSProperties } from 'react'
import { DividerProps, TextPosition } from '../types'
import './style/index.scss'

class Divider extends Component<DividerProps> {
  public static defaultProps: DividerProps

  public handleLineStyle(
    left: boolean,
    dashed: boolean,
    hairline: boolean,
    textPosition: TextPosition,
    careMode: boolean
  ) {
    const offsetClass =
      textPosition === 'center'
        ? null
        : textPosition === 'left'
        ? left
          ? 'fta-divider-line--offset'
          : null
        : left
        ? null
        : 'fta-divider-line--offset'
    return classNames(
      useClassWithCare(careMode, ['fta-divider-line', hairline || 'fta-divider-line--bold']),
      offsetClass,
      dashed && 'fta-divider-line--dashed'
    )
  }
  public render(): JSX.Element {
    const { dot, dashed, textPosition, text, hairline, lineColor, textStyle, textClassName } =
      this.props

    const lineStyle: CSSProperties = lineColor ? { borderBottomColor: lineColor } : {}
    return (
      <ConfigConsumer>
        {({ careMode }) => {
          return (
            <View className='fta-divider'>
              <View
                className={this.handleLineStyle(true, dashed, hairline, textPosition, careMode)}
                style={lineStyle}
              />
              <View
                className={classNames(
                  'fta-divider-text',
                  dot && `${useClassWithCare(careMode, ['fta-divider-dot'])} ${textClassName}`
                )}>
                {dot ? null : (
                  <Text
                    className={classNames(
                      useClassWithCare(careMode, ['fta-divider-text__label']),
                      textClassName
                    )}
                    style={textStyle}>
                    {text}
                  </Text>
                )}
              </View>
              <View
                className={this.handleLineStyle(false, dashed, hairline, textPosition, careMode)}
                style={lineStyle}
              />
            </View>
          )
        }}
      </ConfigConsumer>
    )
  }
}

Divider.defaultProps = {
  dashed: false,
  hairline: true,
  dot: false,
  text: null,
  textPosition: 'center',
}

export default Divider
