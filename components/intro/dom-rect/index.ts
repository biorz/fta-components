import { RefObject } from 'react'
import { createSelectorQuery } from '../../../common'
import { Rect } from '../../../types/intro'

const defaultRect: Rect = {
  width: 200,
  height: 80,
  x: 100,
  y: 200,
}

export function getBoundingClientRect(ref: RefObject<HTMLElement>, delay: number): Promise<Rect> {
  return new Promise((resolve) => {
    setTimeout(() => {
      createSelectorQuery(`#${ref.current?.id}`, (rect) => {
        // console.log(JSON.parse(JSON.stringify(rect)), 'jsonrect', rect);
        resolve(
          rect
            ? {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
              }
            : defaultRect
        )
      })
    }, delay)
  })
}
