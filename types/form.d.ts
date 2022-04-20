import { CommonEvent } from '@tarojs/components/types/common'
import { ComponentClass, ReactElement, ReactNode } from 'react'
import BaseComponent from './base'

declare type FormFunction = (event: CommonEvent) => void

export interface FormProps extends BaseComponent {
  /**
   * 是否返回 formId 用于发送模板消息
   * @default false
   */
  reportSubmit?: boolean
  /**
   * 携带 form 中的数据触发 submit 事件，由于小程序组件化的限制，onSubmit 事件获得的 event 中的 event.detail.value 始终为空对象，开发者要获取数据，可以自行在页面的 state 中获取
   */
  onSubmit?: FormFunction
  /**
   * 表单重置时会触发 reset 事件
   */
  onReset?: FormFunction
}

type Validator = (rule: ValidateRule, value: any, callback: (message?: string) => void) => void

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
}

export type Align = 'center' | 'end' | 'flex-end' | 'flex-start' | 'start'

export interface FormProps {
  /**
   * 校验出错时是否滚动到可是范围内
   * @default true
   */
  scrollIntoView?: boolean
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean
  /**
   * 是否显示下方边框线
   * @default true
   */
  border?: boolean
  /**
   * 右侧对其方式
   */
  align?: Align
  /**
   * 校验规则
   */
  rules: Record<string, ValidateRule>
  /**
   * 提交表单时的回调
   */
  onSubmit?: () => void
}

export interface FormItem
  extends Pick<FormProps, 'scrollIntoView' | 'readonly' | 'border' | 'align'> {
  /**
   * 左侧标题
   */
  label: string
  /**
   * 右侧默认值
   */
  value?: string
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
  rule: Validator
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
   * 点击tooltip的回调
   */
  onTooltipClick: (prop: string) => void
  /**
   * 点击tooltip的全屏提示
   */
  renderTooltip?: ReactElement
  /**
   * input框自动聚焦
   * @default false
   */
  autofocus?: boolean
  /**
   * 自定义内容
   */
  children?: ReactNode
  /**
   * 校验回调
   */
  validator?: (rule: ValidateRule, value?: any, callback?: (val: ?any) => void) => void
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

interface FormRefMethods {
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

interface FormItemRefMethods {
  /**
   * 对该表单项进行重置，将其值重置为初始值并移除校验结果
   */
  resetField: () => void
  /**
   * 移除该表单项的校验结果
   */
  clearValidate: () => void
}

declare const Form: ComponentClass<FormProps>

export default Form
