import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import '../../style/components/selector/index.scss'
import { TagProps } from '../../types/selector'

export default /**
 * @component
 * 选择展示Tag
 */
function Tag(props: TagProps) {
  const {
    className,
    // @ts-ignore
    style,
    customStyle,
    textClassName,
    textStyle,
    children,
    color,
    bgColor,
    onClick,
    onClose,
    closeIcon,
  } = props
  const rootClass = classNames('fta-selector-tag', className)
  const rootStyle = { ...style, ...customStyle } as CSSProperties
  const textClass = classNames('fta-selector-tag__text', textClassName)
  const literalStyle = {
    ...textStyle,
  }

  if (color) {
    literalStyle.color = color
    rootStyle.borderColor = color
  }
  if (bgColor) {
    rootStyle.backgroundColor = bgColor
  }
  return (
    <View className={rootClass} style={rootStyle} onClick={onClick}>
      <Text className={textClass} style={literalStyle}>
        {children}
      </Text>
      {closeIcon ? (
        <Image src={closeIcon} onClick={onClose} className='fta-selector-tag-close' />
      ) : (
        <Text
          className='fta-selector-tag__close'
          style={color ? { color } : void 0}
          onClick={onClose}>
          ×
        </Text>
      )}
    </View>
  )
}
