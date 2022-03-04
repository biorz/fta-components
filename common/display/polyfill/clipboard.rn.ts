import { Clipboard } from 'react-native'

export default function copyToClipboard(str: string, callback?: () => void): void {
  Clipboard.setString(str)
  callback?.()
}
