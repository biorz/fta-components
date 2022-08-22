import { useRef } from 'react'
import { findNodeHandle, UIManager } from 'react-native'

export function useMeasure() {
  const ref = useRef<any>()
  const measure = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        UIManager.measure(
          findNodeHandle(ref.current?.$ref?.current ?? ref.current),
          (_x, _y, width, height, pageX, pageY) => {
            resolve({
              width,
              height,
              left: pageX,
              top: pageY,
              bottom: pageY + height,
              right: pageX + width,
            })
          }
        )
      }, 0)
    })
  }
  return [
    {
      ref,
      /**
       * 下列属性兼容部分安卓机位置获取不到的问题
       * @see https://reactnative.dev/docs/view#collapsable-android
       * Views that are only used to layout their children or otherwise don't draw anything may be automatically removed from the native hierarchy as an optimization.
       * Set this property to false to disable this optimization and ensure that this View exists in the native view hierarchy.
       */
      collapsable: false,
    },
    measure,
  ]
}
