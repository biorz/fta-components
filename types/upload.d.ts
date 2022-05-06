import { FC } from 'react'
import BaseComponent from './base'

export interface UploadProps extends BaseComponent {
  /**
   * 选取的图片
   */
  src?: string
  /**
   * 底图
   */
  image?: string
  /**
   * 自定义相机图标
   */
  camera?: string
  /**
   * 提示文字
   */
  placeholder?: string
  /**
   * 聚焦时显示红色边框
   * @default false
   */
  error?: boolean
  /**
   * 提示
   * @default '请重新上传'
   */
  errorTip?: string

  [key: string]: any
}

declare const Upload: FC<UploadProps>

export default Upload
