import { RefObject } from 'react'
import { Rect } from '../../../types/intro'

export function getBoundingClientRect(ref: RefObject<HTMLElement>, delay: number): Promise<Rect> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { x, y, width, height } = ref.current!.getBoundingClientRect()
      return resolve({
        x,
        y,
        width,
        height,
      })
    }, delay)
  })
}
