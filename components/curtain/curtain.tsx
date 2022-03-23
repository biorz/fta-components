import { Image, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { Assets } from '../../common'
import '../../style/components/curtain/index.scss'
import { CurtainProps } from '../../types/curtain'

export default class Curtain extends React.Component<CurtainProps> {
  public static defaultProps: CurtainProps
  public static propTypes: InferProps<CurtainProps>

  private onClose(e: CommonEvent): void {
    e.stopPropagation?.()
    this.props.onClose(e)
  }

  private _stopPropagation(e: CommonEvent): void {
    e.stopPropagation?.()
  }

  public render(): JSX.Element {
    const { className, customStyle, isOpened, closeBtnPosition } = this.props

    const curtainClass = classNames(
      {
        'fta-curtain': true,
        'fta-curtain--closed': !isOpened,
      },
      className
    )
    const btnCloseClass = classNames({
      'fta-curtain__btn-close': true,
      [`fta-curtain__btn-close--${closeBtnPosition}`]: closeBtnPosition,
    })

    return (
      <View className={curtainClass} style={customStyle} onClick={this._stopPropagation}>
        <View className='fta-curtain__container'>
          <View className='fta-curtain__body'>
            {this.props.children}
            <Image
              src={Assets.close.circle}
              className={btnCloseClass}
              onClick={this.onClose.bind(this)}
            />
            {/* {!inRN ? (
              <View className={btnCloseClass} onClick={this.onClose.bind(this)} />
            ) : (
              <Image
                src={Assets.close.circle}
                className={btnCloseClass}
                onClick={this.onClose.bind(this)}
              />
            )} */}
          </View>
        </View>
      </View>
    )
  }
}

Curtain.defaultProps = {
  customStyle: {},
  className: '',
  isOpened: false,
  closeBtnPosition: 'bottom',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: (): void => {},
}

Curtain.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  isOpened: PropTypes.bool,
  closeBtnPosition: PropTypes.string,
  onClose: PropTypes.func,
}
