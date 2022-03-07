import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { pxTransform } from '../../common'
import '../../style/components/loading/index.scss'

const defaultLoadingSize = 36
interface LoadingProps {
  size?: string | number
  color?: string | number
}

export default class Loading extends React.Component<LoadingProps> {
  public static defaultProps: LoadingProps
  public static propTypes: InferProps<LoadingProps>

  public render(): JSX.Element {
    const { color, size = defaultLoadingSize } = this.props
    // TODO: check function
    const roundSize = Math.floor(pxTransform((size as number) || defaultLoadingSize) as number)
    console.log(this.props, roundSize)
    return <ActivityIndicator color={color} size={14} />
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
