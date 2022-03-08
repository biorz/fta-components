import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { useCareClass, useCarelessClass } from '../../common'
import '../../style/components/badge/index.scss'
import { BadgeProps, BadgeShape, BadgeType, NumberType } from '../../types/badge'

const shapes: BadgeShape[] = ['circle', 'horn', 'square']
const types: BadgeType[] = ['primary', 'info', 'success', 'warning', 'error']
const numberTypes: NumberType[] = ['ellipsis', 'limit', 'overflow']
// 给定的prop是否在prop列表中，如果是，返回类名，否则返回null
const hit = <T extends string | number>(prop: T, propList: T[], prefix: string) =>
  propList.includes(prop) ? `${prefix}${prop}` : null
/** 处理显示值 */
const handleValue = (value: string | number, max: number, numberType: NumberType) => {
  let val: string | number = value
  const num = +val
  if (!Number.isNaN(num) && num > max) {
    switch (numberType) {
      case 'overflow':
        val = `${max}+`
        break
      case 'ellipsis':
        val = `${max}...`
        break
      case 'limit':
        if (num >= 1000) {
          let base: number, suffix: string
          if (num < 10000) {
            base = 1000
            suffix = 'k'
          } else {
            base = 10000
            suffix = 'w'
          }
          let d: string | number = num / base
          if (/.\d{3,}/.test(d + '')) {
            d = d.toFixed(2)
          }
          val = d + suffix
        }
        break
    }
  }
  return val
}

function Badge(props: BadgeProps): JSX.Element {
  /** 处理真实显示的值 */
  const {
    className,
    textClassName,
    textStyle,
    value,
    type,
    numberType,
    shape,
    isDot,
    show,
    showZero,
    absolute,
    offset,
    style,
    max,
    color,
    bgColor,
    ...extraProps
  } = props
  // 隐藏直接返回null即可
  if (!show || (value === 0 && !showZero && !isDot)) return null
  const careClz = useCareClass([
    'fta-badge',
    hit<BadgeShape>(shape, shapes, 'fta-badge--'),
    isDot && 'fta-badge--dot',
  ])

  const rootClass = classNames(
    careClz,
    // 'fta-badge',
    // hit<BadgeType>(type, types, 'fta-badge--'),
    // hit<BadgeShape>(shape, shapes, 'fta-badge--'),
    hit<BadgeType>(type, types, 'fta-badge--'),
    absolute && 'fta-badge--absolute',
    className
  )
  const textClz = useCarelessClass(['fta-badge-text'], [textClassName])
  const rootStyle =
    absolute && offset
      ? {
          ...style,
          top: offset[0],
          right: offset[1],
        }
      : { ...style }
  if (bgColor) {
    rootStyle.backgroundColor = bgColor
  }

  const textStyles = {
    ...textStyle,
  }
  if (color) textStyles.color = color

  return (
    <View className={rootClass} style={rootStyle} {...extraProps}>
      {isDot ? null : (
        <Text className={textClz} style={textStyles}>
          {handleValue(value, max, numberType)}
        </Text>
      )}
    </View>
  )
}

const defaultProps: BadgeProps = {
  isDot: false,
  offset: null,
  show: true,
  type: 'error',
  shape: 'circle',
  showZero: false,
  max: 99,
  numberType: 'overflow',
  color: null,
  bgColor: null,
}
const propTypes: InferProps<BadgeProps> = {
  type: PropTypes.oneOf(types),
  numberType: PropTypes.oneOf(numberTypes),
  shape: PropTypes.oneOf(shapes),
  offset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
}

Badge.defaultProps = defaultProps

Badge.propTypes = propTypes

export default Badge
