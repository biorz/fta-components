import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import '../../../style/components/modal/action.scss'
import { ModalActionProps } from '../../../types/modal'

export default class ModalAction extends React.Component<ModalActionProps> {
  public static defaultProps: ModalActionProps
  public static propTypes: InferProps<ModalActionProps>

  public render(): JSX.Element {
    const rootClass = classNames(
      'fta-modal__footer',
      {
        'fta-modal__footer--simple': this.props.isSimple,
      },
      this.props.className
    )

    return (
      <View className={rootClass}>
        <View className='fta-modal__action'>{this.props.children}</View>
      </View>
    )
  }
}

ModalAction.defaultProps = {
  isSimple: false,
}

ModalAction.propTypes = {
  isSimple: PropTypes.bool,
}
