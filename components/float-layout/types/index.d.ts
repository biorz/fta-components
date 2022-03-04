import { FC } from 'react'
import { IFloatLayoutProps } from './types'
import './index.scss'
/**
 * 自定义浮动弹层，解决滚动穿透
 * @param props
 * @returns
 */
declare const FloatLayout: FC<IFloatLayoutProps>
export declare const floatLayoutProps: IFloatLayoutProps
export default FloatLayout
