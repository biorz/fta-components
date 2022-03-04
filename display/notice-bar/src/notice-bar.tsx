import { ConfigConsumer, useClassesWithCare } from '@fta/common'
import '@fta/common/style/icon.scss'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { NoticeBarProps, NoticeBarState } from '../types'
import './style/notice-bar.scss'

export default class Noticebar extends React.Component<NoticeBarProps, NoticeBarState> {
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
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
    }
  }

  private onClose(event: CommonEvent): void {
    this.setState({
      show: false,
    })
    this.props.onClose && this.props.onClose(event)
  }

  private onGotoMore(event: CommonEvent): void {
    this.props.onGotoMore && this.props.onGotoMore(event)
  }

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
    const { isWEAPP, isALIPAY } = this.state
    this.timeout = setTimeout(() => {
      this.timeout = null
      if (this.state.isWEB) {
        const { speed = 100 } = this.props
        const elem = document.querySelector(`.${this.state.animElemId}`)
        if (!elem) return
        const width = elem.getBoundingClientRect().width
        const dura = width / +speed
        this.setState({ dura })
      } else if (isWEAPP || isALIPAY) {
        const query = Taro.createSelectorQuery()
        query
          .select(`.${this.state.animElemId}`)
          .boundingClientRect()
          .exec((res) => {
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
          })
      }
    }, 1000)
  }

  public render(): JSX.Element | boolean {
    const { single, icon, marquee, customStyle, className, moreText = '查看详情' } = this.props
    let { showMore, close } = this.props
    const { dura, show, animElemId, animationData, isWEAPP, isALIPAY } = this.state
    const rootClassName = ['fta-noticebar']

    if (!single) showMore = false

    const style = {}
    const innerClassName = ['fta-noticebar__content-inner']
    if (marquee) {
      close = false
      style['animation-duration'] = `${dura}s`
      innerClassName.push(animElemId)
    }

    const classObject = {
      'fta-noticebar--marquee': marquee,
      'fta-noticebar--weapp': marquee && (isWEAPP || isALIPAY),
      'fta-noticebar--single': !marquee && single,
    }

    const iconClass = ['fta-icon']
    if (icon) iconClass.push(`fta-icon-${icon}`)

    return (
      show && (
        <ConfigConsumer>
          {({ careMode }) => {
            const [closeViewClz, closeClz, iconClz, textClz, moreClz, rightClz] =
              useClassesWithCare.single(
                careMode,
                'fta-noticebar__close',
                'fta-icon-close',
                iconClass[0],
                'fta-noticebar__content-text',
                'fta-noticebar__more-text',
                'fta-icon-chevron-right'
              )

            return (
              <View
                className={classNames(rootClassName, classObject, className)}
                style={customStyle}>
                {close && (
                  <View className={closeViewClz} onClick={this.onClose.bind(this)}>
                    <Text className={`fta-icon ${closeClz}`}></Text>
                  </View>
                )}
                <View className='fta-noticebar__content'>
                  {icon && (
                    <View className='fta-noticebar__content-icon'>
                      {/* start hack 百度小程序 */}
                      <Text className={classNames(iconClass, iconClz)}></Text>
                    </View>
                  )}
                  <View className={textClz}>
                    <View
                      id={animElemId}
                      animation={animationData}
                      className={classNames(innerClassName)}
                      style={style}>
                      {this.props.children}
                    </View>
                  </View>
                </View>
                {showMore && (
                  <View className='fta-noticebar__more' onClick={this.onGotoMore.bind(this)}>
                    <Text className={moreClz}>{moreText}</Text>
                    <View className='fta-noticebar__more-icon'>
                      <Text className={`fta-icon ${rightClz}`}></Text>
                    </View>
                  </View>
                )}
              </View>
            )
          }}
        </ConfigConsumer>
      )
    )
  }
}

Noticebar.defaultProps = {
  close: false,
  single: false,
  marquee: false,
  speed: 100,
  moreText: '查看详情',
  showMore: false,
  icon: '',
  customStyle: {},
}

Noticebar.propTypes = {
  close: PropTypes.bool,
  single: PropTypes.bool,
  marquee: PropTypes.bool,
  speed: PropTypes.number,
  moreText: PropTypes.string,
  showMore: PropTypes.bool,
  icon: PropTypes.string,
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClose: PropTypes.func,
  onGotoMore: PropTypes.func,
}
