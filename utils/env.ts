import { getSystemInfoSync } from '@tarojs/taro'

/** 当前运行的容器 */
export const TARO_ENV = process.env.TARO_ENV
/** 是否运行在RN */
export const inRN = TARO_ENV === 'rn'
/** 是否运行在H5 */
export const inWeb = TARO_ENV === 'h5'
/** 是否运行在微信小程序 */
export const inWeapp = TARO_ENV === 'weapp'
/** 系统相关信息 */
export const systemInfo = getSystemInfoSync()
/** 像素比 */
export const deviceRatio = systemInfo.screenWidth / 375
/** 统一尺寸后缀 */
export const px = inRN ? (size: number) => size : (size: number) => size && `${size}px`
/** 自动缩放  */
export const autoFix = (size: number) => size * deviceRatio
/** 自动缩放  */
export const scale = (size: number) => px(autoFix(size))
/** 当前是否是苹果系统 */
export const inIOS = systemInfo.platform === 'ios'
/** 当前是否是刘海屏 */
export const inNotch = (inIOS && systemInfo.screenHeight >= 812) || systemInfo.screenWidth >= 812
/** 当前是否是安卓系统 */
export const inAndroid = systemInfo.platform === 'android'
