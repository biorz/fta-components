import { Text, View } from '@tarojs/components'
import React, { useState } from 'react'
import { isNumber, isString } from '../../common'
import '../../style/components/keyboard/index.scss'
import { KeyboardItemProps, KeyboardProps } from '../../types/keyboard'
import ActionSheet from '../action-sheet'

const Types = {}

function Keyboard(props: KeyboardProps) {
  const { type, input, ...actionSheetProps } = props
  const [val, setVal] = useState('320320320320320320')
  return (
    <ActionSheet {...actionSheetProps}>
      <>
        {/* 显示区 */}
        {input ? (
          <View className='fta-keyboard-input'>
            <View className='fta-keyboard-input__inner'>
              <Text className='fta-keyboard-input__inner-text'>{val}</Text>
            </View>
          </View>
        ) : null}
        {/* 键盘区 */}
        <View className='fta-keyboard'>
          {new Array(9).fill(null).map((v, i) => (
            <KeyboardItem key={i} val={i + 1} index={i}>
              {i + 1}
            </KeyboardItem>
          ))}
        </View>
      </>
    </ActionSheet>
  )
}

function KeyboardItem(props: KeyboardItemProps) {
  const { onClick, onLongClick, val, index, hoverStyle, children } = props

  return (
    <View
      className='fta-keyboard-item'
      hoverStyle={hoverStyle}
      hoverClass={'fta-keyboard-item--hover'}
      onClick={() => onClick?.(val, index!)}
      onLongClick={() => onLongClick?.(val, index!)}>
      {isString(children) || isNumber(children) ? (
        <Text className='fta-keyboard-item__text'>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
}

const defaultProps: KeyboardProps = {
  input: true,
  type: 'number',
  title: {
    title: '请输入',
    cancelText: '取消',
    confirmText: '确定',
  },
  isOpened: true,
}

const defaultItemProps: KeyboardItemProps = {
  hoverStyle: {
    backgroundColor: '#dddddd',
  },
}

KeyboardItem.defaultProps = defaultItemProps

Keyboard.defaultProps = defaultProps

export default Keyboard
