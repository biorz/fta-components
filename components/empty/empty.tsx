import { Image, View } from '@tarojs/components'
import React, { Component } from 'react'
import { Assets } from '../../common'
import '../../style/components/empty/index.scss'
import { EmptyProps, EmptyType } from '../../types/empty'
import Button from '../button'
import { Text } from '../typography'

const defaultDesc: Record<EmptyType, { title: string; desc: string; src: string }> = {
  empty: {
    title: '暂无数据',
    desc: '让数据再飞一会',
    src: Assets.empty.default,
  },
  error: {
    title: '呃，出错了…',
    desc: '刷新一下试试吧',
    src: Assets.empty.error,
  },
}

class Empty extends Component<EmptyProps> {
  public static defaultProps: EmptyProps

  public render(): JSX.Element | null {
    if (!this.props.show) return null
    // const copiedProps
    const { type, showBtn, btnText, onClick } = this.props
    const { src, title, desc } = {
      ...defaultDesc[type!],
      ...this.props,
    }

    const [titleClz, descClz, btnClz] = [
      'fta-empty-title__text',
      'fta-empty-desc__text',
      'fta-empty-button',
    ]

    return (
      <View className='fta-empty'>
        <Image className='fta-empty-image' src={src} mode='aspectFit'></Image>
        {title ? (
          <View className='fta-empty-title'>
            <Text level={3} className={titleClz}>
              {title}
            </Text>
          </View>
        ) : null}
        {desc ? (
          <View className='fta-empty-desc'>
            <Text level={4} className={descClz}>
              {desc}
            </Text>
          </View>
        ) : null}
        {showBtn ? (
          <Button className={btnClz} onClick={onClick}>
            {btnText}
          </Button>
        ) : null}
      </View>
    )
  }
}

Empty.defaultProps = {
  type: 'empty',
  showBtn: true,
  show: true,
  btnText: '刷新试试',
  // ...defaultDesc.empty,
}

export default Empty
