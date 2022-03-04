import { ConfigConsumer, useClassesWithCare } from '@fta/common'
import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { NoticeBarProps, NoticeBarState } from '../types'
import './style/notice-bar.rn.scss'

const ICON = {
  close: 'https://image.ymm56.com/ymmfile/operation-biz/a5e1c2a8-e59e-4bb8-9a59-c8092d058258.png',
  more: 'https://image.ymm56.com/boss/2020/0114/1578987738',
}

export default class NoticeBar extends React.Component<NoticeBarProps, NoticeBarState> {
  public static defaultProps: NoticeBarProps
  public static propTypes: InferProps<NoticeBarProps>

  public constructor(props: NoticeBarProps) {
    super(props)
    this.state = {
      show: true,
    }
  }

  private onClose(event): void {
    this.setState({
      show: false,
    })
    this.props.onClose && this.props.onClose(event)
  }

  private onGotoMore(event): void {
    this.props.onGotoMore && this.props.onGotoMore(event)
  }

  public render(): JSX.Element | boolean {
    const { single, icon, customStyle, className, children, moreText = '查看详情' } = this.props
    let { showMore, close } = this.props
    const { show } = this.state
    const rootClassName = ['fta-noticebar']

    if (!single) showMore = false

    // const innerClassName = ['fta-noticebar__content-inner']
    const contentClassObject = {
      'fta-noticebar__content': true,

      'fta-noticebar__more': showMore,
    }

    const classObject = {
      'fta-noticebar--single': single,
    }

    return (
      show && (
        <ConfigConsumer>
          {({ careMode }) => {
            const [closeViewClz, closeClz, textClz, moreClz, rightIconClz, closeableClz] =
              useClassesWithCare.single(
                careMode,
                'fta-noticebar__close',
                'fta-icon-close',
                'fta-noticebar__content-textarea',
                'text',
                'fta-icon-close',
                close && 'fta-noticebar__closable'
              )
            return (
              <View
                className={classNames(rootClassName, classObject, className)}
                style={customStyle}>
                {close && (
                  <View className={closeViewClz} onClick={this.onClose.bind(this)}>
                    <Image className={closeClz} src={ICON.close} mode='aspectFit' />
                    {/* <Text className='fta-icon fta-icon-close'></Text> */}
                  </View>
                )}
                <View className={classNames(contentClassObject, closeableClz)}>
                  {/* {icon } */}
                  <View className='fta-noticebar__content-text'>
                    {/* <View className={classNames(innerClassName)}> */}
                    {typeof children !== 'string' ? (
                      children
                    ) : (
                      <Text className={textClz}>{children}</Text>
                    )}
                  </View>
                  {/* </View> */}
                </View>
                {showMore && (
                  <View className='fta-noticebar__more' onClick={this.onGotoMore.bind(this)}>
                    <View className='fta-noticebar__more__container'>
                      <Text className={moreClz}>{moreText}</Text>
                      <Image className={rightIconClz} src={ICON.more} mode='aspectFit' />
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

NoticeBar.defaultProps = {
  close: false,
  single: false,
  marquee: false,
  speed: 100,
  moreText: '查看详情',
  showMore: false,
  icon: '',
  customStyle: {},
}

NoticeBar.propTypes = {
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
