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
  return [{ ref }, measure]
}
