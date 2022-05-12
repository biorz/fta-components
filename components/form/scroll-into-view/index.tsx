import { ScrollView, View } from '@tarojs/components'
import React, { FC, ReactNode } from 'react'

const ScrollIntoView: FC<{ children: ReactNode; ref?: any; id?: string }> = (props) => (
  <View id={props.id}>{props.children}</View>
)
const useScrollIntoView = () => false as unknown as any

export { ScrollIntoView, ScrollView, useScrollIntoView }
