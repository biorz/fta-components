import React, { ComponentType, ReactElement } from 'react'
import RootSiblings, { RootSiblingParent } from 'react-native-root-siblings'

export default function createRootSiblings(element: ReactElement) {
  return new RootSiblings(element)
}

export const withRootSiblings =
  <P = {},>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <RootSiblingParent>
        <Component {...props} />
      </RootSiblingParent>
    )
