import { ComponentClass } from 'react'
import Component from './base'

export interface LoadingProps extends Component {
  /**
   * 大小
   * @default 'normal'
   */
  size?: number
  /**
   * 类型
   */
  color?: string
}

declare const Loading: ComponentClass<LoadingProps>

export default Loading
