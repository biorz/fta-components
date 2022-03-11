import { Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { ConfigConsumer, inRN, isNumber, scale as Scale, useClassWithCare } from '../../common'
import '../../style/components/icon/index.scss'
import { IconProps } from '../../types/icon'

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
    const { customStyle, className, prefixClass, value, size, color, scale, src, image } =
      this.props
    const IconAdaptor = inRN || image ? Image : Text
    return (
      <ConfigConsumer>
        {({ careMode }) => {
          let careClass = ''
          const rootStyle = {
            ...customStyle,
          }
          if (isNumber(size)) {
            const _size = careMode ? size * 1.3 : size
            if (inRN) {
              rootStyle.height = scale ? Scale(_size) : _size
              rootStyle.width = rootStyle.height
            } else {
              rootStyle.fontSize = scale ? Scale(_size) : _size
            }
          } else {
            careClass = useClassWithCare(careMode, [`fta-icon--${size}`])
          }

          if (color) {
            rootStyle[inRN ? 'tintColor' : 'color'] = color
          }

          const iconName = value ? `${prefixClass}-${value}` : ''

          return (
            <IconAdaptor
              src={src!}
              style={rootStyle}
              // @ts-ignore
              tintColor={color}
              className={classNames(prefixClass, iconName, careClass, className)}
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
  src: 'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
  size: 24,
  image: false,
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
