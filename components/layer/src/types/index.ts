export type IconType = 'success' | 'loading' | 'none'

// toast参数
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

// alert 参数
export interface IAlertProps {
  title?: string
  content?: string
  confirmText?: string
  confirmColor?: string
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}

// confirm 参数
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

// loading参数
export interface ILoadingProps {
  title: string
  mask?: boolean
  success?: (res: any) => void
  fail?: (res: any) => void
  complete?: (res: any) => void
}
