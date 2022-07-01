import { RefObject } from 'react'

export function getBoundingClientRect(ref: RefObject<any>) {
  return new Promise((resolve) => {
    setTimeout(() => {
      ref.current.measure(
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          resolve({
            x: pageX,
            y: pageY,
            width,
            height,
          })
        }
      )
    })
  })
}
