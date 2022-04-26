import { DependencyList, useEffect, useRef } from 'react'

/**
 * 第一次不执行，之后的改变才执行函数回调
 */
export const useAfterwards = (fn: (...args: any[]) => void, deps: DependencyList) => {
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current) {
      ref.current = true
    } else {
      fn?.()
    }
  }, deps)
}
