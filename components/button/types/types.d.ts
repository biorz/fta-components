import { ButtonProps } from '@tarojs/components/types/Button'
interface IButtonProps extends ButtonProps {
  shape?: string
  customStyle?: object
}
interface IButtonState {}
export { IButtonState, IButtonProps }
