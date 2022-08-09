import { getSystemInfoSync } from '@tarojs/taro'

/** 当前是否是开发环境 */
export const inDev = process.env.NODE_ENV === 'development'
/** 当前运行的容器 */
export const TARO_ENV = process.env.TARO_ENV
/** 是否运行在RN */
export const inRN = TARO_ENV === 'rn'
/** 是否运行在H5 */
export const inWeb = TARO_ENV === 'h5' || TARO_ENV === 'mw'
/** 是否运行在微前端 @since 1.0.3-beta.4 */
export const inMw = TARO_ENV === 'mw'
/** 是否运行在微信小程序 */
export const inWeapp = TARO_ENV === 'weapp'
/** 是否运行在阿里小程序 */
export const inAlipay = TARO_ENV === 'alipay'
/** 系统相关信息 */
export const systemInfo = getSystemInfoSync()
/** 像素比 */
export const deviceRatio = systemInfo.windowWidth / 720
/** 统一尺寸后缀 */
export const px = inRN ? (size: number) => size : (size: number) => size && `${size}px`
/** 自动缩放  */
export const autoFix = (size: number) => size * deviceRatio
/** 自动缩放  */
export const scale = (size: number) => px(autoFix(size))
/** 当前是否是苹果系统 */
export const inIOS = systemInfo.platform === 'ios'
/** 当前是否处于iPhone环境 native和web */
export const inIPhone =
  systemInfo.system === 'iOS' ||
  systemInfo.brand === 'iPhone' ||
  systemInfo.model === 'iPhone' ||
  inIOS
/** 当前是否是iPhone刘海屏 */
export const inNotch = inIPhone && (systemInfo.screenHeight >= 812 || systemInfo.screenWidth >= 812)
/** 当前是否是安卓系统 */
export const inAndroid = systemInfo.platform === 'android'
