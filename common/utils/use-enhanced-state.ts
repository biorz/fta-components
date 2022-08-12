import { useCallback, useState } from 'react'

/**
 * 加强版的setState，适用于object类型
 */
export function useEnhancedState<S extends object = {}>(initialState: S) {
  const [state, setState] = useState<S>(initialState)
  // const stateRef = useRef(state)

  // stateRef.current = state

  function setEnhancedState<T extends S, K extends keyof T = keyof T>(key: K, val: T[K]): void
  function setEnhancedState<T extends S, K extends keyof T = keyof T>(record: Partial<S>): void

  function setEnhancedState<T extends S, K extends keyof T = keyof T>(
    record: Record<K, T[K]> | K,
    val?: T[K]
  ) {
    if (typeof record === 'string') {
      // FIXME: 异步拿最新的状态
      setState((prevState) => ({ ...prevState, [record]: val }))
    } else {
      setState((prevState) => ({ ...prevState, ...(record as Record<K, T[K]>) }))
    }
  }
  // Bug fixed
  return [state, useCallback(setEnhancedState, [state])] as const
}
