import { ReactNode } from 'react'
import BaseComponent from '../../../types/base'

export interface Props extends BaseComponent {
  _isOpened: boolean

  children: ReactNode

  example?: ReactNode
}
