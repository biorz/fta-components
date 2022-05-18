import { FC, ReactElement } from 'react'
import BaseComponent, { PropsWithChildren } from './base'

export interface InfiniteScrollProps extends BaseComponent, PropsWithChildren {
  /**
   * 是否还有更多内容
   * @default true
   */
  hasMore?: boolean
  /**
   * 加载更多的回调函数
   */
  loadMore?: () => Promise<void>
  /**
   * 触发加载事件的滚动触底距离阈值，单位为像素(包含底部loader高度)
   * @default 100
   */
  threshold?: number
  /**
   * 加载中的提示
   */
  loader?: string | ReactElement | false
  /**
   * 没有更多数据的提示
   */
  loaded?: string | ReactElement | false
}

declare const InfiniteScroll: FC<InfiniteScrollProps>

export default InfiniteScroll
