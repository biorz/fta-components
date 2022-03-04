import * as React from 'react'
import omit from 'rc-util/lib/omit'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import Element, { SkeletonElementProps } from './Element'

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square'
}

const SkeletonAvatar = (props: AvatarProps) => {
  const { className, active } = props
  const prefixCls = 'fta-skeleton'
  const otherProps = omit(props, ['prefixCls', 'className'])
  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
    },
    className
  )
  return (
    <View className={cls}>
      <Element prefixCls={`${prefixCls}-avatar`} {...otherProps} />
    </View>
  )
}

SkeletonAvatar.defaultProps = {
  size: 'default',
  shape: 'circle',
}

export default SkeletonAvatar
