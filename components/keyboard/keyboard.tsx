import { Text, View } from '@tarojs/components'
import React, { useState } from 'react'
import { isNumber, isString } from '../../common'
import '../../style/components/keyboard/index.scss'
import { KeyboardButtonProps, KeyboardProps, KeyboardType } from '../../types/keyboard'
import ActionSheet from '../action-sheet'

/** 乱序排列 */
function disorderList<T = any>(list: T[], flag: boolean) {
  if (flag) return list
  const newer: T[] = []
  const copied = list.slice()
  let len = copied.length
  while (len) {
    newer.push(copied.splice(~~(Math.random() * len), 1)[0])
    len = copied.length
  }
  return newer
}

const baseButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const Validators = {
  id: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  phone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  postcode: /^[1-9]\d{5}(?!\d)$/,
}

const keyboardTypes: Record<
  KeyboardType,
  {
    validator: KeyboardProps['validator']
  }
> = {
  number: {
    validator: /1/,
  },
}

function Keyboard(props: KeyboardProps): JSX.Element {
  const { type, input, validator = Validators.phone, disorder = true, ...actionSheetProps } = props
  const [val, setVal] = useState('320320320320320320')
  // const setVal = (newVal: string) => {
  //   if (newVal.length < val.length) return _setVal(newVal)
  //   let valid = true
  //   if (validator) {
  //     if (validator instanceof RegExp) {
  //       valid = validator.test(newVal)
  //     } else {
  //       valid = validator(newVal)
  //     }
  //   }
  //   if (valid) _setVal(newVal)
  // }
  const renderDeleteButton = () => (
    <KeyboardButton onClick={() => setVal(val.slice(0, -1))}>
      <DeleteButton />
    </KeyboardButton>
  )

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
          {baseButtons.map((v, i) => (
            <KeyboardButton
              key={i}
              val={v}
              index={i}
              onClick={(input) => setVal(val + String(input))}>
              {v}
            </KeyboardButton>
          ))}
          <KeyboardButton val={'.'} onClick={(input) => setVal(val + String(input))}>
            .
          </KeyboardButton>
          <KeyboardButton val={0} onClick={(input) => setVal(val + String(input))} />
          {renderDeleteButton()}
        </View>
      </>
    </ActionSheet>
  )
}

/**
 * 输入按钮
 */
function KeyboardButton(props: KeyboardButtonProps): JSX.Element {
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
        children || <Text className='fta-keyboard-item__text'>{val}</Text>
      )}
    </View>
  )
}

/**
 * 空白占位符
 */
function Placeholder(): JSX.Element {
  return <View className='fta-keyboard-item' />
}

/**
 * 删除按钮
 */
function DeleteButton(): JSX.Element {
  return (
    <View className='fta-keyboard-delete'>
      <View className='fta-keyboard-delete-triangle' />
      <View className='fta-keyboard-delete-square'>
        <Text className='fta-keyboard-delete__text'>×</Text>
      </View>
    </View>
  )
}

const defaultProps: KeyboardProps = {
  input: true,
  type: 'number',
  title: {
    title: '数字键盘',
    cancelText: '取消',
    confirmText: '确定',
  },
  isOpened: true,
}

const defaultItemProps: KeyboardButtonProps = {
  hoverStyle: {
    backgroundColor: '#dddddd',
  },
}

KeyboardButton.defaultProps = defaultItemProps

Keyboard.defaultProps = defaultProps

export { DeleteButton, Placeholder, KeyboardButton }

export default Keyboard
