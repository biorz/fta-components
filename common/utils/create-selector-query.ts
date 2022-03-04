import Taro from '@tarojs/taro'

/** 中间态适配器 */
const callbackAdaptor =
  (callback: Taro.NodesRef.BoundingClientRectCallback) =>
  (rect: Taro.NodesRef.BoundingClientRectCallbackResult) =>
    callback(Array.isArray(rect) ? rect[0] : rect)

/**
 *  统一多端Taro.createSelectorQuery方法
 * @param selector 选择器
 * @param callback 选取之后的回调
 */
function PolyCreateSelectorQuery(
  selector: string,
  callback: Taro.NodesRef.BoundingClientRectCallback
) {
  const cb = callbackAdaptor(callback)
  const query = Taro.createSelectorQuery?.()
  if (!query) return
  const el = query.select(selector)
  el.boundingClientRect(cb)
  query.exec(cb)
}

export { PolyCreateSelectorQuery as createSelectorQuery }
