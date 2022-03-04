import { ConfigConsumer, useClassesWithCare } from '@fta/common'
import { TouchableOpacity } from '@fta/components-view'
import { Image, Text, View } from '@tarojs/components'
import React, { Component } from 'react'
import { EmptyProps, EmptyType } from '../types'
import './style/index.scss'

const defaultDesc: Record<EmptyType, { title: string; desc: string; src: string }> = {
  empty: {
    title: '暂无数据',
    desc: '让数据再飞一会',
    src: 'https://image.ymm56.com/ymmfile/operation-biz/4469e30e-fe6b-4673-952c-c6a2d92ddc7b.png',
  },
  error: {
    title: '呃，出错了…',
    desc: '刷新一下试试吧',
    src: 'https://image.ymm56.com/ymmfile/operation-biz/49c712cb-69cc-4e80-9ca8-d752605c403e.png',
  },
}

class Empty extends Component<EmptyProps> {
  public static defaultProps: EmptyProps
  public render(): JSX.Element {
    if (!this.props.show) return null
    // const copiedProps
    const { type, showBtn, btnText, onClick } = this.props
    const { src, title, desc } = {
      ...defaultDesc[type],
      ...this.props,
    }

    return (
      <ConfigConsumer>
        {({ careMode }) => {
          const [titleClz, descClz, btnClz, btnTextClz] = useClassesWithCare.single(
            careMode,
            'fta-empty-title__text',
            'fta-empty-desc__text',
            'fta-empty-button',
            'fta-empty-button__text'
          )
          return (
            <View className='fta-empty'>
              <Image className='fta-empty-image' src={src} mode='aspectFit'></Image>
              {title ? (
                <View className='fta-empty-title'>
                  <Text className={titleClz}>{title}</Text>
                </View>
              ) : null}
              {desc ? (
                <View className='fta-empty-desc'>
                  <Text className={descClz}>{desc}</Text>
                </View>
              ) : null}
              {showBtn ? (
                <TouchableOpacity activeOpacity={0.6} className={btnClz} onClick={onClick}>
                  <Text className={btnTextClz}>{btnText}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )
        }}
      </ConfigConsumer>
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
