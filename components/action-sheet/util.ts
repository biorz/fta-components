import { CommonEvent } from '@tarojs/components'

/** 阻止事件冒泡 */
export function stopPropagation(evt: any) {
  // console.log('阻止事件冒泡', evt.stopPropagation)
  ;(evt as CommonEvent)?.stopPropagation?.()
}
