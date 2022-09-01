import { createContext, useContext } from 'react'
import { SelectorContext } from '../../types/selector'

export const Context = createContext<SelectorContext>({} as SelectorContext)

export const Provider = Context.Provider

export const useSelectorConfig = () => useContext(Context)
