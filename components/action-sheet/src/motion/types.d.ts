import { MotionProps } from 'react-motion'

export interface Props extends Pick<MotionProps, 'children'> {
  _isOpened: boolean
}
