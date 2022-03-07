import Taro, { createSelectorQuery } from '@tarojs/taro'
export const isArray = Array.isArray

/** 中间态适配器 */
const callbackAdaptor =
  (callback: Taro.NodesRef.BoundingClientRectCallback) =>
  (rect: Taro.NodesRef.BoundingClientRectCallbackResult) =>
    callback(isArray(rect) ? rect[0] : rect)

export function PolyCreateSelectorQuery(
  selector: string,
  callback: Taro.NodesRef.BoundingClientRectCallback
) {
  const cb = callbackAdaptor(callback)
  const query = createSelectorQuery()
  const el = query.select(selector)
  el.boundingClientRect(cb)
  query.exec(cb)
}
