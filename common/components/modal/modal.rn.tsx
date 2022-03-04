import React, { Fragment } from 'react'
import { Modal as NativeModal } from 'react-native'
import { ModalProps } from './types'

export default function Modal(props: ModalProps) {
  const { useNative, children, ...modalProps } = props
  return useNative ? (
    <NativeModal {...modalProps}>{children}</NativeModal>
  ) : (
    <Fragment>{children}</Fragment>
  )
}
