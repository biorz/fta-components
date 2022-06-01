import { CommonEvent, View } from '@tarojs/components'
// import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import Modal from '../../common/components/modal'
import '../../style/components/action-sheet/index.scss'
import { ActionSheetProps, ActionSheetState, CustomTitle } from '../../types/action-sheet'
import SafeArea from '../safe-area'
import ActionSheetBody from './body/index'
import ActionSheetItem from './body/item'
import ActionSheetFooter from './footer/index'
import ActionSheetHeader from './header/index'
// import { Motion, spring } from 'react-motion'
import Motion from './motion'
import { stopPropagation } from './util'

export { ActionSheetItem, ActionSheetItem as SheetItem, ActionSheetItem as Item }

class ActionSheet extends React.Component<ActionSheetProps, ActionSheetState> {
  public static defaultProps: ActionSheetProps
  public static propTypes: InferProps<ActionSheetProps>

  public constructor(props: ActionSheetProps) {
    super(props)
    const { isOpened } = props

    this.state = {
      _isOpened: isOpened,
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ActionSheetProps): void {
    const { isOpened } = nextProps
    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened,
      })

      !isOpened && this.handleClose()
    }
  }

  private handleClose = (): void => {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

  private handleCancel = (): void => {
    if (typeof this.props.onCancel === 'function') {
      return this.props.onCancel()
    }
    this.close()
  }

  private close = (evt?: any): void => {
    stopPropagation(evt)
    if (this.props.clickOverlayOnClose) {
      this.setState(
        {
          _isOpened: false,
        },
        this.handleClose
      )
    }
  }

  private handleTouchMove = (e: CommonEvent): void => {
    e.stopPropagation?.()
    e.preventDefault?.()
  }

  public render(): JSX.Element {
    const {
      title,
      cancelText,
      className,
      customStyle,
      containerClassName,
      containerStyle,
      overlayClassName,
      overlayStyle,
      useNativeModal,
      catchMove,
      example,
    } = this.props
    const { _isOpened } = this.state

    const rootClass = classNames(
      'fta-action-sheet',
      {
        'fta-action-sheet--active': _isOpened,
      },
      className
    )

    const overlayClass = classNames('fta-action-sheet__overlay', overlayClassName)

    const containerClz = classNames('fta-action-sheet__container', containerClassName)

    return (
      <Modal transparent visible={_isOpened} useNative={useNativeModal}>
        <View className={rootClass} style={customStyle} catchMove={catchMove}>
          <View
            onClick={this.close}
            className={overlayClass}
            style={overlayStyle}
            onTouchMove={this.handleTouchMove}
          />
          <Motion
            _isOpened={_isOpened}
            example={example}
            className={containerClz}
            customStyle={{ ...containerStyle }}>
            {title ? <ActionSheetHeader>{title}</ActionSheetHeader> : null}
            <ActionSheetBody>{this.props.children}</ActionSheetBody>
            {cancelText || ((title as CustomTitle)?.icon && (title as CustomTitle)?.confirmText) ? (
              <ActionSheetFooter
                onClick={this.handleCancel}
                icon={(title as CustomTitle)?.icon}
                confirmText={(title as CustomTitle)?.confirmText}
                onConfirm={(title as CustomTitle)?.onConfirm}>
                {cancelText}
              </ActionSheetFooter>
            ) : null}
            <SafeArea bottom />
          </Motion>
        </View>
      </Modal>
    )
  }
}

ActionSheet.defaultProps = {
  title: '',
  cancelText: '',
  isOpened: false,
  useNativeModal: true,
  catchMove: true,
  clickOverlayOnClose: true,
}

ActionSheet.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  isOpened: PropTypes.bool.isRequired,
  cancelText: PropTypes.string,
}

export default ActionSheet
