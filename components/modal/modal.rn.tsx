import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Fragment } from 'react'
import { handleTouchScroll } from '../../common'
import Modal from '../../common/components/modal'
import '../../style/components/modal/index.scss'
import { ModalProps, ModalState } from '../../types/modal'
import { TouchableOpacity as Button } from '../view'
import FTAModalAction from './action/index'
import FTAModalContent from './content/index'
import FTAModalHeader from './header/index'
export default class FTAModal extends React.Component<ModalProps, ModalState> {
  public static defaultProps: ModalProps
  public static propTypes: InferProps<ModalProps>

  public constructor(props: ModalProps) {
    super(props)
    const { isOpened } = props
    this.state = {
      _isOpened: isOpened,
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ModalProps): void {
    const { isOpened } = nextProps

    if (this.props.isOpened !== isOpened) {
      handleTouchScroll(isOpened)
    }

    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened,
      })
    }
  }

  private handleClickOverlay = (): void => {
    if (this.props.closeOnClickOverlay) {
      this.setState(
        {
          _isOpened: false,
        },
        this.handleClose
      )
    }
  }

  private handleClose = (event?: CommonEvent): void => {
    if (typeof this.props.onClose === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.props.onClose(event!)
    }
  }

  private handleCancel = (event: CommonEvent): void => {
    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel(event)
    }
  }

  private handleConfirm = (event: CommonEvent): void => {
    if (typeof this.props.onConfirm === 'function') {
      this.props.onConfirm(event)
    }
  }

  // private handleTouchMove = (e: CommonEvent): void => {
  //   e.stopPropagation()
  // }

  public render(): JSX.Element {
    const { _isOpened } = this.state
    const {
      title,
      content,
      cancelText,
      confirmText,
      containerClassName,
      containerStyle,
      overlayClassName,
      overlayStyle,
      contentAlign,
      contentClassName,
      contentStyle,
      useNativeModal,
    } = this.props
    const rootClass = classNames(
      'fta-modal',
      {
        'fta-modal--active': _isOpened,
      },
      this.props.className
    )

    const containerClz = classNames('fta-modal__container', containerClassName)

    const overlay = (
      <View
        onClick={this.handleClickOverlay}
        style={overlayStyle}
        className={classNames('fta-modal__overlay', overlayClassName)}
      />
    )

    // console.log('_isOpened', _isOpened)
    if (!_isOpened) return <Fragment />

    if (title || content) {
      const isRenderAction = cancelText || confirmText
      return (
        <Modal
          useNative={useNativeModal}
          visible={_isOpened}
          animationType='none'
          transparent
          hardwareAccelerated
          onRequestClose={this.handleClose}>
          <View className={rootClass}>
            {overlay}
            <View className={containerClz} style={containerStyle}>
              {title && <FTAModalHeader>{title}</FTAModalHeader>}
              {content && (
                <FTAModalContent
                  className={contentClassName}
                  style={contentStyle}
                  withTitle={!!title}>
                  <View
                    className={classNames(
                      'content-simple',
                      !title && 'cotent-simple--notitle',
                      `content-simple--${contentAlign}`
                    )}>
                    {<Text className={'content-simple__text'}>{content}</Text>}
                  </View>
                </FTAModalContent>
              )}
              {isRenderAction && (
                <FTAModalAction isSimple>
                  {cancelText && (
                    <Button
                      hoverStyle={{ opacity: 0.6 }}
                      className='fta-modal__action__button fta-modal__action__button--cancel'
                      onClick={this.handleCancel}>
                      <Text className='button button-cancel__text'>{cancelText}</Text>
                    </Button>
                  )}
                  {confirmText && (
                    <Button
                      hoverStyle={{ opacity: 0.6 }}
                      className={`fta-modal__action__button fta-modal__action__button--confirm ${
                        cancelText ? 'button--border' : ''
                      }`}
                      onClick={this.handleConfirm}>
                      <Text className='button button-confirm__text'>{confirmText}</Text>
                    </Button>
                  )}
                </FTAModalAction>
              )}
            </View>
          </View>
        </Modal>
      )
    }

    return (
      <Modal
        className='fta-modal'
        visible={_isOpened}
        animationType='none'
        transparent
        hardwareAccelerated
        onRequestClose={this.handleClose}>
        <View className={rootClass}>
          {overlay}
          <View className={containerClz} style={containerStyle}>
            {this.props.children}
          </View>
        </View>
      </Modal>
    )
  }
}

FTAModal.defaultProps = {
  isOpened: false,
  closeOnClickOverlay: false,
  contentAlign: 'center',
  useNativeModal: true,
}

FTAModal.propTypes = {
  title: PropTypes.string,
  isOpened: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  content: PropTypes.string,
  closeOnClickOverlay: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
}

export {
  FTAModal as Modal,
  FTAModalAction as ModalAction,
  FTAModalHeader as ModalHeader,
  FTAModalContent as ModalContent,
}
