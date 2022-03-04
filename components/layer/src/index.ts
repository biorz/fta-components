import Taro from '@tarojs/taro'
import { IToastProps, IAlertProps, IConfirmProps, ILoadingProps } from './types'

const TOAST_OPTION: IToastProps = {
  title: '',
  icon: 'none',
  image: '',
  duration: 2000,
  mask: false,
  success: () => {},
  fail: () => {},
  complete: () => {},
}

const ALERT_OPTION: IAlertProps = {
  title: '提示',
  content: '',
  confirmText: '确定',
  confirmColor: '#FA871E',
  success: () => {},
  fail: () => {},
  complete: () => {},
}

const CONFIRM_OPTION: IConfirmProps = {
  title: '提示',
  content: '',
  confirmText: '确定',
  confirmColor: '#FA871E',
  cancelText: '取消',
  cancelColor: '#000000',
  success: () => {},
  fail: () => {},
  complete: () => {},
}

const LOADING_OPTION: ILoadingProps = {
  title: '加载中',
  mask: true,
  success: () => {},
  fail: () => {},
  complete: () => {},
}

export default {
  toast(title: string, option?: IToastProps) {
    Taro.hideToast()
    return Taro.showToast({ ...TOAST_OPTION, ...option, title })
  },
  alert(content: string, option?: IAlertProps) {
    return Taro.showModal({ ...ALERT_OPTION, ...option, content, showCancel: false })
  },
  confirm(content: string, option?: IConfirmProps) {
    return Taro.showModal({ ...CONFIRM_OPTION, ...option, content, showCancel: true })
  },
  showLoading(option?: ILoadingProps) {
    Taro.hideLoading()
    return Taro.showLoading({ ...LOADING_OPTION, ...option })
  },
  hideLoading() {
    Taro.hideLoading()
  },
}
