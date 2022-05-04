import { Button, Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { handleTouchScroll, inWeb } from '../../common'
import '../../style/components/modal/index.scss'
import { ModalProps, ModalState } from '../../types/modal'
import ModalAction from './action'
import ModalContent from './content'
import ModalHeader from './header'

export default class Modal extends React.Component<ModalProps, ModalState> {
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

  private handleTouchMove = (e: CommonEvent): void => {
    e.stopPropagation()
  }

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

    if (title || content) {
      const isRenderAction = cancelText || confirmText
      return (
        <View className={rootClass}>
          {overlay}
          <View className={containerClz} style={containerStyle}>
            {title && <ModalHeader>{title}</ModalHeader>}
            {content && (
              <ModalContent withTitle={!!title}>
                <View className={classNames('content-simple', `content-simple--${contentAlign}`)}>
                  {inWeb ? (
                    <Text
                      className='content-simple__text'
                      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                      // @ts-ignore
                      dangerouslySetInnerHTML={{
                        __html: content.replace(/\n/g, '<br/>'),
                      }}></Text>
                  ) : (
                    <Text className='content-simple__text'>{content}</Text>
                  )}
                </View>
              </ModalContent>
            )}
            {isRenderAction && (
              <ModalAction isSimple>
                {cancelText && (
                  <Button
                    onClick={this.handleCancel}
                    className='fta-modal__action__button fta-modal__action__button--cancel'>
                    {cancelText}
                  </Button>
                )}
                {confirmText && (
                  <Button
                    onClick={this.handleConfirm}
                    className='fta-modal__action__button fta-modal__action__button--confirm'>
                    {confirmText}
                  </Button>
                )}
              </ModalAction>
            )}
          </View>
        </View>
      )
    }

    return (
      <View onTouchMove={this.handleTouchMove} className={rootClass}>
        {overlay}
        <View className={containerClz} style={containerStyle}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

Modal.defaultProps = {
  isOpened: false,
  closeOnClickOverlay: false,
  contentAlign: 'center',
}

Modal.propTypes = {
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

export { Modal, ModalAction, ModalHeader, ModalContent }
