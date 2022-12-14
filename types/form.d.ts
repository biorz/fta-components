import { InputProps } from '@tarojs/components/types/Input'
import Schema, { Rule, RuleItem } from 'async-validator'
import {
  ComponentType,
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
  RefAttributes,
  RefObject,
} from 'react'
import BaseComponent, { PropsWithChildren } from './base'

type AnyFn = (...args: any[]) => any

export type Align = 'left' | 'center' | 'right' | 'between'

export type Callback = (message?: string | null) => void

export type Validator = (
  rule: ValidateRule,
  value: any,
  callback: Callback
) => RuleItem['validator']

export interface ValidateStatus {
  unset: -1
  error: 0
  success: 1
  validating: 2
}

export interface ValidatePriority {
  Higher: 0
  High: 1
  Normal: 2
  Low: 3
  Lower: 4
}

export type ValidateRule = Rule
// {
// /**
//  * 是否必填项
//  */
// required?: boolean
// /**
//  * 错误提示信息
//  */
// message?: string
// /**
//  * 自定义校验规则
//  */
// validator?: Validator
// /** 当前校验的字段中文名
//  * @deprecated
//  */
// fieldName?: string
// }

export interface FormProps extends BaseComponent, PropsWithChildren {
  /**
   * 表单标题
   */
  title?: ReactNode
  /**
   * 标题对其方式
   * @default 'left'
   */
  titleAlign?: Align
  /**
   * 表单绑定的数据流
   */
  model?: Record<string, any>
  /**
   * 校验出错时是否滚动到可视范围内
   * @default true
   */
  scrollIntoView?: boolean
  /**
   * 在设置滚动条位置时使用动画过渡
   * @default false
   */
  // scrollWithAnimation?: boolean
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean
  /**
   * 是否显示下方边框线
   * @default true
   */
  // border?: boolean
  /**
   * 右侧内容区域对其方式
   */
  align?: Align
  /**
   * 校验规则
   */
  rules?: Record<string, ValidateRule>
  /**
   * 提交表单时的回调
   * @todo
   */
  onSubmit?: (form: Record<string, any>) => void
  /**
   * 标签className
   */
  labelClassName?: string
  /**
   * 标签内联样式
   */
  labelStyle?: CSSProperties
  /**
   * 标签文本className
   */
  labelTextClassName?: string
  /**
   * 标签文本内联样式
   */
  labelTextStyle?: CSSProperties
  /**
   * 内容区className
   */
  contentClassName?: string
  /**
   * 内容区内联样式
   */
  contentStyle?: CSSProperties
  /**
   * FormItem挂载
   */
  onMount?: (ref: FormItemRef) => void
  /**
   * FormItem卸载
   */
  onDestroy?: (ref: FormItemRef) => void
  /**
   * 校验时，遇到错误时停止校验后面的选项
   * 默认 校验所有Item
   * @default false
   */
  suspendOnFirstError?: boolean
  /**
   * 占位符文字颜色
   * @supported rn
   * @default '#cccccc'
   */
  placeholderTextColor?: string
  /**
   * 默认的FormItem UI组件
   * @since 1.0.2-alpha.17
   */
  appearance?: ComponentType
}

export interface FormItemProps
  extends Pick<
      FormProps,
      | 'appearance'
      // | 'scrollIntoView'
      | 'readonly'
      // | 'border'
      | 'align'
      | 'labelClassName'
      | 'labelStyle'
      | 'contentClassName'
      | 'contentStyle'
      | 'onMount'
      | 'onDestroy'
      | 'placeholderTextColor'
      | 'labelTextStyle'
      | 'labelTextClassName'
    >,
    BaseComponent {
  /**
   * 左侧标题
   */
  label?: string
  /**
   * 右侧默认值
   */
  value?: string
  /**
   * 对value做处理，页面上实际显示的值
   * 编辑模式下，对输入框组件无效
   */
  format?: (value: string) => string
  /**
   * 当前字段是否必填
   * @default false
   */
  required?: boolean
  /**
   * 空值时的占位文本
   */
  placeholder?: string
  /**
   * 表单项对应的key，请保持表单内唯一性，在校验时会用到
   */
  prop?: string
  /**
   * 校验规则
   */
  rules?: ValidateRule
  /**
   * 是否显示右箭头（可传入自定义节点）
   * 传入arrow='arrow'可实现带箭头的input
   */
  arrow?: boolean | ReactElement | 'arrow'
  /**
   * 点击label弹出的提示，设置为true，则显示icon图标
   */
  tooltip?: ReactNode
  /**
   * 标签文字右侧提示, 传入图片URL或自定义渲染
   */
  tooltipIcon?: string | ReactElement
  /**
   * 是否校验错误
   * @default false
   */
  // error?: boolean
  /**
   * 校验错误提示信息
   * @default '信息填写错误'
   */
  errorTip?: string | null
  /**
   * 整个表单项的点击事件回调
   */
  onItemClick?: () => void
  /**
   * label存在时，点击content区域的回调
   */
  onClick?: () => any
  /**
   * 点击label的回调
   */
  onLabelClick?: () => any
  /**
   * 透传onChange事件
   */
  onChange?: (val: any) => any
  /**
   * 点击tooltip的全屏提示
   */
  tooltip?: ReactNode
  /**
   * label存在时，自定义右侧内容显示
   * label不存在时，自定义FormItem全部样式
   */
  children?: ReactNode | ((props: FormItemChildrenProps) => ReactNode)
  /**
   * 优先级高于children
   * label存在时，自定义右侧内容显示
   * label不存在时，自定义FormItem全部样式
   */
  render?: (props: FormItemChildrenProps) => ReactNode
  /**
   * 校验优先级
   * @default 2
   */
  validatePriority?: ValidatePriority[keyof ValidatePriority]
  /**
   *  内置输入框的props,自定义组件无效
   */
  inputProps?: BuiltinInputProps
  /**
   * 内置输入框的input ref
   */
  inputRef?: Ref<any>
  /**
   * 输入框后缀
   */
  suffix?: ReactNode
  /**
   * 遮挡RN 内置Input框输入时折行，已停用
   * @default '#f9f9f9'
   * @supported rn
   * @depreacted
   */
  hackColor?: string
  /**
   * 自定义UI组件的其他属性
   */
  [key: string]: any
  /**
   * 原生rn input ref
   */
  _nativeRef?: RefObject<HTMLInputElement>
}

export interface StatelessProps {
  /**
   * 当前是否校验出错
   * @default false
   */
  error?: boolean
  /**
   * FormItem本身的ref
   */
  itemRef?: FormItemRef
}

export interface FormItemAppearanceProps
  extends Omit<
      FormItemProps,
      'prop' | 'required' | 'rules' | 'onMount' | 'onDestroy' | 'validatePriority'
    >,
    StatelessProps {
  render?: ReactNode
  children?: ReactNode
}
export interface FormItemChildrenProps
  extends Omit<
      FormItemProps,
      | 'className'
      | 'customStyle'
      | 'render'
      | 'children'
      | 'onLabelClick'
      | 'inputProps'
      | 'labelClassName'
      | 'labelStyle'
      | 'containerClassName'
      | 'containerStyle'
      | 'tooltip'
      | 'tooltipIcon'
      | 'arrow'
      | 'onClick'
      | 'onLabelClick'
      | 'onItemClick'
      | 'onMount'
      | 'onDestroy'
    >,
    StatelessProps {}

export interface FormRefMethods {
  /**
   * 手动验证所有表单项，返回一个Promise对象, true为校验通过
   */
  validate: (
    callback?: (
      isValid: boolean,
      erroredPropMsgPair: Array<[string, string, FormItemRef]>,
      erroredAnonymous: Array<[string, FormItemRef]>
    ) => void
  ) => Promise<boolean>
  /**
   * 根据prop手动高亮FormItem
   */
  highlight: (prop: string, message?: string, scrollIntoView?: boolean) => void
  /**
   * 根据prop获取FormItem
   */
  obtain: (prop: string) => FormItemRef | undefined
  /**
   * 手动验证部分表单项，返回一个Promise对象
   * @todo
   */
  validateField: (
    props: string[],
    callback: (valid: boolean, failedProps: string[]) => void
  ) => Promise<void>
  /**
   * 移除表单项的校验结果。
   * 传入待移除的表单项的 prop 属性或者 prop 组成的数组
   * 如不传则移除整个表单的校验结果
   */
  clearValidate: (prop?: string | string[]) => void
  /**
   * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
   * @todo
   */
  resetFields: () => void
  /**
   * 手动提交表单
   * @todo
   */
  submit: () => void
}

export interface FormItemRefMethods {
  /** @private 表单项绑定的key */
  prop: string
  /** @private 表单校验的优先级 */
  priority: ValidatePriority[keyof ValidatePriority]
  /**
   * 获取校验规则
   */
  getRules: (rules?: ValidateRule) => ValidateRule
  /**
   * 获取当前表单绑定的值
   */
  getValue: () => string | undefined
  /**
   * 滚动到可视区域
   */
  scrollIntoView: () => void
  /**
   * 滚动到可视区域并标记为错误
   */
  highlight: (message?: string, scrollIntoView?: boolean) => void
  /**
   * 校验该表单项
   */
  validate: (callback: Callback, rules?: ValidateRule) => void
  /**
   * 异步校验表单项
   */
  validateAsync: () => Promise<string | null>
  /**
   * 移除该表单项的校验结果
   */
  clearValidate: () => void

  [key: string]: any
}

// export interface FormRadioProps extends BaseComponent {
//   /**
//    * 当前是否选中
//    */
//   value?: boolean
//   /**
//    * 前缀节点
//    */
//   prefix?: ReactNode
//   /**
//    * 后缀节点
//    */
//   suffix?: ReactNode
//   /**
//    * 是否弹出提示
//    */
//   showTooltip?: boolean
//   /**
//    * 位置
//    * @default 'top-lef
//    */
//   placement?: 'top-right' | 'top-left'
//   /**
//    * 点击之后的回调
//    */
//   onChange?: (checked: boolean) => any
// }

export type FormRef = MutableRefObject<FormRefMethods>

export type FormItemRef = MutableRefObject<FormItemRefMethods>

export interface BuiltinInputProps extends InputProps {
  className?: string
  style?: CSSProperties
}

export interface TipProps extends BaseComponent {
  /**
   * 点击按钮时的回调
   */
  onClick?(): void
  /**
   * 按钮文本
   */
  button?: string
  /**
   *
   */
  title?: string
}

export type ToolTipProps = Pick<FormItemProps, 'tooltipIcon'>

export interface captchaProps {
  /**
   * 验证码持续时间，单位秒
   * @default 60
   */
  duration?: number
  /**
   * 文案
   * @default '获取验证码'
   */
  text?: string
  /**
   * 格式化倒计时显示
   * @default ''
   */
  format?(duration: number): string
  /**
   * 自定义样式
   */
  style?: CSSProperties
  /**
   * 类名
   */
  className?: string
  /**
   * 自定义文本样式
   */
  textStyle?: CSSProperties
  /**
   * 文本类名
   */
  textClassName?: string
  /**
   * 点击开始倒计时的回调
   */
  onClick?(): any
}

declare const FormCaptcha: ForwardRefExoticComponent<
  captchaProps &
    RefAttributes<{
      /**
       * 关闭倒计时
       */
      reset(): void
      /**
       * 手动触发倒计时
       */
      countdown(): void
    }>
>

declare const Tip: FC<TipProps>

declare const FormItem: ForwardRefExoticComponent<FormItemProps & RefAttributes<FormItemRefMethods>>

declare const Form: ForwardRefExoticComponent<FormProps & RefAttributes<FormRefMethods>> & {
  Item: typeof FormItem
  /** FormItem UI组件 */
  ItemView: FC<FormItemAppearanceProps>
  /** 内置输入框 */
  Input: FC<BuiltinInputProps>
  /** 间隔槽 */
  Gap: FC<{}>
  /** 重新上传的提示 */
  Tip: typeof Tip
  /** 校验的优先级 */
  ValidatePriority: ValidatePriority
  /** 校验的状态 */
  ValidateStatus: ValidateStatus
  /** 异步校验器 */
  AsyncValidator: typeof Schema
  /** 内置验证码 */
  Captcha: typeof FormCaptcha
}

export { Form as default, FormItem, FormCaptcha }
