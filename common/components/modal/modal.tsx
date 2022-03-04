import React, { Fragment } from 'react'
import { ModalProps } from './types'

export default function Modal(props: ModalProps): JSX.Element {
  return <Fragment>{props.visible ? props.children : null}</Fragment>
}
