import { Image, View } from '@tarojs/components'
import PropTypes, { InferProps } from 'prop-types'
import React, { Component } from 'react'
import { Assets } from '../../common'
import '../../style/components/result/index.scss'
import { ResultProps, ResultType } from '../../types/result'
import Button from '../button'
import { Text } from '../typography'
const STATUS: Record<ResultType, ResultProps> = {
  success: {
    src: Assets.tip.success,
    title: '操作成功',
  },
  error: {
    src: Assets.tip.error,
    title: '操作失败',
  },
  waiting: {
    src: Assets.tip.waiting,
  },
  warning: {
    src: Assets.tip.warning,
  },
  info: {
    src: Assets.tip.info,
  },
}

class Result extends Component<ResultProps> {
  public static defaultProps: ResultProps
  public static propTypes: InferProps<ResultProps>

  public render(): JSX.Element {
    const { type, renderBtn, btnText, onClick } = this.props
    const { src, title, desc } = { ...STATUS[type!], ...this.props }

    const [titleClz, descClz, btnClz] = [
      'fta-result-title__text',
      'fta-result-desc__text',
      'fta-result-button',
      // 'fta-result-button__text',
    ]
    return (
      <View className='fta-result'>
        <Image className='fta-result-image' src={src!} mode='aspectFill' />
        {title ? (
          <View className='fta-result-title'>
            <Text level={3} className={titleClz}>
              {title}
            </Text>
          </View>
        ) : null}
        {desc ? (
          <View className='fta-result-desc'>
            <Text level={4} className={descClz}>
              {desc}
            </Text>
          </View>
        ) : null}
        {renderBtn || (
          <Button className={btnClz} onClick={onClick}>
            {btnText}
          </Button>
        )}
      </View>
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
