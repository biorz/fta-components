import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { Component } from 'react'
import { Assets, isString } from '../../../common'
import '../../../style/components/action-sheet/header.scss'
import { ActionSheetHeaderProps, CustomTitle } from '../../../types/action-sheet'

export default class ActionSheetHeader extends Component<ActionSheetHeaderProps> {
  public render(): JSX.Element {
    const { children, className } = this.props
    const noBorder = children && (children as CustomTitle).border === false

    const isComplexType =
      children && ((children as CustomTitle).title || (children as CustomTitle).icon)

    const isSimpleType =
      children && (children as CustomTitle).icon && !(children as CustomTitle).title

    const classObject = {
      'fta-action-sheet__header--complex': isComplexType,
      'fta-action-sheet__header--no-title': isSimpleType,
      'fta-action-sheet__header--no-border': noBorder,
    }
    const rootClass = classNames('fta-action-sheet__header', classObject, className)

    let fragment
    let icon = null
    if (isString(children)) {
      // 字符串直接展示标题
      fragment = <Text className='fta-action-sheet__header__text'>{children}</Text>
    } else if (isComplexType) {
      const {
        title,
        confirmText,
        cancelText,
        onCancel,
        onConfirm,
        icon,
        confirmTextClassName,
        confirmTextStyle,
        cancelTextClassName,
        cancelTextStyle,
      } = children as CustomTitle
      fragment = (
        <>
          {isString(cancelText) && !icon ? (
            <Text
              className={classNames('fta-action-sheet__header-cancel', cancelTextClassName)}
              style={cancelTextStyle}
              onClick={onCancel}>
              {cancelText}
            </Text>
          ) : icon ? null : (
            cancelText
          )}
          {isString(title) ? <Text className='fta-action-sheet__header-text'>{title}</Text> : title}
          {isString(confirmText) && !icon ? (
            <Text
              className={classNames('fta-action-sheet__header-confirm', confirmTextClassName)}
              style={confirmTextStyle}
              onClick={onConfirm}>
              {confirmText}
            </Text>
          ) : icon ? null : (
            confirmText
          )}
          {icon === true || isString(icon) ? (
            <Image
              className='fta-action-sheet__header-close'
              src={isString(icon) ? icon || Assets.close.default : Assets.close.default}
              onClick={onCancel}
            />
          ) : (
            icon
          )}
        </>
      )
    } else {
      fragment = children
    }

    return (
      <View className={rootClass}>
        {fragment}
        {icon}
      </View>
    )
  }
}
