import { ComponentClass, ReactNode } from 'react'

export interface TimelineProps {
  /**
   * 节点排序
   * @default false
   */
  reverse?: boolean
}

export interface TimelineItemProps {
  /**
   * 小圆点背景色
   */
  color?: string
  /**
   * 小圆点是否空心
   * @default false
   */
  hollow?: boolean
  /**
   * 自定义node节点，默认为小圆点
   */
  icon?: ReactNode
}
declare const TimelineItem: ComponentClass<TimelineItemProps>
declare const Timeline: ComponentClass<TimelineProps> & { Item: TimelineItem }

export default Timeline

export { TimelineItem }
