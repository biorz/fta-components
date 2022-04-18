import { CSSProperties, FC, ReactNode } from 'react'
import { ActionSheetProps } from './action-sheet'
import { PropsWithChildren } from './base'

export type KeyboardType = 'id' | 'number' | 'decimal' | 'custom'

/**
 * typing 为true表示在输入过程中， 为false则表示点击确定按钮时
 */
export type Validator = RegExp | ((result: string, typing?: boolean) => boolean)

export interface KeyboardProps extends Partial<ActionSheetProps> {
  /**
   * 默认值，组件接受后被转成字符串类型
   * @default ''
   */
  value?: string | number
  /**
   * 是否是受控组件，不执行校验
   * @default false
   */
  controlled?: boolean
  /**
   * 键盘类型
   * @default 'number'
   */
  type?: KeyboardType
  /**
   * 提示文本
   */
  placeholder?: string
  /**
   * 可输入的最大长度
   * @default 140
   */
  maxlength?: number
  /**
   * 是否显示input框展示输入结果
   * @default true
   */
  showInputBox?: boolean
  /**
   * 校验规则正则或函数
   */
  validator?: Validator
  /**
   * 是否乱序排列
   * @default false
   */
  disorder?: boolean
  /**
   * 自定义键盘列表，仅在 type='custom'时生效
   */
  customButtons?: (string | number)[]
  /**
   * 自定义渲染区域，仅在 type='custom' 时生效
   */
  children?: ReactNode
  /**
   * 绑定值改变时
   */
  onChange?: (newVal: string, oldVal: string) => void
  /**
   * 点击确定按钮时的回调
   */
  onConfirm?: (val: string, valid: boolean) => void
}

export interface KeyboardButtonProps extends PropsWithChildren {
  /**
   * 当前键盘项绑定的值
   */
  val?: any
  /**
   * 点击回调
   */
  onClick?: (val: any, index: number) => void
  /**
   * 长按回调
   */
  // onLongClick?: (val: any, index: number) => void
  /**
   * 按钮激活的样式
   * @supported rn
   */
  hoverStyle?: CSSProperties
  /**
   * 当前键盘项的索引
   * @private
   */
  _index?: number
}

/**
 * 空白占位符
 */
declare const Placeholder: FC<{}>

/**
 * 键盘按钮
 */
declare const KeyboardButton: FC<KeyboardButtonProps>

/**
 * 默认的删除按钮
 */
declare const DeleteButton: FC<{}>

interface Validators {
  number: Validator
  id: Validator
  decimal: Validator
  phone: Validator
}

declare const Keyboard: FC<KeyboardProps> & {
  Button: typeof KeyboardButton
  Placeholder: typeof Placeholder
  DeleteButton: typeof DeleteButton
  validators: Validators
}

export default Keyboard
