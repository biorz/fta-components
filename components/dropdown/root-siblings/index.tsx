import { ReactElement } from 'react'

export default function createRootSiblings(_element: ReactElement) {
  return {
    update(_element: ReactElement) {},
    destroy() {},
  }
}
