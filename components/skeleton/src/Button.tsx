import * as React from 'react'
import classNames from 'classnames'
import Element, { SkeletonElementProps } from './Element'
import { View } from '@tarojs/components'

export interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'size'> {
  size?: 'large' | 'small' | 'default'
  block?: boolean
}

const SkeletonButton = (props: SkeletonButtonProps) => {
  const { className, active, block = false, ...rest } = props
  const prefixCls = 'fta-skeleton'
  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-block`]: block,
    },
    className
  )
  return (
    <View className={cls}>
      <Element prefixCls={`${prefixCls}-button`} {...rest} />
    </View>
  )
}

SkeletonButton.defaultProps = {
  size: 'default',
}

export default SkeletonButton
