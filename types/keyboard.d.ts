import { CSSProperties, FC } from 'react'
import { ActionSheetProps } from './action-sheet'
import { PropsWithChildren } from './base'

export type KeyboardType = 'id' | 'number' | 'decimal' | 'custom'

export interface KeyboardProps extends Partial<ActionSheetProps> {
  /**
   * 键盘类型
   * @default 'number'
   */
  type?: KeyboardType
  /**
   * 是否显示input框展示输入结果
   * @default true
   */
  input?: boolean
  /**
   * 校验规则正则或函数
   */
  validator?: RegExp | ((result: string) => boolean)
  /**
   * 是否乱序排列
   * @default false
   */
  disorder?: boolean
}
// Pick<
// ActionSheetProps,
// | 'onClose'
// | 'title'
// | 'cancelText'
// | 'confirmText'
// | 'onCancel'
// | 'onConfirm'
// | 'isOpened'
// | 'useNativeModal'
// >
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
  onLongClick?: (val: any, index: number) => void
  /**
   * 按钮激活的样式
   * @supported rn
   */
  hoverStyle?: CSSProperties
  /**
   * 当前键盘项的索引
   * @private
   */
  index?: number
}

/**
 * 空白占位符
 */
declare const Placeholder: FC<{}>

declare const Keyboard: FC<KeyboardProps>

export default Keyboard
