import Taro from '@tarojs/taro'

export default function copyToClipboard(str: string, callback?: () => void) {
  Taro.setClipboardData({
    data: str,
    success: callback,
  })
}
