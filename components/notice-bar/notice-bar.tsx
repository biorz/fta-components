import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { InferProps } from 'prop-types'
import React, { Component, CSSProperties, Fragment } from 'react'
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
import { VerticalView } from './animation/vertical'
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
      transition: true,
      show: true,
      animElemId,
      animationData: {
        actions: [{}],
      },
      dura: 15,
      cursor: 0,
      text: props.text!,
    }

    this.initVerticalAnimation = this.initVerticalAnimation.bind(this)
  }

  private onClose(event: CommonEvent): void {
    this.setState({
      show: false,
    })
    this.props.onClose && this.props.onClose(event)
  }
  // TODO: 优化
  public UNSAFE_componentWillReceiveProps(nextProps: NoticeBarProps): void {
    if (nextProps.children === this.props.children) return
    if (!this.timeout) {
      this.interval && clearInterval(this.interval)
      this.initAnimation()
    }
  }

  public componentDidMount(): void {
    this.initAnimation()
  }

  public componentDidUpdate(_nextProps: NoticeBarProps, nextState: NoticeBarState) {
    // if (nextState.cursor != this.state.cursor) {
    // }
  }

  public componentWillUnmount() {
    clearInterval(this.interval)
  }

  private sortVertical() {
    // 排序的时候要马上去除动画样式
    const copy = this.state.text!.slice()
    copy.push(copy.shift()!)
    this.setState(
      {
        text: copy,
        transition: false,
        cursor: 0,
      },
      () => {
        inRN ||
          setTimeout(() => {
            console.log('动画执行完毕')
            this.setState({ transition: true })
          }, 1000)
      }
    )
  }

  private initAnimation() {
    const { marquee, vertical } = this.props
    if (!marquee || inRN) return
    vertical ? this.initVerticalAnimation() : this.initHorizontalAnimation()
  }

  private initVerticalAnimation(): void {
    const length = this.props.text?.length || 0
    if (!length) return
    if (inRN) {
      this.sortVertical()
      return
    }
    this.interval = setTimeout(() => {
      this.setState({ cursor: 1 }, () => {
        setTimeout(() => {
          this.sortVertical()
        }, 1000)
      })
      this.initVerticalAnimation()
    }, (this.props.duration! + 1) * 1000)
  }

  private initHorizontalAnimation(): void {
    // RN端动画单独做兼容
    if (inRN) return
    this.timeout = setTimeout(() => {
      this.timeout = null
      // TODO: web环境支持mw
      // @ts-ignore
      if (inWeb || process.env.TARO_ENV === 'mw') {
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
          setTimeout(() => {
            this.interval = setInterval(animBody, dura * 1000)
          }, 1000)
        }
        query.select(`.${this.state.animElemId}`).boundingClientRect(queryCb).exec(queryCb)
      }
    }, 1000)
  }

  public render(): JSX.Element | null {
    const {
      single,
      icon,
      marquee,
      customStyle,
      className,
      textClassName,
      textStyle,
      children,
      close,
      duration,
      vertical,
      onClick,
    } = this.props

    const { dura, show, animElemId, animationData, cursor, text, transition } = this.state
    const rootClassName = 'fta-noticebar'

    const style: CSSProperties = {}
    const innerClassName = [
      'fta-noticebar__content-inner',
      marquee &&
        `fta-noticebar__content-inner--${
          vertical ? (transition ? 'vertical' : 'none') : 'marquee'
        }`,
    ]
    if (marquee) {
      if (vertical) {
        !inRN && (style.transform = `translateY(${(-100 / text!.length) * cursor}%)`)
      } else {
        // close = false
        style['animation-duration'] = `${dura}s`
        innerClassName.push(animElemId as string)
      }
    }

    const classObject = {
      'fta-noticebar--marquee': marquee,
      'fta-noticebar--weapp': marquee && (inAlipay || inWeapp),
    }

    const composeTextStyle = {
      ...textStyle,
    }

    const AnimatedAdaptor = inRN && marquee ? (vertical ? VerticalView : AnimatedView) : View

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
            <View
              className={classNames(rootClassName, classObject, className)}
              style={customStyle}
              onClick={onClick}>
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
                  marquee && `fta-noticebar__content--${vertical ? 'vertical' : 'marquee'}`
                )}>
                <AnimatedAdaptor
                  // @ts-ignore
                  length={text!.length}
                  duration={duration}
                  id={animElemId}
                  animation={animationData}
                  className={classNames(
                    innerClassName,
                    !marquee && single && 'fta-noticebar--single',
                    marquee && vertical && 'fta-noticebar--vertical'
                  )}
                  style={style}
                  // @ts-ignore
                  onAnimEnd={this.initVerticalAnimation}>
                  {vertical ? (
                    // 垂直滚动
                    text?.map((txt, i) =>
                      isString(txt) ? (
                        <Text
                          key={i}
                          // @ts-ignore
                          numberOfLines={1}
                          className={classNames(textClz, 'fta-noticebar__text--single')}
                          style={textStyle}>
                          {txt}
                        </Text>
                      ) : (
                        <Fragment key={i}>{txt}</Fragment>
                      )
                    )
                  ) : isString(children) ? (
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
