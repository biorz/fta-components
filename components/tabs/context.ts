import { createContext } from 'react'
import { TabsContext } from '../../types/tabs'

export const TabContext = createContext<TabsContext>({
  disabled: false,
  activeIndex: 0,
  onChange: null,
})
