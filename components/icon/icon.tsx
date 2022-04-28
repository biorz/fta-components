import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Fragment, ReactNode } from 'react'
import {
  ConfigConsumer,
  inRN,
  isNumber,
  isString,
  scale as Scale,
  useClassWithCare,
} from '../../common'
import '../../style/components/icon/index.scss'
import { IconProps } from '../../types/icon'
import Badge from '../badge'

const ContainerAdaptor = inRN ? View : Fragment
export default class Icon extends React.Component<IconProps> {
  public static defaultProps: IconProps
  public static propTypes: InferProps<IconProps>

  constructor(props: IconProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    // this.renderBadge = this.renderBadge.bind(this)
  }

  private handleClick(): void {
    this.props.onClick?.(arguments as any)
  }

  private renderBadge(): ReactNode {
    const { badge, size } = this.props
    if (badge) {
      const { customStyle, className, isDot, ...props } = badge
      const rootClz = classNames(
        `fta-icon__${isDot ? 'dot' : 'badge'}`,
        isString(size) && `fta-icon--${size}__badge${isDot ? '--dot' : ''}`,
        className
      )
      return (
        <Badge absolute {...props} isDot={isDot} customStyle={customStyle} className={rootClz} />
      )
    }
    return null
  }

  public render(): JSX.Element {
    const { customStyle, className, prefixClass, value, size, color, scale, src, image, badge } =
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
            <ContainerAdaptor>
              <IconAdaptor
                src={src!}
                style={rootStyle}
                // @ts-ignore
                tintColor={color}
                className={classNames(prefixClass, iconName, careClass, className)}
                onClick={this.handleClick}>
                {!inRN && badge ? this.renderBadge() : null}
              </IconAdaptor>
              {inRN && badge ? this.renderBadge() : null}
            </ContainerAdaptor>
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
