import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { InferProps } from 'prop-types'
import React, { Component, CSSProperties } from 'react'
import {
  Assets,
  ConfigConsumer,
  inAlipay,
  inRN,
  inWeapp,
  inWeb,
  isBoolean,
  isString,
  useClassesWithCare,
} from '../../common'
import '../../style/components/notice-bar/index.scss'
import { NoticeBarProps, NoticeBarState } from '../../types/notice-bar'
import Icon from '../icon'
import { AnimatedView } from './animation'
import { defaultProps, propTypes } from './common'

class NoticeBar extends Component<NoticeBarProps, NoticeBarState> {
  public static defaultProps: NoticeBarProps
  public static propTypes: InferProps<NoticeBarProps>

  private timeout: NodeJS.Timeout | null
  private interval: NodeJS.Timer

  public constructor(props: NoticeBarProps) {
    super(props)
    const animElemId = `J_${Math.ceil(Math.random() * 10e5).toString(36)}`
    this.state = {
      show: true,
      animElemId,
      animationData: {
        actions: [{}],
      },
      dura: 15,
    }
  }

  private onClose(event: CommonEvent): void {
    this.setState({
      show: false,
    })
    this.props.onClose && this.props.onClose(event)
  }
  // TODO: 优化
  public UNSAFE_componentWillReceiveProps(): void {
    if (!this.timeout) {
      this.interval && clearInterval(this.interval)
      this.initAnimation()
    }
  }

  public componentDidMount(): void {
    if (!this.props.marquee) return
    this.initAnimation()
  }

  private initAnimation(): void {
    // RN端动画单独做兼容
    if (inRN) return
    this.timeout = setTimeout(() => {
      this.timeout = null
      if (inWeb) {
        const { speed = 100 } = this.props
        const elem = document.querySelector(`.${this.state.animElemId}`)
        if (!elem) return
        const width = elem.getBoundingClientRect().width
        const dura = width / +speed
        this.setState({ dura })
      } else if (inWeapp || inAlipay) {
        const query = Taro.createSelectorQuery()
        const queryCb = (res) => {
          const queryRes = res[0]
          if (!queryRes) return
          const { width } = queryRes
          const { speed = 100 } = this.props
          const dura = width / +speed
          const animation = Taro.createAnimation({
            duration: dura * 1000,
            timingFunction: 'linear',
          })
          const resetAnimation = Taro.createAnimation({
            duration: 0,
            timingFunction: 'linear',
          })
          const resetOpacityAnimation = Taro.createAnimation({
            duration: 0,
            timingFunction: 'linear',
          })
          const animBody = (): void => {
            resetOpacityAnimation.opacity(0).step()
            this.setState({ animationData: resetOpacityAnimation.export() })

            setTimeout(() => {
              resetAnimation.translateX(0).step()
              this.setState({ animationData: resetAnimation.export() })
            }, 300)

            setTimeout(() => {
              resetOpacityAnimation.opacity(1).step()
              this.setState({ animationData: resetOpacityAnimation.export() })
            }, 600)

            setTimeout(() => {
              animation.translateX(-width).step()
              this.setState({ animationData: animation.export() })
            }, 900)
          }
          animBody()
          this.interval = setInterval(animBody, dura * 1000 + 1000)
        }
        query.select(`.${this.state.animElemId}`).boundingClientRect(queryCb).exec(queryCb)
      }
    }, 1000)
  }

  public render(): JSX.Element | null {
    const { single, icon, marquee, customStyle, className, textClassName, textStyle, children } =
      this.props
    let close = this.props.close
    const { dura, show, animElemId, animationData } = this.state
    const rootClassName = 'fta-noticebar'

    const style: CSSProperties = {}
    const innerClassName = [
      'fta-noticebar__content-inner',
      marquee && 'fta-noticebar__content-inner--marquee',
    ]
    if (marquee) {
      close = false
      style['animation-duration'] = `${dura}s`
      innerClassName.push(animElemId as string)
    }

    const classObject = {
      'fta-noticebar--marquee': marquee,
      'fta-noticebar--weapp': marquee && (inAlipay || inWeapp),
    }

    const composeTextStyle = {
      ...textStyle,
    }

    const AnimatedAdaptor = inRN && marquee ? AnimatedView : View

    // const iconClass = ['fta-icon']
    // if (icon) iconClass.push(`fta-icon-${icon}`)

    return show ? (
      <ConfigConsumer>
        {({ careMode }) => {
          const [closeViewClz, closeClz, textClz] = useClassesWithCare.single(
            careMode,
            'fta-noticebar__close',
            'fta-icon-close',
            // iconClass[0],
            'fta-noticebar__content-text'
            // close && 'fta-noticebar__closable'
          )

          return (
            <View className={classNames(rootClassName, classObject, className)} style={customStyle}>
              {icon ? (
                <View className='fta-noticebar-icon'>
                  {/* start hack 百度小程序 */}
                  {/* <Text className={classNames(iconClass, iconClz)}></Text> */}
                  {icon}
                </View>
              ) : null}
              <View
                className={classNames(
                  'fta-noticebar__content',
                  marquee && 'fta-noticebar__content--marquee'
                )}>
                <AnimatedAdaptor
                  id={animElemId}
                  animation={animationData}
                  className={classNames(
                    innerClassName,
                    !marquee && single && 'fta-noticebar--single'
                  )}
                  style={style}>
                  {isString(children) ? (
                    <Text
                      style={composeTextStyle}
                      className={classNames(
                        textClz,
                        { 'fta-noticebar__text--single': single },
                        { 'fta-noticebar__text--marquee': marquee },
                        textClassName
                      )}
                      // @ts-ignore
                      numberOfLines={single || marquee ? 1 : 0}>
                      {children}
                    </Text>
                  ) : (
                    children
                  )}
                </AnimatedAdaptor>
              </View>
              {/* 右侧图标，默认为关闭图标 */}
              {close === false ? null : (
                <View className={closeViewClz} onClick={this.onClose.bind(this)}>
                  {isBoolean(close) ? (
                    <Icon className={closeClz} value='close' src={Assets.close.default} />
                  ) : (
                    close
                  )}
                </View>
              )}
            </View>
          )
        }}
      </ConfigConsumer>
    ) : null
  }
}

NoticeBar.defaultProps = defaultProps

NoticeBar.propTypes = propTypes

export default NoticeBar
