import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { isString } from '../../common'
import '../../style/components/tooltip/index.scss'
import { TooltipProps } from '../../types/tooltip'

function Tooltip(props: TooltipProps) {
  const {
    children,
    className,
    customStyle,
    // @ts-ignore
    style,
    content,
    isOpened,
    icon,
    iconClassName,
    iconStyle,
    contentClassName,
    contentStyle,
    popoverClassName,
    popoverStyle,
    textClassName,
    textStyle,
  } = props

  const rootClass = classNames('fta-tooltip', className)
  const iconClass = classNames('fta-tooltip-popover__icon', iconClassName)
  const popClass = classNames('fta-tooltip-popover', popoverClassName)
  const textClass = classNames('fta-tooltip-popover__content__text', textClassName)
  const contentClass = classNames('fta-tooltip-popover__content', contentClassName)
  return (
    <View className={rootClass} style={{ ...style, ...customStyle }}>
      {isOpened ? (
        <View
          className={popClass}
          style={popoverStyle}
          // @ts-ignore
          pointerEvents='box-none'>
          <View className={contentClass} style={contentStyle}>
            {isString(content) ? (
              <Text className={textClass} style={textStyle}>
                {content}
              </Text>
            ) : (
              content
            )}
          </View>
          <Image className={iconClass} style={iconStyle} src={icon!} />
        </View>
      ) : null}
      {children}
    </View>
  )
}

const defaultProps: TooltipProps = {
  isOpened: true,
  icon: 'https://imagecdn.ymm56.com/ymmfile/static/resource/006b5964-32f4-47ba-9c5f-6209360421ad.png',
}

Tooltip.defaultProps = defaultProps

export default Tooltip
