import * as React from 'react'
import { SpaceContext } from '.'
import { View, Text } from '@tarojs/components'

export interface ItemProps {
  className: string
  children: React.ReactNode
  index: number
  direction?: 'horizontal' | 'vertical'
  marginDirection: 'marginLeft' | 'marginRight'
  split?: string | React.ReactNode
  wrap?: boolean
}

export default function Item({
  className,
  direction,
  index,
  marginDirection,
  children,
  split,
  wrap,
}: ItemProps) {
  const { horizontalSize, verticalSize, latestIndex, supportFlexGap } =
    React.useContext(SpaceContext)

  let style: React.CSSProperties = {}

  if (!supportFlexGap) {
    if (direction === 'vertical') {
      if (index < latestIndex) {
        style = { marginBottom: `${horizontalSize / (split ? 2 : 1)}px` }
      }
    } else {
      style = {
        ...(index < latestIndex && { [marginDirection]: `${horizontalSize / (split ? 2 : 1)}px` }),
        ...(wrap && { paddingBottom: `${verticalSize}px` }),
      }
    }
  }

  if (children === null || children === undefined) {
    return null
  }

  return (
    <React.Fragment>
      <View className={className} style={style}>
        {children}
      </View>
      {index < latestIndex && split && (
        <Text className={`${className}-split`} style={style}>
          {split}
        </Text>
      )}
    </React.Fragment>
  )
}
