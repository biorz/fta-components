import { CommonEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import { inRN } from '../../../common'
import '../../../style/components/overlay/index.scss'
import { OverlayProps } from '../../../types/overlay'
import { defaultProps } from './defalut-props'

export default function Overlay(props: OverlayProps) {
  const {
    className,
    // @ts-ignore
    style,
    customStyle,
    fixed,
    zIndex,
    bgColor,
    opacity,
    show,
    children,
    center,
    onClick,
    ...extraProps
  } = props

  const fixedCls = inRN || (fixed && 'fta-overlay--fixed')
  const rootClass = classNames(
    'fta-overlay',
    fixedCls,
    opacity == null || (opacity === 0.5 && 'fta-overlay--anim')
  )
  const rootStyle: CSSProperties = { ...style, ...customStyle }
  const bodyStyle: CSSProperties = {}
  if (opacity) rootStyle.opacity = opacity
  if (zIndex) {
    rootStyle.zIndex = zIndex
    bodyStyle.zIndex = zIndex + 1
  }
  if (bgColor) rootStyle.backgroundColor = bgColor

  const stopPropagation = (evt: CommonEvent) => !inRN && evt.stopPropagation?.()

  const _onClick = (evt: CommonEvent) => {
    stopPropagation(evt)
    onClick?.()
  }

  return show ? (
    <>
      <View {...extraProps} className={rootClass} style={rootStyle} onClick={_onClick} catchMove />
      <View
        // @ts-ignore
        pointerEvents='box-none'
        className={classNames(
          'fta-overlay-container',
          fixedCls,
          center && 'fta-overlay-container--center'
        )}
        style={bodyStyle}
        onClick={stopPropagation}>
        {children}
      </View>
    </>
  ) : null
}

Overlay.defaultProps = defaultProps
