import { useEffect, useRef } from 'react'

/**
 * 判断dom是否挂载
 */
export const useMount = () => {
  const mountRef = useRef(false)
  useEffect(() => {
    mountRef.current = true
  }, [])
  return () => mountRef.current
}
