import { FC } from 'react'
import { PropsWithChildren } from './base'

export interface PullToRefreshProps extends PropsWithChildren {
  /**
   * 触发刷新时的处理函数
   */
  onRefresh?: () => Promise<void>
}

declare const PullToRefresh: FC<PullToRefreshProps>

export default PullToRefresh
