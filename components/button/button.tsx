import { Button, Form, Text, View } from '@tarojs/components'
import { ButtonProps } from '@tarojs/components/types/Button'
import { BaseEventOrig, CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { inAlipay, inRN, inWeapp, inWeb, isString } from '../../common'
import '../../style/components/button/index.scss'
import { ButtonProps as FTAButtonProps } from '../../types/button'
import Loading from '../loading'

// console.log(Button, _Button, _Button === Button)
const ButtonAdapter = inRN ? Button : View

const SIZE_CLASS = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

const TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  fourth: 'fourth',
}

export default class FTAButton extends Component<FTAButtonProps> {
  public static defaultProps: FTAButtonProps
  public static propTypes: InferProps<FTAButtonProps>

  public constructor(props: FTAButtonProps) {
    super(props)
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

  private get hoverStyle() {
    const { disabled, hoverStyle } = this.props
    return disabled ? undefined : hoverStyle
  }

  private get hoverClass() {
    const { disabled, hoverClassName, type } = this.props
    return disabled ? undefined : classNames(`fta-button--${type}--active`, hoverClassName)
  }

  private onSumit(event: CommonEvent): void {
    if (inWeapp || inWeb) {
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
    if (inWeapp || inWeb) {
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
    // console.log(this.hoverClass, 'this.hoverClass', this.hoverStyle)
    const {
      // @ts-ignore
      size,
      type,
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
      textClassName,
      textStyle,
      className,
      children,
      // @ts-ignore
      style,
    } = this.props

    let rootClassName = classNames(
      'fta-button',
      {
        [`fta-button--${SIZE_CLASS[size!]}`]: SIZE_CLASS[size!],
        [`fta-button--${type}`]: TYPE_CLASS[type!],
        [`fta-button--${size}--circle`]: circle,
        'fta-button--full': full,
      },
      disabled && ['fta-button--disabled', `fta-button--${type}--disabled`],
      className
    )

    const textClass = classNames(
      'fta-button__text',
      `fta-button__text--${SIZE_CLASS[size!] || 'default'}`,
      `fta-button__text--${TYPE_CLASS[type!] || 'default'}`,
      disabled && `fta-button__text--${type}--disabled`,
      loading && `fta-button__text--loading fta-button__text--${type}--loading`,
      textClassName
    )

    const loadingColor = type === 'primary' ? '#fff' : ''
    // const loadingSize = size === 'small' ? '30' : 0
    let loadingComponent: JSX.Element
    if (loading === true) {
      loadingComponent = (
        <View className='fta-button__icon'>
          <Loading color={loadingColor} size={size} useImage />
        </View>
      )
      rootClassName = classNames(rootClassName)
    } else {
      loadingComponent = loading as JSX.Element
    }

    const webButton = (
      <Button
        className='fta-button__wxbutton'
        lang={lang}
        disabled={disabled}
        formType={formType}></Button>
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
      <ButtonAdapter
        disabled={disabled}
        className={rootClassName}
        style={{ ...style, ...customStyle }}
        onClick={this.onClick.bind(this)}
        // @ts-ignore
        hoverClassName={this.hoverClass}
        hoverStyle={this.hoverStyle}
        hoverClass={this.hoverClass}>
        {inWeb && !disabled && webButton}
        {inWeapp && !disabled && (
          <Form onSubmit={this.onSumit.bind(this)} onReset={this.onReset.bind(this)}>
            {button}
          </Form>
        )}
        {inAlipay && !disabled && button}
        {loadingComponent}
        {isString(children) ? (
          <Text className={textClass} style={textStyle}>
            {children}
          </Text>
        ) : (
          children
        )}
      </ButtonAdapter>
    )
  }
}

FTAButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'fourth']),
  circle: PropTypes.bool,
  full: PropTypes.bool,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.object,
  textStyle: PropTypes.object,
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
  textStyle: {},
  type: 'primary',
  // size: 'medium',
  // size: 'medium',
  // circle: false,
}
