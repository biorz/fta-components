import { createContext, useContext } from 'react'
import { DropdownContext } from '../../types/dropdown'

const dropdownContext = createContext<DropdownContext>({} as DropdownContext)

const DropdownProvider = dropdownContext.Provider

const useDropdown = () => useContext(dropdownContext)

export { dropdownContext, DropdownProvider, useDropdown }
