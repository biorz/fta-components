import { Image, ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties, ReactElement, ReactNode, useState } from 'react'
import { isString, noop } from '../../common'
import '../../style/components/form/index.scss'
import { Align, FormItemProps, FormProps, ToolTipProps } from '../../types/form'
import { FormConsumer, FormProvider } from './context'

const justifyContentMap: Record<Align, CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

function Form(props: FormProps): JSX.Element {
  const {
    children,
    border,
    title,
    titleAlign,
    customStyle,
    className,
    readonly,
    align,
    // @ts-ignore
    style,
  } = props
  const rootClass = classNames('fta-form', className)
  return (
    <FormProvider value={{ readonly, border, align }}>
      <ScrollView
        scrollY
        scrollWithAnimation
        scrollX={false}
        className={rootClass}
        style={{ ...style, ...customStyle }}>
        <View className='fta-form-title' style={{ textAlign: titleAlign }}>
          {title ? (
            isString(title) ? (
              <Text className='fta-form-title__text' style={{ textAlign: titleAlign }}>
                {title}
              </Text>
            ) : (
              title
            )
          ) : null}
        </View>
        {children}
      </ScrollView>
    </FormProvider>
  )
}

function FormItem(props: FormItemProps): JSX.Element {
  const {
    label,
    tooltip,
    renderTooltip,
    prop,
    border,
    children,
    placeholder,
    arrow,
    readonly,
    align,
    onTooltipClick,
    onClick,
    labelClassName,
    labelStyle,
  } = props

  return (
    <FormConsumer>
      {(ctx) => {
        const _align = align || ctx.align
        const _readonly = readonly || (ctx.readonly && readonly !== false)
        const _border = border || (ctx.border && border !== false)
        const _onClick = _readonly ? noop : onClick
        const _labelClassName = classNames(
          'fta-form-item-label',
          ctx.labelClassName,
          labelClassName
        )
        const _labelStyle = { ...ctx.labelStyle, ...labelStyle }
        const rootClass = classNames('fta-form-item', {
          'fta-form-item--border': _border,
          'fta-form-item--readonly': _readonly,
        })
        return (
          <View className={rootClass}>
            {/* label */}
            <View className={_labelClassName} style={_labelStyle}>
              <Text className='fta-form-item-label__text'>{label}</Text>
              {tooltip ? (
                <ToolTip
                  onTooltipClick={onTooltipClick}
                  renderTooltip={renderTooltip}
                  prop={prop}
                />
              ) : null}
            </View>
            {/* content */}
            <View
              style={_align ? { justifyContent: justifyContentMap[_align] } : void 0}
              className={classNames(
                'fta-form-item-content',
                arrow && 'fta-form-item-content--arrow'
              )}
              onClick={_onClick}
              hoverStyle={_readonly ? void 0 : { opacity: 0.6 }}
              hoverClass={_readonly ? void 0 : 'fta-form-item-content--hover'}>
              {isString(children) ? (
                !children.length && placeholder ? (
                  <Placeholder>{placeholder}</Placeholder>
                ) : (
                  <Text className='fta-form-item-content__text'>{children}</Text>
                )
              ) : (
                children
              )}
              {arrow ? <Arrow /> : null}
            </View>
          </View>
        )
      }}
    </FormConsumer>
  )
}

function ToolTip(props: ToolTipProps): JSX.Element {
  const [visible, toggle] = useState(false)
  const { tooltip, onTooltipClick, prop, renderTooltip } = props
  return (
    <View
      className='fta-form-item-tooltip'
      onClick={() => {
        onTooltipClick!(prop!)
        toggle(!visible)
      }}>
      {isString(tooltip) ? <Image src={tooltip} /> : tooltip}
      {/* TODO: 全屏modal支持 */}
      {visible ? renderTooltip : null}
    </View>
  )
}

function Placeholder(props: { children: ReactNode }): JSX.Element {
  const { children } = props
  return isString(children) ? (
    <Text className='fta-form-item-placeholder'>{children}</Text>
  ) : (
    (children as ReactElement)
  )
}

function Arrow(): JSX.Element {
  return (
    <Image
      className='fta-form-item-arrow'
      src={'https://image.ymm56.com/boss/2019/0123/1548213446'}></Image>
  )
}

const tooltipDefaultProps: ToolTipProps = {
  tooltip: '',
  onTooltipClick() {},
  renderTooltip: null,
}

const formDefaultProps: FormProps = {
  titleAlign: 'left',
  border: true,
}

const formItemDefaultProps: FormItemProps = {
  label: '',
  onClick() {},
}

Form.defaultProps = formDefaultProps

Form.Item = FormItem

FormItem.defaultProps = formItemDefaultProps

ToolTip.defaultProps = tooltipDefaultProps

export { Form as default, FormItem }
