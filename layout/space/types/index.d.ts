import * as React from 'react'
export type SizeType = 'small' | 'middle' | 'large' | undefined
export type AlignType = 'start' | 'end' | 'center' | 'baseline'
export type DirectionType = 'horizontal' | 'vertical'
export declare const SpaceContext: React.Context<{
  latestIndex: number
  horizontalSize: number
  verticalSize: number
  supportFlexGap: boolean
}>
export declare type SpaceSize = SizeType | number
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  size?: SpaceSize | [SpaceSize, SpaceSize]
  direction?: DirectionType
  align?: AlignType
  split?: React.ReactNode
  wrap?: boolean
}
declare const Space: React.FC<SpaceProps>
export default Space
