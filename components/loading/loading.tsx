import { View } from '@tarojs/components'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { pxTransform } from '../../common'
import '../../style/components/loading/index.scss'
import { LoadingProps } from '../../types/loading'

export default class Loading extends React.Component<LoadingProps> {
  public static defaultProps: LoadingProps
  public static propTypes: InferProps<LoadingProps>

  public render(): JSX.Element {
    const { color, size } = this.props
    const loadingSize = typeof size === 'string' ? size : String(size)
    const sizeStyle = {
      width: size ? `${pxTransform(parseInt(loadingSize))}` : '',
      height: size ? `${pxTransform(parseInt(loadingSize))}` : '',
    }
    const colorStyle = {
      border: color ? `1px solid ${color}` : '',
      borderColor: color ? `${color} transparent transparent transparent` : '',
    }
    const ringStyle = Object.assign({}, colorStyle, sizeStyle)
    // console.log('size', size, loadingSize, sizeStyle)
    return (
      <View className='fta-loading' style={sizeStyle}>
        <View className='fta-loading__ring' style={ringStyle}></View>
        <View className='fta-loading__ring' style={ringStyle}></View>
        <View className='fta-loading__ring' style={ringStyle}></View>
      </View>
    )
  }
}

Loading.defaultProps = {
  size: 0,
  color: '',
}

Loading.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
