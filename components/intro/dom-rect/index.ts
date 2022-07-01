import { RefObject } from 'react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export function getBoundingClientRect(ref: RefObject<HTMLElement>): Promise<Rect> {
  return new Promise((resolve) => {
    const { x, y, width, height } = ref.current!.getBoundingClientRect()
    return resolve({
      x,
      y,
      width,
      height,
    })
  })
}
