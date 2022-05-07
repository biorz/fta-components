import { inAndroid, inIOS, inNotch, inRN, inWeb, systemInfo } from '../../../common'

export const safeArea: Taro.General.SafeAreaResult = systemInfo.safeArea || {
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
  left: 0,
  right: 0,
}

/** 是否是沉浸式屏幕 */
export const isImmersive = systemInfo.screenHeight === systemInfo.windowHeight
/** 沉浸式的刘海屏需要安全区适配 */
export const needSafeArea = isImmersive && inNotch

// console.log(safeArea, 'safearea', systemInfo)
/** 安全区 */
export const _safeArea = {
  top:
    inRN && inAndroid
      ? 0
      : safeArea.top
      ? safeArea.top < 44 && inNotch
        ? 44
        : safeArea.top
      : isImmersive && inWeb
      ? // @ts-ignore
        (window._MBWEB_statusbarHeight || 0) / systemInfo.pixelRatio
      : inNotch
      ? 44
      : 0,
  bottom:
    safeArea.top && inRN && inIOS
      ? 34
      : safeArea.bottom
      ? systemInfo.screenHeight - safeArea.bottom
      : needSafeArea
      ? // @ts-ignore
        (window._MBWEB_bottombarHeight || 0) / systemInfo.pixelRatio
      : 0,
  left: safeArea.left,
  right: safeArea.right ? systemInfo.screenWidth - safeArea.right : 0,
}

// inWeb && alert(JSON.stringify(_safeArea) + inNotch)

// alert(JSON.stringify(_safeArea))
