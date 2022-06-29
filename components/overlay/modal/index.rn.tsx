import React from 'react'
import { Modal as NativeModal } from 'react-native'
import { OverlayProps } from '../../../types/overlay'
import { defaultProps } from './defalut-props'
import Overlay from './overlay'

export default function Modal(props: OverlayProps) {
  const { fixed, customStyle, style, ...extraProps } = props
  const overlay = <Overlay {...extraProps} style={{ ...style, ...customStyle }} />
  return fixed ? (
    <NativeModal transparent visible={props.show}>
      {overlay}
    </NativeModal>
  ) : (
    overlay
  )
}

Modal.defaultProps = defaultProps
