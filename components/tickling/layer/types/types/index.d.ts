export declare type IconType = 'success' | 'loading' | 'none'
export interface IToastProps {
  title: string
  icon?: IconType
  image?: string
  duration?: number
  mask?: boolean
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}
export interface IAlertProps {
  title?: string
  content?: string
  confirmText?: string
  confirmColor?: string
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}
export interface IConfirmProps {
  title?: string
  content?: string
  confirmText?: string
  confirmColor?: string
  cancelText?: string
  cancelColor?: string
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}
export interface ILoadingProps {
  title: string
  mask?: boolean
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}
