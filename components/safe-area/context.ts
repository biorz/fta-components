import { createContext, useContext } from 'react'
import { SafeAreaContext } from '../..//types/safe-area'

const safeAreaContext = createContext<SafeAreaContext>({
  disabled: false,
})

/**
 * safeAreaContext including Provider and Consumer.
 */
export default safeAreaContext

/**
 * useSafeArea hook.
 */
export const useSafeArea = () => useContext(safeAreaContext)
