import { Button, Form, Text, View } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import { BaseEventOrig, CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { mergeStyle } from '../../common'
import '../../style/components/button'
import { ButtonProps as FTAButtonProps, ButtonState as FTAButtonState } from '../../types/button'
import Loading from '../loading'

const SIZE_CLASS = {
  normal: 'normal',
  small: 'small',
}

const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary',
}

export default class FTAButton extends React.Component<FTAButtonProps, FTAButtonState> {
  public static defaultProps: FTAButtonProps
  public static propTypes: InferProps<FTAButtonProps>

  public constructor(props: FTAButtonProps) {
    super(props)
    this.state = {
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
    }
  }

  private onClick(event: CommonEvent): void {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(event)
    }
  }

  private onGetUserInfo(event: CommonEvent): void {
    this.props.onGetUserInfo && this.props.onGetUserInfo(event)
  }

  private onContact(event: BaseEventOrig<ButtonProps.onContactEventDetail>): void {
    this.props.onContact && this.props.onContact(event)
  }

  private onGetPhoneNumber(event: CommonEvent): void {
    this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(event)
  }

  private onError(event: CommonEvent): void {
    this.props.onError && this.props.onError(event)
  }

  private onOpenSetting(event: CommonEvent): void {
    this.props.onOpenSetting && this.props.onOpenSetting(event)
  }

  private onSumit(event: CommonEvent): void {
    if (this.state.isWEAPP || this.state.isWEB) {
      // TODO: 3.0 this.$scope
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.$scope.triggerEvent('submit', event.detail, {
        bubbles: true,
        composed: true,
      })
    }
  }

  private onReset(event: CommonEvent): void {
    if (this.state.isWEAPP || this.state.isWEB) {
      // TODO: 3.0 this.$scope
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.$scope.triggerEvent('reset', event.detail, {
        bubbles: true,
        composed: true,
      })
    }
  }

  public render(): JSX.Element {
    const {
      size = 'normal',
      type = '',
      circle,
      full,
      loading,
      disabled,
      customStyle,
      formType,
      openType,
      lang,
      sessionFrom,
      sendMessageTitle,
      sendMessagePath,
      sendMessageImg,
      showMessageCard,
      appParameter,
      style,
      textStyle,
    } = this.props
    const { isWEAPP, isALIPAY, isWEB } = this.state
    let rootClassName = classNames(
      'fta-button',
      {
        [`fta-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
        'fta-button--disabled': disabled,
        [`fta-button--${type}`]: TYPE_CLASS[type],
        'fta-button--circle': circle,
        'fta-button--full': full,
      },
      this.props.className
    )

    const textClassName = classNames(
      'fta-button__text',
      `fta-button__text--${TYPE_CLASS[type] || 'default'}`
    )

    const loadingColor = type === 'primary' ? '#fff' : ''
    const loadingSize = size === 'small' ? '30' : 0
    let loadingComponent: JSX.Element | null = null
    if (loading) {
      loadingComponent = (
        <View className='fta-button__icon'>
          <Loading color={loadingColor} size={loadingSize} />
        </View>
      )
      rootClassName = classNames(rootClassName, 'fta-button--icon')
    }

    const webButton = (
      <Button className='fta-button__wxbutton' lang={lang} formType={formType}></Button>
    )

    const button = (
      <Button
        className='fta-button__wxbutton'
        formType={formType}
        openType={openType}
        lang={lang}
        sessionFrom={sessionFrom}
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        sendMessageImg={sendMessageImg}
        showMessageCard={showMessageCard}
        appParameter={appParameter}
        onGetUserInfo={this.onGetUserInfo.bind(this)}
        onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
        onOpenSetting={this.onOpenSetting.bind(this)}
        onError={this.onError.bind(this)}
        onContact={this.onContact.bind(this)}></Button>
    )

    return (
      <View
        className={rootClassName}
        style={mergeStyle(style, customStyle)}
        onClick={this.onClick.bind(this)}>
        {isWEB && !disabled && webButton}
        {isWEAPP && !disabled && (
          <Form onSubmit={this.onSumit.bind(this)} onReset={this.onReset.bind(this)}>
            {button}
          </Form>
        )}
        {isALIPAY && !disabled && button}
        {loadingComponent}
        <Text className={textClassName} style={mergeStyle(textStyle)}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

FTAButton.propTypes = {
  size: PropTypes.oneOf(['normal', 'small']),
  type: PropTypes.oneOf(['primary', 'secondary', '']),
  circle: PropTypes.bool,
  full: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  formType: PropTypes.oneOf(['submit', 'reset', '']),
  openType: PropTypes.oneOf([
    'contact',
    'share',
    'getUserInfo',
    'getPhoneNumber',
    'launchApp',
    'openSetting',
    'feedback',
    'getRealnameAuthInfo',
    'getAuthorize',
    'contactShare',
    '',
  ]),
  lang: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  showMessageCard: PropTypes.bool,
  appParameter: PropTypes.string,
  onGetUserInfo: PropTypes.func,
  onContact: PropTypes.func,
  onGetPhoneNumber: PropTypes.func,
  onError: PropTypes.func,
  onOpenSetting: PropTypes.func,
}

FTAButton.defaultProps = {
  customStyle: {},
  style: {},
  textStyle: {},
}
