import { Image, Text, View } from '@tarojs/components'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { ConfigConsumer, useClassesWithCare } from '../../common'
import '../../style/components/result/index.scss'
import { ResultProps, ResultType } from '../../types/result'
import { TouchableOpacity } from '../view'

const STATUS: Record<ResultType, ResultProps> = {
  success: {
    src: 'https://image.ymm56.com/ymmfile/operation-biz/c44ea5f6-10ad-42ff-aba6-907b62c8da8c.png',
    title: '操作成功',
  },
  error: {
    src: 'https://image.ymm56.com/ymmfile/operation-biz/cd0be064-2acb-466b-a2a5-244b209b27b1.png',
    title: '操作失败',
  },
  waiting: {
    src: 'https://image.ymm56.com/ymmfile/operation-biz/c0ab55e7-c019-4e2d-a13e-3c76ba67602b.png',
  },
  warning: {
    src: 'https://image.ymm56.com/ymmfile/operation-biz/ef9aa9a9-710f-40a6-922b-ac044ae168fb.png',
  },
  info: {
    src: 'https://image.ymm56.com/ymmfile/operation-biz/62398c75-bcc3-40c0-be5e-db16031c0fc5.png',
  },
}

class Result extends Component<ResultProps> {
  public static defaultProps: ResultProps
  public static propTypes: InferProps<ResultProps>

  public render(): JSX.Element {
    const { type, renderBtn, btnText, onClick } = this.props
    const { src, title, desc } = { ...STATUS[type], ...this.props }
    return (
      <ConfigConsumer>
        {({ careMode }) => {
          const [titleClz, descClz, btnClz, btnTextClz] = useClassesWithCare.single(
            careMode,
            'fta-result-title__text',
            'fta-result-desc__text',
            'fta-result-button',
            'fta-result-button__text'
          )
          return (
            <View className='fta-result'>
              <Image className='fta-result-image' src={src} mode='aspectFill' />
              {title ? (
                <View className='fta-result-title'>
                  <Text className={titleClz}>{title}</Text>
                </View>
              ) : null}
              {desc ? (
                <View className='fta-result-desc'>
                  <Text className={descClz}>{desc}</Text>
                </View>
              ) : null}
              {renderBtn || (
                <TouchableOpacity className={btnClz} onClick={onClick} activeOpacity={0.6}>
                  <Text className={btnTextClz}>{btnText}</Text>
                </TouchableOpacity>
              )}
            </View>
          )
        }}
      </ConfigConsumer>
    )
  }
}

Result.defaultProps = {
  type: 'success',
  btnText: '返回',
}

Result.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'waiting', 'info', 'warning']),
}

export default Result
