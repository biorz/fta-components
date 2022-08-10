import { useRef } from 'react'
import { createAutoIncrement } from '../auto-increment'
import { createSelectorQuery } from '../create-selector-query'

interface Rect {
  width: number
  height: number
  x: number
  y: number
  bottom: number
  top: number
  right: number
  left: number
}

const uid = createAutoIncrement()

export function measure() {}

export function useMeasure() {
  const props = useRef({ id: `fta-measure-${uid()}` }).current
  const measure = () => {
    return new Promise((resolve: (value: Rect) => void) => {
      setTimeout(() => {
        createSelectorQuery(`#${props.id}`, (rect) => {
          console.log('rect', rect, props.id)
          resolve(
            // @ts-ignore
            rect || {
              width: 0,
              height: 0,
              x: 0,
              y: 0,
              bottom: 0,
              top: 0,
              right: 0,
              left: 0,
            }
          )
        })
      }, 0)
    })
  }
  return [props, measure] as const
}
