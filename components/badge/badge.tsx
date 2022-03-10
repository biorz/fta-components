import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Fragment } from 'react'
import { useCareClass, useCarelessClass } from '../../common'
import '../../style/components/badge/index.scss'
import { BadgeProps, BadgeShape, BadgeType, NumberType } from '../../types/badge'

const shapes: BadgeShape[] = ['circle', 'horn', 'square', 'sector', 'coupon']
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
    customStyle,
    max,
    color,
    bgColor,
    ...extraProps
  } = props
  // 隐藏直接返回null即可
  if (!show || (value === 0 && !showZero && !isDot)) return <Fragment></Fragment>
  const careClz = useCareClass([
    'fta-badge',
    hit<BadgeShape>(shape!, shapes, 'fta-badge--'),
    isDot && 'fta-badge--dot',
  ])
  const isSector = shape === 'sector'
  const realVal = handleValue(value!, max!, numberType!)
  const isSingle = String(realVal).length === 1
  const typeClz = hit<BadgeType>(type!, types, 'fta-badge--')
  const rootClass = classNames(
    typeClz,
    careClz,
    // 'fta-badge',
    // hit<BadgeType>(type, types, 'fta-badge--'),
    // hit<BadgeShape>(shape, shapes, 'fta-badge--'),

    absolute && 'fta-badge--absolute',
    isSingle && shape === 'circle' && 'fta-badge--rimless',
    className
  )
  const textClz = useCarelessClass(
    ['fta-badge-text', isSector && 'fta-badge--sector__text'],
    [textClassName]
  )
  const rootStyle =
    absolute && offset
      ? {
          ...customStyle,
          top: offset[0],
          right: offset[1],
        }
      : { ...customStyle }
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
          {realVal}
        </Text>
      )}
      {shape === 'coupon' ? (
        <Fragment>
          <View className={useCareClass(['fta-badge-coupon', 'coupon-left'])} />
          <View className={useCareClass(['fta-badge-coupon', 'coupon-right'])} />
        </Fragment>
      ) : null}
      {isSector ? <View className={useCarelessClass(['fta-badge-sector'], [typeClz])} /> : null}
    </View>
  )
}

const defaultProps: BadgeProps = {
  isDot: false,
  show: true,
  type: 'error',
  shape: 'circle',
  showZero: false,
  max: 99,
  numberType: 'overflow',
  color: '',
  bgColor: '',
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
