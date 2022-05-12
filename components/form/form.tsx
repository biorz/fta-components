import { Image, Text, View } from '@tarojs/components'
import AsyncValidator from 'async-validator'
import classNames from 'classnames'
import React, {
  CSSProperties,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Assets, isString, isUndef } from '../../common'
import '../../style/components/form/index.scss'
import {
  Align,
  FormItemProps,
  FormItemRefMethods,
  FormProps,
  FormRefMethods,
  TipProps,
  ToolTipProps,
  ValidatePriority,
  ValidateStatus,
} from '../../types/form'
import { TouchableOpacity } from '../view'
import { FormProvider, useFormConfig } from './context'
import { ScrollIntoView, ScrollView } from './scroll-into-view'

const justifyContentMap: Record<Align, CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

/**
 * 校验优先级
 */
const validatePriority: ValidatePriority = {
  Higher: 0,
  High: 1,
  Normal: 2,
  Low: 3,
  Lower: 4,
}

/**
 * 校验状态
 */
const validateStatus: ValidateStatus = {
  unset: -1,
  error: 0,
  success: 1,
  validating: 2,
}

/**
 * @component
 */
function Form(props: FormProps, ref: Ref<FormRefMethods>): JSX.Element {
  const {
    children,
    title,
    titleAlign,
    customStyle,
    className,
    labelStyle,
    labelClassName,
    contentClassName,
    contentStyle,
    readonly,
    align,
    onMount,
    onDestroy,
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
    <FormProvider
      value={{
        align,
        labelClassName,
        labelStyle,
        contentClassName,
        contentStyle,
        readonly,
        onMount,
        onDestroy,
      }}>
      <ScrollView
        scrollY
        scrollWithAnimation
        scrollX={false}
        className={rootClass}
        style={{ ...style, ...customStyle }}>
        <Title align={titleAlign}>{title}</Title>
        {children}
      </ScrollView>
    </FormProvider>
  )
}

/**
 * @component
 */
function FormItem(props: FormItemProps, ref: Ref<FormItemRefMethods>): JSX.Element {
  const {
    label,
    value,
    tooltip,
    renderTooltip,
    prop,
    children,
    placeholder,
    arrow,
    error,
    errorTip,
    // readonly,
    align,
    onTooltipClick,
    onClick,
    labelClassName,
    labelStyle,
    contentClassName,
    contentStyle,
    readonly,
    rules,
    onMount,
    onDestroy,
  } = props

  const [state, setState] = useState<{
    status: ValidateStatus[keyof ValidateStatus]
    tip: string | undefined
  }>({
    status: validateStatus.unset,
    tip: '',
  })

  const ctx = useFormConfig()

  const model = { ctx }

  const refMethods: FormItemRefMethods = {
    getRules: (_rules) => _rules || rules!,
    getValue() {
      if (value == null && prop && model) {
        return model[prop]
      }
      return value
    },

    scrollIntoView() {},
    highlight(message?: string) {
      refMethods.scrollIntoView()
      setState({
        status: validateStatus.error,
        tip: message || errorTip,
      })
    },
    validate(callback, rules) {
      refMethods.getRules(rules)
    },
    validateAsync() {
      return new Promise((resolve) => refMethods.validate((message) => resolve(message)))
    },
    clearValidate() {
      setState({
        status: validateStatus.unset,
        tip: '',
      })
    },
    // 测试函数
    __test__() {
      console.log(`__test__ executed - label: ${label}`)
    },
  }

  /**
   * 监听FormItem的生命周期
   */
  useEffect(() => {
    ctx.onMount?.(refMethods)
    onMount?.(refMethods)
    return () => {
      ctx.onDestroy?.(refMethods)
      onDestroy?.(refMethods)
    }
  }, [])

  useImperativeHandle(ref, () => refMethods)

  const _align = align || ctx.align
  // TODO: 是否标记为只读
  const _readonly = readonly === false ? false : readonly || ctx.readonly

  const _labelClassName = classNames('fta-form-item-label', ctx.labelClassName, labelClassName)

  const _contentClassName = classNames(
    'fta-form-item-content',
    ctx.contentClassName,
    contentClassName,
    error && 'fta-form-item-content--error'
  )

  const _labelStyle = { ...ctx.labelStyle, ...labelStyle }

  const _contentStyle = {
    ...(_align ? { justifyContent: justifyContentMap[_align] } : {}),
    ...ctx.contentStyle,
    ...contentStyle,
  }

  const rootClass = classNames('fta-form-item')

  const labelTextClass = classNames('fta-form-item-label__text')

  return (
    <ScrollIntoView>
      <View className={rootClass} id={props ? `form-${prop}` : void 0}>
        {/* label */}
        <View className={_labelClassName} style={_labelStyle}>
          <Text className={labelTextClass}>{label}</Text>
          {tooltip ? (
            <ToolTip onTooltipClick={onTooltipClick} renderTooltip={renderTooltip} prop={prop} />
          ) : null}
        </View>
        {/* content */}
        <View
          style={_contentStyle}
          className={_contentClassName}
          onClick={onClick}
          hoverStyle={{ opacity: 0.6 }}
          hoverClass={'fta-form-item-content--hover'}>
          {isUndef(children) ? (
            placeholder ? (
              <Placeholder>{placeholder}</Placeholder>
            ) : null
          ) : isString(children) ? (
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
      {error && errorTip ? (
        <View className='fta-form-item-error'>
          <View className='fta-form-item-error-wrap'>
            <ErrorIcon /> <Text className='fta-form-item-error__text'>{errorTip}</Text>
          </View>
        </View>
      ) : null}
    </ScrollIntoView>
  )
}

/** 标题 */
function Title(props: { children?: ReactNode; align?: Align }): JSX.Element | null {
  const { children: title, align: titleAlign } = props
  return title ? (
    <View className='fta-form-title' style={{ textAlign: titleAlign }}>
      {isString(title) ? (
        <Text className='fta-form-title__text' style={{ textAlign: titleAlign }}>
          {title}
        </Text>
      ) : (
        title
      )}
    </View>
  ) : null
}

/** 弹出层 */
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

/** 占位文本 */
function Placeholder(props: { children: ReactNode }): JSX.Element {
  const { children } = props
  return isString(children) ? (
    <Text className='fta-form-item-placeholder'>{children}</Text>
  ) : (
    (children as ReactElement)
  )
}

/** 箭头 */
function Arrow(): JSX.Element {
  return <Image className='fta-form-item-arrow' src={Assets.arrow.grey}></Image>
}

/** 错误图标 */
function ErrorIcon(): JSX.Element {
  return <Image className='fta-form-item-error-icon' src={Assets.icon.warning}></Image>
}

/** 间隔 */
function Gap(): JSX.Element {
  return <View className='fta-form-item-gap' />
}

/** 重新上传Tip */
function Tip(props: TipProps): JSX.Element {
  const {
    onClick,
    button,
    title,
    className,
    customStyle,
    // @ts-ignore
    style,
  } = props

  const rootClass = classNames('fta-form-tip', className)
  const rootStyle = { ...style, customStyle }

  return (
    <View className={rootClass} style={rootStyle}>
      <View className='fta-form-tip-content'>
        <Image className='fta-form-tip__image' src={Assets.tip.info} />
        {isString(title) ? <Text className='fta-form-tip__text'>{title}</Text> : title}
        {/* button */}
      </View>
      <TouchableOpacity className='fta-form-tip__button' onClick={onClick}>
        <Text className='fta-form-tip__button__text'>{button}</Text>
      </TouchableOpacity>
    </View>
  )
}

Tip.defaultProps = {
  button: '重新上传',
  title: '如需更新证件信息，请重新上传',
}

const tooltipDefaultProps: ToolTipProps = {
  tooltip: '',
  onTooltipClick() {},
  renderTooltip: null,
}

const formDefaultProps: FormProps = {
  model: {},
  titleAlign: 'left',
}

const formItemDefaultProps: FormItemProps = {
  label: '',
  error: false,
  rules: [],
  errorTip: '信息填写错误',
  validatePriority: validatePriority.Normal,
  onClick() {},
}

ToolTip.defaultProps = tooltipDefaultProps

const ForwardForm = forwardRef(Form) as React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<FormRefMethods>
> & {
  Item: typeof FowardFormItem
  Gap: typeof Gap
  Tip: typeof Tip
  ValidatePriority: ValidatePriority
  ValidateStatus: ValidateStatus
  AsyncValidator: typeof AsyncValidator
}

const FowardFormItem = forwardRef(FormItem)

ForwardForm.defaultProps = formDefaultProps

FowardFormItem.defaultProps = formItemDefaultProps

/** Extend Form */

ForwardForm.Item = FowardFormItem

ForwardForm.Gap = Gap

ForwardForm.Tip = Tip

ForwardForm.ValidatePriority = validatePriority

ForwardForm.ValidateStatus = validateStatus

ForwardForm.AsyncValidator = AsyncValidator

export { ForwardForm as default, FowardFormItem as FormItem }
