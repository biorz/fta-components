import React, { FC } from 'react'
import { View, Image } from '@tarojs/components'
import { CellProps } from '../types'
import './index.scss'
/**
 * 单元格，可用作展示列表信息、链接或者表单等。
 * @param props
 * @returns
 */
const Cell: FC<CellProps> = (props) => {
  const { label, value, placeholder, align, lineClamp, isLink, icon, handleClick } = props
  const alignMap = {
    left: 'flex-start',
    right: 'flex-end',
  }

  const renderLabel = () => {
    if (!label) return null
    return <View className='fta-cell-label'>{label}</View>
  }

  // 渲染value部分
  const renderContent = () => {
    let lineClampStyle = lineClamp ? `-webkit-line-clamp: ${lineClamp}` : ''
    return (
      <View className='fta-cell-content'>
        <View
          className={`${value ? 'fta-cell-value' : 'fta-cell-placeholder'}`}
          style={`justify-content: ${alignMap[align]}`}>
          <View className='fta-cell-text' style={lineClampStyle}>
            {value || placeholder}
          </View>
        </View>
      </View>
    )
  }

  // 渲染跳转icon
  const renderLinkIcon = () => {
    if (icon) return icon
    if (!isLink) return null
    return (
      <Image
        src='https://image.ymm56.com/ymmfile/operation-biz/c49eb8ae-73ff-4db5-9084-c5aca597dc2b.png'
        className='fta-cell-link'
      />
    )
  }

  return (
    <View className='fta-cell' onClick={handleClick}>
      {renderLabel()}
      {renderContent()}
      {renderLinkIcon()}
    </View>
  )
}

Cell.defaultProps = {
  label: '',
  value: '',
  icon: null,
  align: 'left',
  placeholder: '请填写',
  lineClamp: 0,
  isLink: false,
  handleClick: () => {},
}

export default Cell
