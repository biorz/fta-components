import Component from '@fta/common/types/base'
import { ComponentClass } from 'react'

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
