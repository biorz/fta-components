import { ReactElement } from 'react'
import RootSiblings from 'react-native-root-siblings'

export default function createRootSiblings(element: ReactElement) {
  return new RootSiblings(element)
}
