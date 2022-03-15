import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import { InferProps } from 'prop-types'
import React from 'react'
import { ConfigConsumer, useClassesWithCare } from '../../common'
import '../../style/components/notice-bar/index.scss'
import { NoticeBarProps, NoticeBarState } from '../../types/notice-bar'
import { defaultProps, propTypes } from './common'

const ICON = {
  close: 'https://image.ymm56.com/ymmfile/operation-biz/a5e1c2a8-e59e-4bb8-9a59-c8092d058258.png',
  more: 'https://image.ymm56.com/boss/2020/0114/1578987738',
}

class NoticeBar extends React.Component<NoticeBarProps, NoticeBarState> {
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

  public render(): JSX.Element | boolean {
    const { single, icon, customStyle, className, children, close } = this.props
    const { show } = this.state
    const rootClassName = ['fta-noticebar']

    // const innerClassName = ['fta-noticebar__content-inner']
    const contentClassObject = {
      'fta-noticebar__content': true,
    }

    const classObject = {
      'fta-noticebar--single': single,
    }

    return (
      show && (
        <ConfigConsumer>
          {({ careMode }) => {
            const [closeViewClz, closeClz, textClz, closeableClz] = useClassesWithCare.single(
              careMode,
              'fta-noticebar__close',
              'fta-icon-close',
              'fta-noticebar__content-textarea',
              close && 'fta-noticebar__closable'
            )
            return (
              <View
                className={classNames(rootClassName, classObject, className)}
                style={customStyle}>
                <View className={classNames(contentClassObject, closeableClz)}>
                  {/* {icon } */}
                  <View className='fta-noticebar__content-text'>
                    {/* <View className={classNames(innerClassName)}> */}
                    {typeof children !== 'string' ? (
                      children
                    ) : (
                      <Text className={textClz} numberOfLines={single ? 1 : void 0}>
                        {children}
                      </Text>
                    )}
                  </View>
                </View>

                {close && (
                  <View className={closeViewClz} onClick={this.onClose.bind(this)}>
                    <Image className={closeClz} src={ICON.close} mode='aspectFit' />
                    {/* <Text className='fta-icon fta-icon-close'></Text> */}
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

NoticeBar.defaultProps = defaultProps

NoticeBar.propTypes = propTypes

export default NoticeBar
