import { Image, Text, View } from '@tarojs/components'
import AsyncValidator from 'async-validator'
import classNames from 'classnames'
import React, {
  CSSProperties,
  forwardRef,
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Assets, inRN, isString, isUndef, useEnhancedState } from '../../common'
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
import { FormProvider, Store, useFormConfig } from './context'
import { FullScreen as Modal } from './full-screen'
import { ScrollIntoView, ScrollView } from './scroll-into-view'
import { isEmptyRules, uniqueId } from './util'

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
  } = props

  // const keysFn = useRef(cache(uniqueId, {})).current

  const [nodeId, scrollIntoView] = useState<string>()
  const [visible, toggleVisible] = useState(false)
  const exampleRef = useRef<ReactNode>()

  const _showModal = (example: ReactNode) => {
    exampleRef.current = example
    toggleVisible(true)
  }

  const store = useRef<Store>({
    __anonymous__: [] as MutableRefObject<FormItemRefMethods>[],
  }).current

  const rootClass = classNames('fta-form', className)

  const refMethods: FormRefMethods = {
    async validate(callback) {
      const { __anonymous__, ...named } = store
      // 获取所有的FormItemMethods
      const itemRefs = __anonymous__.concat(
        Object.values(named as Record<string, MutableRefObject<FormItemRefMethods>>)
      )
      // 根据优先级排序
      itemRefs.sort((a, b) => a.current.priority - b.current.priority)

      const erroredProps = [] as string[]
      let invalid = false
      for (const { current: ref } of itemRefs) {
        const errMsg = await ref.validateAsync()
        if (errMsg) {
          invalid = true
          ref.prop && erroredProps.push(ref.prop)
          // 校验出错，停止校验
          if (suspendOnFirstError) {
            callback?.(invalid, erroredProps)
            return true
          }
        }
      }
      callback?.(invalid, erroredProps)
      return false
    },
    highlight(prop: string) {
      const ref = refMethods.obtain(prop)
      ref?.current.highlight()
    },
    obtain(prop) {
      return store[prop] as MutableRefObject<FormItemRefMethods> | undefined
    },
    clearValidate() {},
    resetFields() {},
    validateField(props: string[], callback: (valid: boolean, failedProps: string[]) => void) {
      return Promise.resolve()
    },
    submit() {},
  }

  useImperativeHandle(ref, () => refMethods)

  useEffect(() => {
    !inRN && nodeId && setTimeout(scrollIntoView, 50)
  }, [nodeId])

  return (
    <FormProvider
      value={{
        rules,
        store,
        align,
        labelClassName,
        labelStyle,
        contentClassName,
        contentStyle,
        readonly,
        onMount,
        onDestroy,
        scrollIntoView,
        _showModal,
        // _keys: keysFn,
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
const rnLabelClz = inRN ? 'fta-form-item-label--hack' : null

/**
 * @component
 */
function FormItem(props: FormItemProps, ref: Ref<FormItemRefMethods>): JSX.Element {
  const {
    label,
    value,
    required,
    tooltip,
    tooltipIcon,
    prop,
    children,
    placeholder,
    arrow,
    error,
    errorTip,
    validatePriority,
    // readonly,
    align,
    onLabelClick,
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

  const scrollRef = useRef<any>()
  const ctx = useFormConfig()
  const model = { ctx }

  const formItemId = useRef(
    inRN ? void 0 : prop ? `fta-form-item-${prop}` : uniqueId('fta-form-item-')
  ).current

  const [state, setState] = useEnhancedState<{
    status: ValidateStatus[keyof ValidateStatus]
    message: string | undefined
  }>({
    status: validateStatus.unset,
    message: '',
  })

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
      inRN ? scrollRef.current.scrollIntoView() : ctx.scrollIntoView!(formItemId!)
    },
    highlight(message?: string) {
      setState({
        status: validateStatus.error,
        message: message || errorTip,
      })
      setTimeout(methodsRef.current.scrollIntoView, 200)
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
        const message = errors?.[0]?.message || ''
        setState({ status, message })
        callback(message)
      })
    },
    validateAsync() {
      return new Promise((resolve) => refMethods.validate((message) => resolve(message)))
    },
    clearValidate() {
      setState({
        status: validateStatus.unset,
        message: '',
      })
    },
    // 测试函数
    __test__() {
      console.log(`__test__ executed - label: ${label}`)
    },
  }

  const methodsRef = useRef(refMethods)

  // 保证能取到最新的refMethods
  useEffect(() => {
    methodsRef.current = refMethods
  })

  /**
   * 监听FormItem的生命周期
   */
  useEffect(() => {
    if (prop) {
      ctx.store[prop] = methodsRef
    } else {
      ctx.store.__anonymous__.push(methodsRef)
    }
    ctx.onMount?.(methodsRef)
    onMount?.(methodsRef)

    return () => {
      if (prop) {
        delete ctx.store[prop]
      } else {
        const i = ctx.store.__anonymous__.indexOf(methodsRef)
        if (i > -1) ctx.store.__anonymous__.splice(i, 1)
      }
      ctx.onDestroy?.(methodsRef)
      onDestroy?.(methodsRef)
    }
  }, [])

  useImperativeHandle(ref, () => refMethods)

  if (isUndef(label)) {
    return <View>{children} </View>
  }

  const _align = align || ctx.align
  // TODO: 是否标记为只读
  const _readonly = readonly === false ? false : readonly || ctx.readonly

  const _labelClassName = classNames(
    'fta-form-item-label',
    tooltip && rnLabelClz,
    ctx.labelClassName,
    labelClassName
  )

  const _contentClassName = classNames(
    'fta-form-item-content',
    ctx.contentClassName,
    contentClassName,
    inError(state.status) && 'fta-form-item-content--error'
  )

  const _labelStyle = { ...ctx.labelStyle, ...labelStyle }

  const _contentStyle = {
    ...(_align ? { justifyContent: justifyContentMap[_align] } : {}),
    ...ctx.contentStyle,
    ...contentStyle,
  }

  const rootClass = classNames('fta-form-item')

  const labelTextClass = classNames('fta-form-item-label__text')

  const _onLabelCick = () => {
    if (!_readonly && tooltip && onLabelClick?.() !== false) {
      ctx._showModal!(tooltip)
    }
  }

  const labelHoverClass =
    !_readonly && (tooltip || onLabelClick) ? 'fta-form-item-content--hover' : void 0

  const contentHoverClass = _readonly ? void 0 : 'fta-form-item-content--hover'
  return (
    <ScrollIntoView ref={inRN ? scrollRef : void 0} id={formItemId}>
      <View className={rootClass}>
        {/* ========== label area==========*/}
        <View
          className={_labelClassName}
          style={_labelStyle}
          onClick={_onLabelCick}
          hoverClass={labelHoverClass}
          // @ts-ignore
          hoverClassName={labelHoverClass}>
          <Text className={labelTextClass}>{label}</Text>
          {tooltip && !_readonly ? <ToolTip tooltipIcon={tooltipIcon} /> : null}
        </View>
        {/* ========== content area =========== */}
        <View
          style={_contentStyle}
          className={_contentClassName}
          onClick={onClick}
          //@ts-ignore
          hoverClassName={contentHoverClass}
          hoverClass={contentHoverClass}>
          {isUndef(children) ? (
            placeholder && !_readonly ? (
              <Placeholder>{placeholder}</Placeholder>
            ) : null
          ) : isString(children) ? (
            !children.length && placeholder && !_readonly ? (
              <Placeholder>{placeholder}</Placeholder>
            ) : (
              <Text className='fta-form-item-content__text'>{children}</Text>
            )
          ) : (
            children
          )}
          {arrow && !_readonly ? <Arrow /> : null}
        </View>
      </View>
      {/* 套了一个View标签，解决Taro H5 顺序颠倒 */}
      <View>
        {inError(state.status) && state.message ? (
          <View className='fta-form-item-error'>
            <View className='fta-form-item-error-wrap'>
              <ErrorIcon /> <Text className='fta-form-item-error__text'>{state.message}</Text>
            </View>
          </View>
        ) : null}
      </View>
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

/** 提示图标 */
function ToolTip(props: ToolTipProps): JSX.Element {
  const { tooltipIcon } = props
  return isString(tooltipIcon) ? (
    <Image className='fta-form-item-tooltip' src={tooltipIcon} />
  ) : (
    tooltipIcon!
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
  tooltipIcon: Assets.icon.question,
}

const formDefaultProps: FormProps = {
  rules: {},
  model: {},
  titleAlign: 'left',
}

const formItemDefaultProps: FormItemProps = {
  // label: '',
  error: false,
  // rules: [],
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
