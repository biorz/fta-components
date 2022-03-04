import Taro from '@tarojs/taro'
import { IToastProps, IAlertProps, IConfirmProps, ILoadingProps } from './types'
declare const _default: {
  toast(title: string, option?: IToastProps): Promise<TaroGeneral.CallbackResult>
  alert(content: string, option?: IAlertProps): Promise<Taro.showModal.SuccessCallbackResult>
  confirm(content: string, option?: IConfirmProps): Promise<Taro.showModal.SuccessCallbackResult>
  showLoading(option?: ILoadingProps): Promise<TaroGeneral.CallbackResult>
  hideLoading(): void
}
export default _default
