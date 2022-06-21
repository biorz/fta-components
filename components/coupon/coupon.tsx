import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import { Assets, isString } from '../../common'
import '../../style/components/coupon/index.scss'
import { CouponProps } from '../../types/coupon'

const IMAGE_PREFIX = 'https://imagecdn.ymm56.com/ymmfile/static/resource/'

const srcset: Record<string, string> = {
  'rich-unused': IMAGE_PREFIX + '2cb799e7-d6ee-4771-ab63-6a1848692b1d.png',
  'rich-used': IMAGE_PREFIX + 'ad1e375c-0029-4fdc-b635-e069ae5fc4a8.png',
  'rich-expired': IMAGE_PREFIX + '697d6222-848a-4205-8535-7de2294cf585.png',
  'simple-used': IMAGE_PREFIX + 'dc5d4b83-03b6-471f-9567-2399b638bf83.png',
  'simple-expired': IMAGE_PREFIX + 'c5e8d09e-9f43-44a7-bca6-ad0579ab263a.png',
}

function Coupon(props: CouponProps) {
  const {
    className,
    customStyle,
    // @ts-ignore
    style,
    status,
    type,
    price,
    meet,
    title,
    src,
    desc,
    period,
    remark,
    remarkBgColor,
    remarkColor,
    btnText,
    showExpand,
    onBtnClick,
    onClick,
    onExpand,
  } = props

  const disabled = ['used', 'expired', 'disabled'].includes(status!)
  const disabledClass = disabled && 'fta-coupon__text--disabled'
  const hitTextClass = (clazz: any) => classNames(clazz, disabledClass)
  const rootClass = classNames('fta-coupon', `fta-coupon--${type}`, className)
  const rootStyle = { ...style, ...customStyle }
  const containerClass = classNames('fta-coupon-container', `fta-coupon-coupon--${type}`)
  const leftClass = classNames('fta-coupon-left', `fta-coupon-left--${type}`)
  const rightClass = classNames('fta-coupon-right', `fta-coupon-right--${type}`)

  const simpleDisabled = disabled && type === 'simple'
  const remarkStyle: CSSProperties = {}
  const bgStyle: CSSProperties = {}
  if (!simpleDisabled) {
    let i: any
    if ((i = remarkBgColor)) bgStyle.backgroundColor = i
    if ((i = remarkColor)) remarkStyle.color = i
  }

  return (
    <View className={rootClass} style={rootStyle} onClick={onClick}>
      <View className={containerClass}>
        <View className={leftClass}>
          <View className='fta-coupon-price'>
            <Text className={hitTextClass('fta-coupon-price-sign')}>￥</Text>
            <Text className={hitTextClass('fta-coupon-price-value')}>{price}</Text>
          </View>
          {
            <View className='fta-coupon-meet'>
              <Text className='fta-coupon-meet__text'>
                {isString(meet) ? meet : meet! <= 0 ? '无门槛' : `满${meet}元可用`}
              </Text>
            </View>
          }
        </View>
        <View className='fta-coupon-line'></View>
        <View className={rightClass}>
          <View className='fta-coupon-detail'>
            <Text className={hitTextClass('fta-coupon-title')}>{title}</Text>
            <View
              className={classNames(
                'fta-coupon-remark',
                disabled && 'fta-coupon-remark--disabled',
                simpleDisabled && 'fta-coupon-remark--disabled--simple'
              )}
              style={bgStyle}>
              <Text
                className={classNames(
                  'fta-coupon-remark__text',
                  simpleDisabled && 'fta-coupon-remark__text--disabled'
                )}
                style={remarkStyle}>
                {remark}
              </Text>
            </View>
            <Text className='fta-coupon-period'>{period}</Text>
          </View>
          {type === 'rich' ? (
            status === 'unused' ? (
              <View
                className='fta-coupon-button'
                onClick={onBtnClick}
                // @ts-ignore
                hoverClassName='fta-coupon-button--hover'
                hoverClass='fta-coupon-button--hover'>
                <Text className='fta-coupon-button__text'>{btnText}</Text>
              </View>
            ) : null
          ) : status === 'unused' ? (
            <View className='fta-coupon-radio' onClick={onBtnClick} />
          ) : status === 'disabled' ? null : (
            <Image src={src || srcset[`${type}-${status}`]} className='fta-coupon-status' />
          )}
        </View>
      </View>
      {/* 类型为rich独有 */}
      {type === 'rich' ? (
        <>
          <Image src={src || srcset[`${type}-${status}`]} className='fta-coupon-bg' />
          <View className='fta-coupon-desc'>
            <Text className='fta-coupon-desc__text'>{desc}</Text>
            {showExpand ? (
              <Image onClick={onExpand} src={Assets.arrow.down} className='fta-coupon-desc__down' />
            ) : null}
          </View>
        </>
      ) : null}
    </View>
  )
}

const defaultProps: CouponProps = {
  type: 'simple',
  price: 50,
  meet: 150,
  showExpand: true,
  status: 'unused',
  btnText: '去使用',
  remark: '通用券',
}

Coupon.defaultProps = defaultProps

export default Coupon
