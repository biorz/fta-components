import { Image, ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, {
  CSSProperties,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from 'react'
import { isString, noop } from '../../common'
import '../../style/components/form/index.scss'
import {
  Align,
  FormItemProps,
  FormItemRefMethods,
  FormProps,
  FormRefMethods,
  ToolTipProps,
} from '../../types/form'
import { FormConsumer, FormProvider } from './context'

const justifyContentMap: Record<Align, CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

function Form(props: FormProps, ref: Ref<FormRefMethods>): JSX.Element {
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

  useImperativeHandle(ref, () => ({
    validate(callback: (valid: boolean, failedProps: string[]) => void) {
      return Promise.resolve()
    },
    validateField(props: string[], callback: (valid: boolean, failedProps: string[]) => void) {
      return Promise.resolve()
    },
    clearValidate() {},
    resetFields() {},
    submit() {},
  }))
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

function FormItem(props: FormItemProps, ref: Ref<FormItemRefMethods>): JSX.Element {
  const {
    label,
    tooltip,
    renderTooltip,
    prop,
    border,
    children,
    placeholder,
    arrow,
    error,
    readonly,
    align,
    onTooltipClick,
    onClick,
    labelClassName,
    labelStyle,
    contentClassName,
    contentStyle,
  } = props

  // const [error, toggleError] = useState(false)

  useImperativeHandle(ref, () => ({
    resetField() {},
    clearValidate() {},
  }))

  return (
    <FormConsumer>
      {(ctx) => {
        // 内容对其方式
        const _align = align || ctx.align
        // 是否只读
        const _readonly = readonly || (ctx.readonly && readonly !== false)
        // 是否有下方边框线
        const _border = border || (ctx.border && border !== false)
        // 是否可点击
        const _onClick = _readonly ? noop : onClick

        const _labelClassName = classNames(
          'fta-form-item-label',
          ctx.labelClassName,
          labelClassName
        )

        const _contentClassName = classNames(
          'fta-form-item-content',
          ctx.contentClassName,
          arrow && 'fta-form-item-content--arrow',
          contentClassName
        )

        const _labelStyle = { ...ctx.labelStyle, ...labelStyle }

        const _contentStyle = {
          ...(_align ? { justifyContent: justifyContentMap[_align] } : {}),
          ...ctx.contentStyle,
          ...contentStyle,
        }

        const rootClass = classNames('fta-form-item', {
          'fta-form-item--border': _border,
          'fta-form-item--readonly': _readonly,
        })

        const labelTextClass = classNames('fta-form-item-label__text', {
          'fta-form-item-label__text--error': error,
        })
        return (
          <View className={rootClass}>
            {/* label */}
            <View className={_labelClassName} style={_labelStyle}>
              <Text className={labelTextClass}>{label}</Text>
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
              style={_contentStyle}
              className={_contentClassName}
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

function useForm() {}

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
  error: false,
  onClick() {},
}

ToolTip.defaultProps = tooltipDefaultProps

const ForwardForm = forwardRef(Form)

const FowardFormItem = forwardRef(FormItem)

ForwardForm.defaultProps = formDefaultProps

FowardFormItem.defaultProps = formItemDefaultProps

export { ForwardForm as default, FowardFormItem as FormItem }
