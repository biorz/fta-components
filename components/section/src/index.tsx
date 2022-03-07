import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Section extends Component<any> {
  static defaultProps: any
  state = {
    selected: this.props.list[0],
    itemBgStyle: {
      width: '0px',
      left: '0px',
      backgroundColor: '',
      height: '100%',
      transition: '',
    },
    listInfo: [],
    currentIndex: 0,
    randomNumber: '',
  }
  // 外层样式
  subsectionStyle() {
    let style: any = {}
    const {
      mode = 'button',
      height = 35,
      bgColor = '#eeeeef',
      buttonPadding = 4,
      borderRadius = 5,
    } = this.props
    style.height = `${height}px`
    if (mode === 'button') {
      style.backgroundColor = bgColor
      style.padding = `${buttonPadding}px`
      style.borderRadius = `${borderRadius}px`
    }
    return style
  }
  // 每个分段器item的样式
  itemStyle() {
    let style: any = {}
    const { mode = 'button', activeColor = '#303133' } = this.props
    if (mode == 'subsection') {
      // 设置border的样式
      style.borderColor = activeColor
      style.borderWidth = '1px'
      style.borderStyle = 'solid'
    }
    return style
  }
  // 滑块的样式
  itemBarStyle() {
    let style: any = {}
    const {
      mode = 'button',
      activeColor = '#303133',
      buttonColor = '#fff',
      borderRadius = 5,
      buttonPadding = 4,
      height = 35,
    } = this.props
    style.backgroundColor = activeColor
    style.zIndex = 1
    if (mode == 'button') {
      style.backgroundColor = buttonColor
      style.borderRadius = `${borderRadius}px`
      style.bottom = `${buttonPadding}px`
      style.height = height - buttonPadding * 2 + 'px'
      style.zIndex = 0
    }
    const _itemBgStyle = this.itemBgLeft()
    return Object.assign(_itemBgStyle, style)
  }
  // 文字的样式
  textStyle(index: Number) {
    let style: any = {}
    const {
      mode = 'button',
      activeColor = '#303133',
      inactiveColor = '#606266',
      bold = true,
      fontSize = 14,
    } = this.props
    const { currentIndex } = this.state
    // 设置字体颜色
    if (mode === 'subsection') {
      if (index == currentIndex) {
        style.color = '#ffffff'
      } else {
        style.color = activeColor
      }
    } else {
      if (index == currentIndex) {
        style.color = activeColor
      } else {
        style.color = inactiveColor
      }
    }
    // 字体加粗
    if (index == currentIndex && bold) style.fontWeight = 'bold'
    // 文字大小
    style.fontSize = fontSize + 'px'
    return style
  }
  componentDidMount() {
    // 将list的数据，传入listInfo数组，因为不能修改props传递的list值
    // 可以接受直接数组形式，或者数组元素为对象的形式，如：['简介', '评论'],或者[{name: '简介'}, {name: '评论'}]
    let listInfo = this.props.list.map((val: any) => {
      if (typeof val != 'object') {
        let obj = {
          width: 0,
          name: val,
        }
        return obj
      } else {
        val.width = 0
        return val
      }
    })
    this.setState(
      {
        listInfo,
        randomNumber: Math.round(Math.random() * 1000) * Math.round(Math.random() * 1000),
      },
      () => {
        setTimeout(() => {
          this.getTabsInfo()
        }, 100)
      }
    )
  }
  // 获取各个tab的节点信息
  getTabsInfo = () => {
    const { mode = 'button' } = this.props
    const { randomNumber } = this.state
    let view = Taro.createSelectorQuery()
    for (let i = 0; i < this.props.list.length; i++) {
      view.select(`.u-item-${randomNumber}-${i}`).boundingClientRect()
    }
    view.exec((res) => {
      let _listInfo: any = this.state.listInfo
      let _itemBgStyle = this.state.itemBgStyle
      // 将分段器每个item的宽度，放入listInfo数组
      res.map((val: any, index: number) => {
        _listInfo[index].width = val.width
      })
      // debugger
      // 初始化滑块的宽度
      if (mode == 'subsection') {
        _itemBgStyle.width = _listInfo[0].width + 'px'
      } else if (mode == 'button') {
        _itemBgStyle.width = _listInfo[0].width + 'px'
      }
      this.setState({ itemBgStyle: _itemBgStyle, listInfo: _listInfo }, () => {
        this.itemBgLeft()
      })
      // 初始化滑块的位置
    })
  }
  click(index: number) {
    const { currentIndex } = this.state
    // 不允许点击当前激活选项
    if (index == currentIndex) return
    this.setState({ currentIndex: index })
    this.changeSectionStatus(index)
    // this.$emit('change', Number(index))
    this.props.onChange(this.props.list[index], index)
  }
  // 改变滑块的样式
  changeSectionStatus(nVal: number) {
    const { mode = 'button', list, buttonPadding = 0 } = this.props
    const _itemBgStyle: any = this.state.itemBgStyle
    if (mode == 'subsection') {
      // 根据滑块在最左边和最右边时，显示左边和右边的圆角
      if (nVal == list.length - 1) {
        _itemBgStyle.borderRadius = `0 ${buttonPadding}px ${buttonPadding}px 0`
      }
      if (nVal == 0) {
        _itemBgStyle.borderRadius = `${buttonPadding}px 0 0 ${buttonPadding}px`
      }
      if (nVal > 0 && nVal < list.length - 1) {
        _itemBgStyle.borderRadius = '0'
      }
    }
    this.setState({ itemBgStyle: _itemBgStyle })
    // 更新滑块的位置
    setTimeout(() => {
      const _itemBgStyle = this.itemBgLeft()
      this.setState({ itemBgStyle: _itemBgStyle })
    }, 10)
  }

  itemBgLeft() {
    const { mode = 'button', buttonPadding = 0 } = this.props
    let _itemBgStyle = this.state.itemBgStyle
    _itemBgStyle.transition = 'all 0.35s'
    const { listInfo } = this.state
    let left = 0
    // 计算当前活跃item到组件左边的距离
    listInfo.map((val: any, index) => {
      if (index < this.state.currentIndex) left += val.width
    })
    // 根据mode不同模式，计算滑块需要移动的距离
    if (mode == 'subsection') {
      _itemBgStyle.left = left + 'px'
    } else if (mode == 'button') {
      _itemBgStyle.left = left + buttonPadding + 'px'
    }
    return _itemBgStyle
    // this.setState({ itemBgStyle: _itemBgStyle })
  }
  render() {
    const { listInfo, randomNumber } = this.state
    // this.itemBgLeft()
    return (
      <View className='fta-subsection' style={this.subsectionStyle()}>
        {listInfo.map((item: any, index: number) => (
          <View
            key={index}
            style={this.itemStyle()}
            className={`u-item u-line-1 u-item-${randomNumber}-${index}`}
            onClick={() => this.click(index)}>
            <View style={this.textStyle(index)} className='u-item-text u-line-1'>
              {`${item.name}`}
            </View>
          </View>
        ))}
        <View className='u-item-bg' style={this.itemBarStyle()}></View>
      </View>
    )
  }
}
Section.defaultProps = {
  mode: 'button',
  buttonPadding: 4,
  borderRadius: 5,
  fontSize: 14,
  bgColor: '#eeeeef',
  activeColor: '#303133',
  inactiveColor: '#606266',
}
