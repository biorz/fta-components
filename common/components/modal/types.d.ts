import { ReactNode } from 'react'

export interface ModalProps {
  children: ReactNode
  /**
   * Whether to use Native Modal component or just React Fragment.
   * @default true
   */
  useNative?: boolean
  /**
   * The animationType prop controls how the modal animates.
   */
  animationType?: 'none' | 'slide' | 'fade'
  /**
   * The presentationStyle prop controls how the modal appears (generally on larger devices such as iPad or plus-sized iPhones).
   * @See https://developer.apple.com/reference/uikit/uimodalpresentationstyle for details.
   * @supported iOS
   * @default 'fullScreen'
   */
  presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen'
  /**
   * The visible prop determines whether your modal is visible.
   * @default true
   */
  visible?: boolean
  /**
   * The transparent prop determines whether your modal will fill the entire view.
   * Setting this to true will render the modal over a transparent background.
   * @default false
   */
  transparent?: boolean
  /**
   * The statusBarTranslucent prop determines whether your modal should go under the system statusbar.
   * @supported Android
   */
  statusBarTranslucent?: boolean
  /**
   * The hardwareAccelerated prop controls whether to force hardware acceleration for the underlying window.
   * @supported Android
   * @default false
   */
  hardwareAccelerated?: boolean
  /**
   * The onShow prop allows passing a function that will be called once the modal has been shown.
   */
  onShow?(): void

  [key: string]: any
}
