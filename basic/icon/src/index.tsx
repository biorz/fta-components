import { ConfigConsumer, scale as Scale } from '@fta/common'
import { Text } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { IconProps } from '../types'
import './style/index.scss'

export default class Icon extends React.Component<IconProps> {
  public static defaultProps: IconProps
  public static propTypes: InferProps<IconProps>

  constructor(props: IconProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  private handleClick(): void {
    this.props.onClick?.(arguments as any)
  }

  public render(): JSX.Element {
    const { customStyle, className, prefixClass, value, size, color, scale } = this.props

    return (
      <ConfigConsumer>
        {({ careMode }) => {
          const _size = careMode ? size * 1.3 : size
          const rootStyle = {
            fontSize: scale ? Scale(_size) : _size,
            ...customStyle,
          }
          if (color) {
            rootStyle.color = color
          }

          const iconName = value ? `${prefixClass}-${value}` : ''

          return (
            <Text
              style={rootStyle}
              className={classNames(prefixClass, iconName, className)}
              onClick={this.handleClick}
            />
          )
        }}
      </ConfigConsumer>
    )
  }
}

Icon.defaultProps = {
  scale: true,
  customStyle: {},
  className: '',
  prefixClass: 'fta-icon',
  value: '',
  color: '',
  size: 24,
}

Icon.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prefixClass: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
}
