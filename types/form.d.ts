import Schema from 'async-validator'
import { CSSProperties, FC, ReactElement, ReactNode } from 'react'
import BaseComponent, { PropsWithChildren } from './base'

type AnyFn = (...args: any[]) => any

export type Align = 'left' | 'center' | 'right'

export type Validator = (
  rule: ValidateRule,
  value: any,
  callback: (message?: string) => void
) => void

export type ValidateCallback = () => void

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

export interface ValidateRule {
  /**
   * 是否必填项
   */
  required?: boolean
  /**
   * 错误提示信息
   */
  message?: string
  /**
   * 自定义校验规则
   */
  validator?: Validator
  /** 当前校验的字段中文名
   * @deprecated
   */
  fieldName?: string
}

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
  onMount?: (ref: FormItemRefMethods) => void
  /**
   * FormItem卸载
   */
  onDestroy?: (ref: FormItemRefMethods) => void
}

export interface FormItemProps
  extends Pick<
      FormProps,
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
    >,
    BaseComponent {
  /**
   * 左侧标题
   */
  label: string
  /**
   * 右侧默认值
   */
  value?: string
  /**
   * 当前字段是否必填
   * @default false
   */
  required?: boolean
  /**
   * 自定义渲染右侧区域
   */
  render?: ReactNode
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
  rules?: ValidateRule[]
  /**
   * 值的最大长度
   */
  maxlength?: number
  /**
   * 是否显示右箭头（可传入自定义节点）
   */
  arrow?: boolean | ReactElement
  /**
   * 标签文字右侧提示, 传入图片URL或自定义渲染
   */
  tooltip?: string | ReactElement
  /**
   * 是否校验错误
   * @default false
   */
  error?: boolean
  /**
   * 校验错误提示信息
   * @default '信息填写错误'
   */
  errorTip?: string
  /**
   * 点击tooltip的回调
   */
  onTooltipClick?: (prop: string) => void
  /**
   * 点击tooltip的全屏提示
   */
  renderTooltip?: ReactNode
  /**
   * input框自动聚焦
   * @default false
   */
  autofocus?: boolean
  /**
   * 自定义右侧显示
   */
  children?: ReactNode
  /**
   * 校验优先级
   * @default 2
   */
  validatePriority?: ValidatePriority[keyof ValidatePriority]
  /**
   * 校验回调
   */
  validator?: (rule: ValidateRule, value?: any, callback?: (val: ?any) => void) => void
  /**
   * 点击内容区域的回调
   */
  onClick?: () => void
  /**
   * 值变化时的回调
   */
  onChange?: (newVal: boolean, oldVal: boolean) => void
  /**
   * 输入框聚焦时的回调
   */
  onFoucs?: () => void
  /**
   * 输入框失焦时的回调
   */
  onBlur?: () => void
}

export interface FormRefMethods {
  /**
   * 手动验证所有表单项，返回一个Promise对象
   */
  validate: (callback: (valid: boolean, failedProps: string[]) => void) => Promise<void>
  /**
   * 手动验证部分表单项，返回一个Promise对象
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
  clearValidate: (props?: string[]) => void
  /**
   * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
   */
  resetFields: () => void
  /**
   * 手动提交表单
   */
  submit: () => void
}

export interface FormItemRefMethods {
  /**
   * 对该表单项进行重置，将其值重置为初始值并移除校验结果
   */
  resetField: () => void
  /**
   * 移除该表单项的校验结果
   */
  clearValidate: () => void

  [key: string]: AnyFn
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

export type ToolTipProps = Pick<
  FormItemProps,
  'tooltip' | 'onTooltipClick' | 'renderTooltip' | 'prop'
>

declare const Tip: FC<TipProps>

declare const FormItem: FC<FormItemProps>

declare const Form: FC<FormProps> & {
  Item: typeof FormItem
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
}

export { Form as default, FormItem }
