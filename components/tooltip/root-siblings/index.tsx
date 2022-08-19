import { ComponentType, ReactElement } from 'react'

export default function createRootSiblings(_element: ReactElement) {
  return {
    update(_element: ReactElement) {},
    destroy() {},
  }
}

export const withRootSiblings = <P = {},>(Component: ComponentType<P>) => Component
