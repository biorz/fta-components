import { Button as TaroButton } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import './index.scss'
import { IButtonProps, IButtonState } from './types'

export default class Button extends React.Component<IButtonProps, IButtonState> {
  static defaultProps = {
    size: 'default',
    type: 'primary',
    plain: false,
    disabled: false,
    shape: 'square',
    hoverStartTime: 0,
    hoverStayTime: 50,
    hoverStopPropagation: false,
    hoverClass: '',
    loading: false,
    lang: 'zh',
  }
  render() {
    const {
      size,
      children,
      type,
      plain,
      disabled,
      shape,
      hoverStartTime,
      hoverStayTime,
      formType,
      openType,
      appParameter,
      hoverStopPropagation,
      sendMessageTitle,
      sendMessagePath,
      lang,
      sessionFrom,
      sendMessageImg,
      showMessageCard,
      hoverClass,
      loading,
      customStyle,
      onClick,
      onGetPhoneNumber,
      onGetUserInfo,
      onError,
      onOpenSetting,
      onLaunchapp,
    } = this.props
    let _hoverClass = hoverClass || 'button-hover'
    if (!loading && !disabled && !hoverClass) {
      _hoverClass = plain ? `fta-btn-${type}-plain-hover` : `fta-btn-${type}-hover`
      // console.log(123, _hoverClass)
    }

    const className = classNames('fta-btn', `fta-btn-size-${size}`, `fta-btn--${type}`, {
      [`fta-btn--${type}--plain`]: plain,
      [`fta-btn--${type}--disabled`]: disabled,
      'fta-btn-round-circle': shape === 'circle',
    })
    return (
      <TaroButton
        onClick={onClick}
        className={className}
        style={customStyle}
        hoverStartTime={Number(hoverStartTime)}
        hoverStayTime={Number(hoverStayTime)}
        disabled={disabled}
        formType={formType}
        openType={openType}
        appParameter={appParameter}
        hoverStopPropagation={hoverStopPropagation}
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        lang={lang}
        sessionFrom={sessionFrom}
        sendMessageImg={sendMessageImg}
        showMessageCard={showMessageCard}
        hoverClass={_hoverClass}
        loading={loading}
        onGetPhoneNumber={onGetPhoneNumber}
        onGetUserInfo={onGetUserInfo}
        onError={onError}
        onOpenSetting={onOpenSetting}
        onLaunchapp={onLaunchapp}>
        {children}
      </TaroButton>
    )
  }
}
