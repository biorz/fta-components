import { View } from '@tarojs/components'
// import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { inRN } from '../../common'
import Modal from '../../common/components/modal'
import '../../style/components/action-sheet/index.scss'
import { ActionSheetProps, ActionSheetState } from '../../types/action-sheet'
import SafeArea from '../safe-area'
import ActionSheetBody from './body/index'
import ActionSheetItem from './body/item'
import ActionSheetFooter from './footer/index'
import ActionSheetHeader from './header/index'
// import { Motion, spring } from 'react-motion'
import Motion from './motion'

const px = inRN ? (num: number) => num : (num: number) => num + 'px'

// const height = getSystemInfoSync().screenHeight
// console.log('screen height', height, getSystemInfoSync().screenWidth)

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

  private close = (): void => {
    this.setState(
      {
        _isOpened: false,
      },
      this.handleClose
    )
  }

  private handleTouchMove = (e: any): void => {
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
      useNativeModal,
    } = this.props
    const { _isOpened } = this.state

    const rootClass = classNames(
      'fta-action-sheet',
      {
        'fta-action-sheet--active': _isOpened,
      },
      className
    )

    const containerClz = classNames('fta-action-sheet__container', containerClassName)

    return (
      <Modal transparent visible={inRN ? _isOpened : true} useNative={useNativeModal}>
        <View className={rootClass} style={customStyle} onTouchMove={this.handleTouchMove}>
          <View onClick={this.close} className='fta-action-sheet__overlay' />
          <Motion _isOpened={_isOpened}>
            {(value) => (
              <View className={containerClz} style={{ ...containerStyle, bottom: px(value.x) }}>
                {title ? <ActionSheetHeader>{title}</ActionSheetHeader> : null}
                <ActionSheetBody>{this.props.children}</ActionSheetBody>
                {cancelText ? (
                  <ActionSheetFooter onClick={this.handleCancel}>{cancelText}</ActionSheetFooter>
                ) : null}
                <SafeArea />
              </View>
            )}
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
}

ActionSheet.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  isOpened: PropTypes.bool.isRequired,
  cancelText: PropTypes.string,
}

export default ActionSheet
