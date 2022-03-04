import * as React from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { SkeletonElementProps } from './Element'

export interface SkeletonImageProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {}

const SkeletonImage = (props: SkeletonImageProps) => {
  const { className, style, active } = props
  const prefixCls = 'fta-skeleton'
  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    { [`${prefixCls}-active`]: active },
    className
  )

  return (
    <View className={cls}>
      <View className={classNames(`${prefixCls}-image`, className)} style={style}>
        <View className={`${prefixCls}-image-icon`}></View>
      </View>
    </View>
  )
}

export default SkeletonImage
