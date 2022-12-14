import { Image, Input, Text, View } from '@tarojs/components'
import AsyncValidator from 'async-validator'
import classNames from 'classnames'
import React, {
  CSSProperties,
  forwardRef,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Assets, inDev, inRN, isArray, isString, isUndef, useEnhancedState } from '../../common'
import '../../style/components/form/index.scss'
import {
  Align,
  BuiltinInputProps,
  FormItemAppearanceProps,
  FormItemProps,
  FormItemRef,
  FormItemRefMethods,
  FormProps,
  FormRefMethods,
  TipProps,
  ToolTipProps,
  ValidatePriority,
  ValidateStatus,
} from '../../types/form'
import { TouchableOpacity } from '../view'
import { FormProvider, Store, useFormConfig } from './context'
import { FullScreen as Modal } from './full-screen'
import { ScrollIntoView, ScrollView } from './scroll-into-view'
import FormCaptcha from './use-captcha'
import { isEmptyRules, omit, parseChildren, uniqueId } from './util'

/**
 *  20220802 新增倒计时hook
 */

const justifyContentMap: Record<Align, CSSProperties['justifyContent']> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  between: 'space-between',
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
/** 是否校验出错 */
const inError = (status: number) => validateStatus.error === status

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
    rules,
    onMount,
    onDestroy,
    suspendOnFirstError,
    // @ts-ignore
    style,
    placeholderTextColor,
    labelTextClassName,
    labelTextStyle,
    appearance,
  } = props

  const [nodeId, scrollIntoView] = useState<string>()
  const [visible, toggleVisible] = useState(false)
  const exampleRef = useRef<ReactNode>()

  const _showModal = (example: ReactNode) => {
    exampleRef.current = example
    toggleVisible(true)
  }

  const store = useRef<Store>({
    __named__: [] as FormItemRef[],
    __anonymous__: [] as FormItemRef[],
  }).current

  const rootClass = classNames('fta-form', className)

  const refMethods: FormRefMethods = {
    async validate(callback) {
      const { __anonymous__, __named__ } = store
      // 获取所有的FormItemMethods
      const itemRefs = __named__.concat(__anonymous__)
      // 根据优先级排序
      itemRefs.sort((a, b) => a.current.priority - b.current.priority)

      const erroredPropMsgPairs = [] as any[]
      const erroredAnonymousPairs = [] as any[]
      let valid = true
      for (const item of itemRefs) {
        const { current: ref } = item
        const errMsg = await ref.validateAsync()
        if (errMsg != null) {
          valid = false
          if (ref.prop) {
            erroredPropMsgPairs.push([errMsg, ref.prop, item])
          } else {
            erroredAnonymousPairs.push([errMsg, item])
          }
          // 校验出错，停止校验
          if (suspendOnFirstError) {
            callback?.(valid, erroredPropMsgPairs, erroredAnonymousPairs)
            return valid
          }
        }
      }
      callback?.(valid, erroredPropMsgPairs, erroredAnonymousPairs)
      return valid
    },
    highlight(prop: string, message?: string, scrollIntoView?: boolean) {
      const ref = refMethods.obtain(prop)
      ref?.current.highlight(message, scrollIntoView)
    },
    obtain(prop) {
      return store.__named__.find((ref) => ref.current.prop === prop)
    },
    clearValidate(props: string | string[]) {
      if (isUndef(props)) {
        const { __named__, __anonymous__ } = store
        __named__.concat(__anonymous__).forEach((ref) => ref.current.clearValidate())
      }
      if (!isArray(props)) {
        props = [props]
      }
      props.forEach((prop) => {
        const ref = refMethods.obtain(prop)
        ref?.current.clearValidate()
      })
    },
    // TODO:
    resetFields() {},
    // TODO:
    validateField(_props: string[], _callback: (valid: boolean, failedProps: string[]) => void) {
      return Promise.resolve()
    },
    // TODO:
    submit() {},
  }

  useImperativeHandle(ref, () => refMethods)

  useEffect(() => {
    !inRN && nodeId && setTimeout(scrollIntoView, 50)
  }, [nodeId])

  return (
    <FormProvider
      value={{
        appearance,
        rules,
        align,
        labelClassName,
        labelStyle,
        contentClassName,
        contentStyle,
        readonly,
        onMount,
        onDestroy,
        scrollIntoView,
        placeholderTextColor,
        labelTextClassName,
        labelTextStyle,
        /** @private */
        store,
        /** @private */
        _showModal,
        /** @private */
        __root__: true,
      }}>
      <ScrollView
        scrollY
        scrollWithAnimation
        scrollX={false}
        className={rootClass}
        scrollIntoView={nodeId}
        // onScroll={onScroll}
        style={{ ...style, ...customStyle }}>
        <Title align={titleAlign}>{title}</Title>
        {children}
      </ScrollView>
      {visible ? (
        <Modal className='fta-form-modal' onClick={() => toggleVisible(false)}>
          <Text className='fta-form-modal__text'>点击任意区域关闭</Text>
          {isString(exampleRef.current) ? (
            <Image src={exampleRef.current} mode='aspectFit' className='fta-form-modal__image' />
          ) : (
            exampleRef.current
          )}
        </Modal>
      ) : null}
    </FormProvider>
  )
}

// FIXME: iOS RN 中 tooltip 图标溢出父容器
// const rnLabelClz = inRN ? 'fta-form-item-label--hack' : null

const initialFormItemState = {
  status: validateStatus.unset,
  message: null,
}

/**
 * @component
 */
function FormItem(props: FormItemProps, ref: Ref<FormItemRefMethods>): JSX.Element {
  const {
    label,
    value,
    required,

    prop,
    children,
    render,
    errorTip,
    // @ts-ignore
    style,
    validatePriority,
    align,

    readonly,
    rules,
    onMount,
    onDestroy,
    onItemClick,
    appearance,

    /* exclude props */

    // prop,
    // value,
    // required,
    // rules,
    // onMount,
    // onDestroy,
    // validatePriority,

    /* unused props */

    // tooltip,
    // tooltipIcon,
    // onLabelClick,
    // onClick,
    // labelClassName,
    // labelStyle,
    // contentClassName,
    // contentStyle,
    // placeholder,
    // arrow,
    // className,
    // customStyle,
  } = props

  const _children = render || children

  const scrollRef = useRef<any>()
  const ctx = useFormConfig()
  const model = { ctx }

  const Appearance = appearance || ctx.appearance!

  const formItemId = useRef(
    inRN ? void 0 : prop ? `fta-form-item-${prop}` : uniqueId('fta-form-item-')
  ).current

  const [state, setState] = useEnhancedState<{
    status: ValidateStatus[keyof ValidateStatus]
    message: string | null
  }>(initialFormItemState)

  const refMethods: FormItemRefMethods = {
    prop: prop!,
    priority: validatePriority!,
    getRules: (_rules) => _rules || rules || (prop && ctx.rules![prop]) || [],
    getValue() {
      if (value == null && prop && model) {
        return model[prop]
      }
      return value
    },
    scrollIntoView() {
      inRN ? scrollRef.current.scrollIntoView?.() : ctx.scrollIntoView!(formItemId!)
    },
    highlight(message?: string, scrollIntoView = true) {
      setState({
        status: validateStatus.error,
        message: message || errorTip,
      })
      scrollIntoView && setTimeout(methodsRef.current.scrollIntoView, 200)
    },
    validate(callback, rules) {
      rules = refMethods.getRules(rules)
      if (isEmptyRules(rules) && isUndef(required)) {
        callback()
        return
      }
      setState('status', validateStatus.validating)
      const key = prop || 'value'
      const descriptor = {
        [key]: rules,
      }
      const model = {
        [key]: refMethods.getValue(),
      }
      const validator = new AsyncValidator(descriptor)

      validator.validate(model, { firstFields: true }, (errors) => {
        const status = errors ? validateStatus.error : validateStatus.success
        const message = errors?.[0]?.message || null
        setState({ status, message })
        callback(message)
      })
    },
    validateAsync() {
      return new Promise((resolve) => refMethods.validate((message) => resolve(message!)))
    },
    clearValidate() {
      setState(initialFormItemState)
    },
  }

  const methodsRef = useRef(refMethods)

  const errored = inError(state.status)

  // 保证能取到最新的refMethods
  useEffect(() => {
    methodsRef.current = refMethods
  })

  /**
   * 监听FormItem的生命周期
   */
  useEffect(() => {
    if (inDev && !ctx.__root__) {
      console.log(
        `[FTA View Warning]: FormItem ${label ? label : prop ? prop : ''} 没有被Form包裹，请检查`
      )
    }
    // collect dep
    const key = prop ? '__named__' : '__anonymous__'
    ctx.store[key].push(methodsRef)

    ctx.onMount?.(methodsRef)
    onMount?.(methodsRef)

    return () => {
      // remove dep
      const i = ctx.store[key].indexOf(methodsRef)
      if (i > -1) ctx.store[key].splice(i, 1)

      ctx.onDestroy?.(methodsRef)
      onDestroy?.(methodsRef)
    }
  }, [])

  useImperativeHandle(ref, () => refMethods)

  const _align = align || ctx.align
  // 是否标记为只读
  const _readonly = readonly === false ? false : readonly || ctx.readonly

  const getParsedChildren = () =>
    parseChildren(
      _children,
      omit(
        {
          ...props,
          align: _align,
          readonly: _readonly,
          error: errored,
          errorTip: state.message,
          itemRef: methodsRef,
        },
        [
          // 删除一些常用的属性，提升性能
          'className',
          'customStyle',
          'onClick',
          'onMount',
          'onDestroy',
          'inputProps',
          'render',
          'children',
        ]
      )
    )

  if (isUndef(label)) {
    return (
      <ScrollIntoView ref={inRN ? scrollRef : void 0} id={formItemId}>
        <View onClick={onItemClick}>{getParsedChildren()}</View>
      </ScrollIntoView>
    )
  }
  return (
    <ScrollIntoView ref={inRN ? scrollRef : void 0} id={formItemId}>
      <Appearance
        {...omit({ ...props, error: errored, errorTip: state.message, itemRef: methodsRef }, [
          'prop',
          // 'value',
          // 'required',
          'rules',
          'onMount',
          'onDestroy',
          'validatePriority',
        ])}>
        {getParsedChildren()}
      </Appearance>
    </ScrollIntoView>
  )
}

/** FormItem UI容器 */
function FormItemAppearance(props: FormItemAppearanceProps) {
  const ctx = useFormConfig()
  const {
    label,
    className,
    customStyle,
    tooltip,
    tooltipIcon,
    itemRef,
    children,
    render,
    // prop,
    value,
    format,
    required,
    // rules,
    // onMount,
    // onDestroy,
    // validatePriority,
    readonly,
    placeholder,
    arrow,
    // @ts-ignore
    style,
    error,
    errorTip,
    align,
    onLabelClick,
    onClick,
    onItemClick,
    labelClassName,
    labelStyle,
    contentClassName,
    contentStyle,
    inputRef,
    inputProps,
    placeholderTextColor,
    // hackColor,
    suffix,
    labelTextStyle,
    labelTextClassName,
    _nativeRef,
  } = props

  const _inputRef = useRef<any>()

  const _children = render || children

  const _align = align || ctx.align
  // TODO: 是否标记为只读
  const _readonly = readonly === false ? false : readonly || ctx.readonly

  const readonlyFn = (fn: ((...args: any) => any) | undefined) => (_readonly ? void 0 : fn)

  const rootClass = classNames('fta-form-item', className)
  const rootStyle = { ...style, ...customStyle }

  const _labelClassName = classNames(
    'fta-form-item-label',
    // tooltip && rnLabelClz,
    ctx.labelClassName,
    labelClassName
  )

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

  const _labelTextClass = classNames(
    'fta-form-item-label__text',
    ctx.labelTextClassName,
    labelTextClassName
  )

  const _labelTextStyle = { ...ctx.labelTextStyle, ...labelTextStyle }

  // WARNING: 必须先执行onLabelClick事件（DONE!）
  const _onLabelCick = () => {
    if (onLabelClick?.() !== false && tooltip) {
      ctx._showModal!(tooltip)
    }
  }

  const _onContentClick = () => {
    if (onClick?.() !== false) {
      inRN && _inputRef.current?.focus?.()
    }
  }

  const labelHoverClass =
    !_readonly && (tooltip || onLabelClick) ? 'fta-form-item-content--hover' : void 0

  const contentHoverClass = _readonly ? void 0 : 'fta-form-item-content--hover'

  const placeholderColor = placeholderTextColor || ctx.placeholderTextColor

  const _value = itemRef?.current.getValue() || value

  const _formatValue = format ? format(_value as string) : _value

  const alignStyle: CSSProperties = {
    textAlign: _align === 'between' ? 'left' : _align || 'right',
  }

  return (
    <>
      <View className={rootClass} style={rootStyle} onClick={readonlyFn(onItemClick)}>
        {/* ========== label area==========*/}
        <View
          className={_labelClassName}
          style={_labelStyle}
          onClick={readonlyFn(_onLabelCick)}
          hoverClass={labelHoverClass}
          // @ts-ignore
          hoverClassName={labelHoverClass}>
          {required && !_readonly ? <Text className='fta-form-item-label__required'>*</Text> : null}
          <Text className={_labelTextClass} style={_labelTextStyle}>
            {label}
          </Text>
          {tooltip && !_readonly ? <ToolTip tooltipIcon={tooltipIcon} /> : null}
        </View>
        {/* ========== content area =========== */}
        <View
          style={_contentStyle}
          className={_contentClassName}
          onClick={readonlyFn(_onContentClick)}
          //@ts-ignore
          hoverClassName={contentHoverClass}
          hoverClass={contentHoverClass}>
          {/* && !isUndef(itemRef?.current.getValue() || value) */}
          {
            _children == null ? (
              _readonly || (arrow && arrow !== 'arrow') ? (
                // 加入placeholder
                (_formatValue == null || !String(_formatValue).length) &&
                placeholder &&
                !_readonly ? (
                  <Placeholder style={alignStyle}>{placeholder}</Placeholder>
                ) : (
                  <Text style={alignStyle} className='fta-form-item-content__text'>
                    {_formatValue}
                  </Text>
                )
              ) : (
                <Fragment>
                  <BuiltinInput
                    // @ts-ignore
                    ref={inputRef}
                    _nativeRef={(ref) => {
                      _inputRef.current = ref
                      // 暴露出ref引用
                      if (_nativeRef) {
                        _nativeRef.current = ref
                      }
                    }}
                    placeholder={placeholder}
                    style={alignStyle}
                    value={_value}
                    // @ts-ignore
                    placeholderTextColor={placeholderColor}
                    {...inputProps}
                  />

                  {/* <HackView color={hackColor} /> */}
                </Fragment>
              )
            ) : isString(_children) ? (
              !_children.length && placeholder && !_readonly ? (
                <Placeholder style={alignStyle}>{placeholder}</Placeholder>
              ) : (
                <Text style={alignStyle} className='fta-form-item-content__text'>
                  {_children}
                </Text>
              )
            ) : (
              _children
            )

            // isUndef(_children) ? (
            //   placeholder && !_readonly ? (
            //     <Placeholder>{placeholder}</Placeholder>
            //   ) : null
            // ) :
          }
          {isString(suffix) ? (
            <Text className='fta-form-item-content__suffix'>{suffix}</Text>
          ) : (
            suffix
          )}
          {arrow && !_readonly ? isValidElement(arrow) ? arrow : <Arrow /> : null}
        </View>
      </View>
      {/* 套了一个View标签，解决Taro H5 顺序颠倒 */}
      <View>
        {error && errorTip ? (
          <View className='fta-form-item-error'>
            <View className='fta-form-item-error-wrap'>
              <ErrorIcon /> <Text className='fta-form-item-error__text'>{errorTip}</Text>
            </View>
          </View>
        ) : null}
      </View>
    </>
  )
}

/** 标题 */
function Title(props: {
  children?: ReactNode
  align?: Exclude<Align, 'between'>
}): JSX.Element | null {
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

/** 提示图标 */
function ToolTip(props: ToolTipProps): JSX.Element {
  const { tooltipIcon } = props
  return isString(tooltipIcon) ? (
    <Image className='fta-form-item-tooltip' src={tooltipIcon} />
  ) : (
    tooltipIcon!
  )
}

/** 内置输入框 */
const BuiltinInput = forwardRef(function _BuiltinInput(props: BuiltinInputProps, ref: Ref<any>) {
  const { className, style, placeholderClass, value, ...extraProps } = props
  const isEmpty = value == null || (isString(value) && !value.length)
  const rootClass = classNames(
    'fta-form-item-input',
    'fta-form-item-content__text',
    isEmpty && 'fta-form-item-input--empty',
    inRN || 'fta-form-item-input--nrn',
    className
  )
  const placeClass = classNames('fta-form-item-placeholder', placeholderClass)
  return (
    <Input
      // @ts-ignore
      numberOfLines={1}
      className={rootClass}
      style={style}
      placeholderClass={placeClass}
      value={value}
      ref={ref}
      {...extraProps}
    />
  )
})

/** rn input hack,遮挡住第二行 */
// function HackView(props: { color?: string }): JSX.Element | null {
//   if (inRN) {
//     return (
//       <View
//         style={props.color ? { backgroundColor: props.color } : void 0}
//         className='fta-form-item-input-hack'
//         // @ts-ignore
//         pointerEvents='none'
//       />
//     )
//   }
//   return null
// }

/** 占位文本 */
function Placeholder(props: { children: ReactNode; style?: CSSProperties }): JSX.Element {
  const { children, style } = props
  return isString(children) ? (
    <Text style={style} className='fta-form-item-placeholder'>
      {children}
    </Text>
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

// TODO:单选框组件
// function Radio(props: FormRadioProps) {
//   const { value, style, customStyle, className } = props
// }

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
  tooltipIcon: Assets.icon.question,
}

const formDefaultProps: FormProps = {
  placeholderTextColor: '#cccccc',
  rules: {},
  model: {},
  titleAlign: 'left',
  appearance: FormItemAppearance,
}

const formItemDefaultProps: FormItemProps = {
  placeholderTextColor: '#cccccc',
  validatePriority: validatePriority.Normal,
  onClick() {},
}

ToolTip.defaultProps = tooltipDefaultProps

const ForwardForm = forwardRef(Form) as React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<FormRefMethods>
> & {
  Item: typeof FowardFormItem
  ItemView: typeof FormItemAppearance
  Input: typeof BuiltinInput
  Gap: typeof Gap
  Tip: typeof Tip
  ValidatePriority: ValidatePriority
  ValidateStatus: ValidateStatus
  AsyncValidator: typeof AsyncValidator
  Captcha: typeof FormCaptcha
}

const FowardFormItem = forwardRef(FormItem)

ForwardForm.defaultProps = formDefaultProps

FowardFormItem.defaultProps = formItemDefaultProps

FormItemAppearance.defaultProps = {
  errorTip: '信息填写错误',
}

/** Extend Form */

ForwardForm.Item = FowardFormItem

ForwardForm.Captcha = FormCaptcha

ForwardForm.ItemView = FormItemAppearance

ForwardForm.Input = BuiltinInput

ForwardForm.Gap = Gap

ForwardForm.Tip = Tip

ForwardForm.ValidatePriority = validatePriority

ForwardForm.ValidateStatus = validateStatus

ForwardForm.AsyncValidator = AsyncValidator

export { ForwardForm as default, FowardFormItem as FormItem }
