import { createContext } from 'react'
import { ThemeContext } from '../types'

/**
 * 主题context
 */
export const Theme = createContext<ThemeContext>({
  platform: 'ymm',
})
