import { Image, View } from '@tarojs/components'
import { FC } from '@tarojs/taro'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component, CSSProperties, Fragment, ReactElement } from 'react'
import {
  Assets,
  ConfigConsumer,
  inAndroid,
  inIOS,
  useCarelessClass,
  useClassWithCare,
} from '../../common'
import '../../style/components/nav-bar/index.scss'
import {
  BackIconProps,
  ButtonProps,
  NavBarProps,
  StatusBarProps,
  TitleProps,
} from '../../types/nav-bar'
import SafeArea from '../safe-area'
import { Text } from '../typography'
import { TouchableOpacity } from '../view'
import NavbarButton from './navbar-button'
import StatusBar from './status-bar/status-bar'

function useBackIcon(props: BackIconProps): JSX.Element {
  const { className, style, color, ...extraProps } = props
  const imageClz = useCarelessClass(['fta-nav-bar-back__image'])
  const colorStyle: CSSProperties = {
    //@ts-ignore
    tintColor: color,
  }

  return (
    <TouchableOpacity className='fta-nav-bar-back' activeOpacity={0.6} {...extraProps}>
      <Image
        src={NavBar.backIcon}
        className={imageClz}
        style={{ ...(style as CSSProperties), ...colorStyle }}
        // @ts-ignore
        tintColor={color}
        mode='aspectFit'
      />
    </TouchableOpacity>
  )
}

function getTitleElement(data, careMode: boolean) {
  const titleClz = useClassWithCare(careMode, ['fta-nav-bar-custom-title'])
  if (!data || data.props) {
    return <View className={titleClz}>{data}</View>
  }

  const colorStyle = data.tintColor ? { color: data.tintColor } : null
  const textStyle = {
    ...data.style,
    ...colorStyle,
  }

  return (
    <View className='fta-nav-bar-title-container'>
      {/* @ts-ignore */}
      <Text
        level={3}
        onClick={data.handler}
        // @ts-ignore
        ellipsizeMode={data.ellipsizeMode}
        numberOfLines={data.numberOfLines}
        style={textStyle}
        className='fta-nav-bar-title-text'>
        {data.title}
      </Text>
    </View>
  )
}

function getButtonElement(data: ReactElement | ButtonProps, className: string) {
  return (
    <View className='fta-nav-bar-button-container'>
      {!data || (data as ReactElement).props ? (
        data
      ) : (
        <NavbarButton
          title={(data as ButtonProps).title}
          style={(data as ButtonProps).style}
          className={classNames(className, (data as ButtonProps).className)}
          tintColor={(data as ButtonProps).tintColor}
          handler={(data as ButtonProps).handler}
          disabled={(data as ButtonProps).disabled}
          accessible={(data as ButtonProps).accessible}
          accessibilityLabel={(data as ButtonProps).accessibilityLabel}
        />
      )}
    </View>
  )
}

class NavBar extends Component<NavBarProps> {
  public static defaultProps: NavBarProps
  public static propTypes: InferProps<NavBarProps>
  public static backIcon: string
  public static BackIcon: FC<BackIconProps>

  public componentDidMount() {
    this.customizeStatusBar()
  }

  public UNSAFE_componentWillReceiveProps() {
    this.customizeStatusBar()
  }

  public customizeStatusBar() {
    const { statusBar = {} } = this.props
    if (inIOS) {
      if (statusBar.style) {
        // @ts-ignore
        StatusBar?.setBarStyle?.(statusBar.style)
      }
      const animation = statusBar.hidden ? statusBar.hideAnimation : statusBar.showAnimation
      // @ts-ignore
      StatusBar.showHideTransition = animation
      // @ts-ignore
      StatusBar.hidden = statusBar.hidden
    } else if (inAndroid && statusBar.backgroundColor) {
      // @ts-ignore
      StatusBar?.setBackgroundColor(statusBar.backgroundColor)
    }
  }

  public render(): JSX.Element {
    const {
      containerStyle,
      tintColor,
      title,
      leftButton,
      rightButton,
      style,
      className,
      containerClassName,
      safeAreaClassName,
      safeAreaStyle,
      ...props
    } = this.props

    const customTintColor: CSSProperties = tintColor ? { backgroundColor: tintColor } : {}

    const customStatusBarTintColor: CSSProperties = this.props.statusBar?.tintColor
      ? { backgroundColor: this.props.statusBar.tintColor }
      : {}
    // const statusBarHeight: CSSProperties = systemInfo.statusBarHeight
    //   ? {
    //       height: systemInfo.statusBarHeight,
    //     }
    //   : null

    const rootStyle = {
      ...customTintColor,
      ...customStatusBarTintColor,
      ...containerStyle,
    }

    const rootClass = classNames('fta-nav-bar', containerClassName)

    let statusBar: JSX.Element = <SafeArea top style={safeAreaStyle} />
    const showStatusBar = !this.props.statusBar.hidden
    if (inIOS) {
      statusBar = showStatusBar
        ? statusBar
        : // <View
          //   style={{ ...customStatusBarTintColor }}
          //   className='fta-status-bar'></View>
          null
    }
    return (
      <ConfigConsumer>
        {({ careMode }) => {
          return (
            <Fragment>
              {statusBar}
              <View style={rootStyle} className={rootClass} {...props}>
                {/* <SafeArea top /> */}
                <View className={classNames('fta-nav-bar-container', className)} style={style}>
                  {/* {console.log('关怀模式改变', careMode)} */}
                  {getTitleElement(title, careMode)}
                  {getButtonElement(leftButton, 'fta-nav-bar-left-button')}
                  {getButtonElement(rightButton, 'fta-nav-bar-right-button')}
                </View>
              </View>
            </Fragment>
          )
        }}
      </ConfigConsumer>
    )
  }
}

NavBar.backIcon = Assets.arrow.left

NavBar.BackIcon = useBackIcon

NavBar.defaultProps = {
  style: {},
  tintColor: '',
  // leftButton: null,
  // rightButton: null,
  // title: null,
  statusBar: {
    style: 'default',
    hidden: false,
    hideAnimation: 'slide',
    showAnimation: 'slide',
  },
  containerStyle: {},
  safeAreaStyle: {
    backgroundColor: 'white',
  },
}

const ButtonShape: InferProps<ButtonProps> = {
  title: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

const TitleShape: InferProps<TitleProps> = {
  title: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  numberOfLines: PropTypes.number,
}

const StatusBarShape: InferProps<StatusBarProps> = {
  style: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  tintColor: PropTypes.string,
  hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
  showAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
}

NavBar.propTypes = {
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.oneOf(null)]),
  tintColor: PropTypes.string,
  statusBar: PropTypes.shape(StatusBarShape),
  leftButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  rightButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  title: PropTypes.oneOfType([
    PropTypes.shape(TitleShape),
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  containerStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default NavBar
