import * as React from 'react'
import { View } from '@tarojs/components'
import omit from 'rc-util/lib/omit'
import classNames from 'classnames'
import Element, { SkeletonElementProps } from './Element'

export interface SkeletonInputProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  size?: 'large' | 'small' | 'default'
}

const SkeletonInput = (props: SkeletonInputProps) => {
  const { className, active } = props
  const prefixCls = 'fta-skeleton'
  const otherProps = omit(props, ['prefixCls'])
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
      <Element prefixCls={`${prefixCls}-input`} {...otherProps} />
    </View>
  )
}

SkeletonInput.defaultProps = {
  size: 'default',
}

export default SkeletonInput
