import { RefObject } from 'react'
import { Rect } from '../../../types/intro'

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
