import { RefObject } from 'react'

export function getBoundingClientRect(ref: RefObject<any>, delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      ref.current.$ref.current.measure(
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          resolve({
            x: pageX,
            y: pageY,
            width,
            height,
          })
        }
      )
    }, delay)
  })
}
