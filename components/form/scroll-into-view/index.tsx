import { ScrollView } from '@tarojs/components'
import React, { FC, ReactNode } from 'react'

const ScrollIntoView: FC<{ children: ReactNode; ref: any }> = (props) => <>{props.children}</>
const useScrollIntoView = () => false as unknown as any

export { ScrollIntoView, ScrollView, useScrollIntoView }
