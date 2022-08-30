import { Input, ScrollView, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Ref, useMemo, useRef } from 'react'
import { px } from '../../common'
import '../../style/components/selector/index.scss'
import { ScrollAreaProps, SelectorProps } from '../../types/selector'

function ScrollArea(props: ScrollAreaProps) {
  const { className, style } = props
  const rootClass = classNames('fta-selector-scrollarea', className)
  return (
    <View className={rootClass} style={style}>
      <ScrollView>
        {new Array(100).fill(0).map((_, i) => (
          <View style={{ height: px(20) }}>{i}</View>
        ))}
      </ScrollView>
    </View>
  )
}

const Selector = function _Selector(props: SelectorProps, ref: Ref<any>) {
  const {
    className,
    // @ts-ignore
    style,
    customStyle,
    containerClassName,
    containerStyle,
    depth,
  } = props

  const loops = useRef(new Array(depth).fill(0)).current

  const rootClass = classNames('fta-selector', className)
  const rootStyle = Object.assign({}, style, customStyle)
  const containerClass = classNames('fta-selector-container', containerClassName)

  return (
    <View className={rootClass} style={rootStyle}>
      <Input></Input>
      <View className={containerClass} style={containerStyle}>
        {loops.map((_, i) => (
          <ScrollArea key={i}></ScrollArea>
        ))}
      </View>
    </View>
  )
}

function useSelector(initialProps: SelectorProps, deps = [] as any[]) {
  const ref = useRef()
  return [ref, useMemo(() => <Selector {...initialProps} ref={ref} />, deps)] as const
}

Selector.defaultProps = {
  depth: 3,
}

export { Selector as default, useSelector }
