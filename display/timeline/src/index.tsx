import { ConfigConsumer, useClassWithCare } from '@fta/common'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Component, CSSProperties } from 'react'
import { TimelineItemProps, TimelineProps } from '../types'
import './style/index.scss'

class TimelineItem extends Component<TimelineItemProps> {
  public render(): JSX.Element {
    const { color, icon, hollow = false } = this.props

    const dotStyle: CSSProperties = {}
    if (color) {
      dotStyle[hollow ? 'borderColor' : 'backgroundColor'] = color
    }
    return (
      <ConfigConsumer>
        {({ careMode }) => {
          const dotClass = classNames(
            useClassWithCare(careMode, ['fta-timeline-item-dot']),
            hollow && 'fta-timeline-item-dot--hollow'
          )
          return (
            <View className='fta-timeline-item'>
              <View className='fta-timeline-item-view'>{this.props.children}</View>
              <View className='fta-timeline-item-node'>
                {icon || <View className={dotClass} style={dotStyle}></View>}
                {<View className='fta-timeline-item-line'></View>}
              </View>
            </View>
          )
        }}
      </ConfigConsumer>
    )
  }
}

class Timeline extends Component<TimelineProps> {
  public static defaultProps: TimelineProps
  public static Item: typeof TimelineItem
  public render(): JSX.Element {
    const { reverse, children } = this.props
    const _children = reverse && Array.isArray(children) ? [...children].reverse() : children
    return <View className='fta-timeline'>{_children}</View>
  }
}

Timeline.defaultProps = {
  reverse: false,
}

Timeline.Item = TimelineItem

export { Timeline as default, TimelineItem }
