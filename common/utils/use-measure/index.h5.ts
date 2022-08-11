import { useRef } from 'react'

export function useMeasure() {
  const ref = useRef<HTMLElement>()
  const measure = () =>
    Promise.resolve().then(() => {
      return (
        ref.current?.getBoundingClientRect() ?? {
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
  return [{ ref }, measure]
}
