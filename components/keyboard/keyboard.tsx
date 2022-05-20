import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { isNumber, isString } from '../../common'
import '../../style/components/keyboard/index.scss'
import { KeyboardButtonProps, KeyboardProps, KeyboardType, Validator } from '../../types/keyboard'
import ActionSheet from '../action-sheet'

/** 乱序排列 */
function disorderList<T = any>(list: T[], flag: boolean) {
  if (!flag) return list
  const newer: T[] = []
  const copied = list.slice()
  let len = copied.length
  while (len) {
    newer.push(copied.splice(~~(Math.random() * len), 1)[0])
    len = copied.length
  }
  return newer
}

function validate(value: string, validator: KeyboardProps['validator'], typing = true) {
  if (!validator) return true
  if (validator instanceof RegExp) {
    return validator.test(value)
  }
  if (typeof validator === 'function') {
    return validator(value, typing)
  }
  return true
}

const typePresets: KeyboardType[] = ['number', 'decimal', 'id']

const baseButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const presets = {
  number: [null, 0],
  decimal: ['.', 0],
  id: ['X', 0],
}

const Validators: Record<string, Validator> = {
  number: /^(([1-9]\d*)|(0))$/,
  decimal: (value, typing) => {
    return (
      typing ? /^(([1-9]\d*)|((0|([1-9]\d*))(\.\d*)))$/ : /^(([1-9]\d*)|((0|([1-9]\d*))(\.\d+)))$/
    ).test(value)
  },
  id: (value, typing) => {
    return (
      typing
        ? /(^\d{0,18}$)|(^\d{17}X?$)/i
        : /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    ).test(value)
  },
  phone: (value, typing) => {
    return (
      typing
        ? /^1\d{0,10}$/
        : /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    ).test(value)
  },
  // email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  // postcode: /^[1-9]\d{5}(?!\d)$/,
}

const InputAdapter = Text

function Keyboard(props: KeyboardProps): JSX.Element {
  const {
    type,
    hideInputBox,
    value,
    controlled,
    validator,
    disorder,
    placeholder,
    maxlength,
    onChange,
    onConfirm,
    customButtons,
    children,
    ...actionSheetProps
  } = props
  const [val, _setVal] = useState<string>(String(value))
  const isBasicType = typePresets.includes(type!)

  const setVal = (char: string, index?: number) => {
    const newVal = val + String(char)
    if (newVal.length > maxlength!) return
    if (controlled) return onChange!(newVal, val)

    const _validator = validator || (isBasicType ? Validators[type!] : void 0)
    if (validate(newVal, _validator)) {
      _setVal(newVal)
      onChange!(newVal, val)
    }
  }

  const buttons = useMemo(() => {
    const orderedButtons = isBasicType
      ? baseButtons.concat(presets[type!] as number[])
      : type === 'custom'
      ? customButtons
      : []
    // 是否打乱列表
    const _buttons = disorderList(orderedButtons!, disorder!)
    // 占位符固定
    if (type === 'number') {
      const pidx = _buttons.indexOf(null as unknown as number)
      _buttons.splice(pidx, 1)
      return _buttons
        .slice(0, 9)
        .concat(null as unknown as number)
        .concat(_buttons.slice(9))
    }
    return _buttons
  }, [disorder, type])

  useEffect(() => {
    if (controlled) {
      _setVal(String(value))
    }
  }, [value, controlled])

  const renderDeleteButton = () => (
    <KeyboardButton
      onClick={() => {
        const newVal = val.slice(0, -1)
        _setVal(newVal)
        onChange!(newVal, val)
      }}>
      <DeleteButton />
    </KeyboardButton>
  )

  const inputTextClz = classNames(
    'fta-keyboard-input__inner-text',
    placeholder && val === '' && 'fta-keyboard-placeholder'
  )

  const fullCustom = type === 'custom' && !customButtons?.length

  return (
    <ActionSheet
      {...actionSheetProps}
      onConfirm={() => onConfirm!(val, validate(val, validator!, false))}>
      <>
        {/* 显示区 */}
        {hideInputBox ? null : (
          <View className='fta-keyboard-input'>
            <View className='fta-keyboard-input__inner'>
              {/* <Text className='fta-keyboard-input__inner-text'>{val}</Text> */}
              <InputAdapter className={inputTextClz}>{val === '' ? placeholder : val}</InputAdapter>
            </View>
          </View>
        )}
        {/* 键盘区 */}
        <View className='fta-keyboard'>
          {fullCustom
            ? children
            : buttons.map((v, i) =>
                v == null ? (
                  <Placeholder key={i} />
                ) : (
                  <KeyboardButton _index={i} key={i} val={v} onClick={setVal}>
                    {v}
                  </KeyboardButton>
                )
              )}
          {fullCustom ? null : renderDeleteButton()}
        </View>
      </>
    </ActionSheet>
  )
}

/**
 * 输入按钮
 */
function KeyboardButton(props: KeyboardButtonProps): JSX.Element {
  const { onClick, val, _index, hoverStyle, children } = props

  return (
    <View
      className='fta-keyboard-item'
      hoverStyle={hoverStyle}
      hoverClass={'fta-keyboard-item--hover'}
      onClick={() => onClick?.(val, _index!)}
      // onLongClick={() => onLongClick?.(val, _index!)}>
    >
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
    <Image
      className='fta-keyboard-delete'
      src='https://imagecdn.ymm56.com/ymmfile/static/resource/a0c5fc81-80a0-47c9-ad55-e3fb8d875507.png'
    />
    // <View className='fta-keyboard-delete'>
    //   <View className='fta-keyboard-delete-triangle' />
    //   <View className='fta-keyboard-delete-square'>
    //     <Text className='fta-keyboard-delete__text'>×</Text>
    //   </View>
    // </View>
  )
}

const defaultProps: KeyboardProps = {
  value: '',
  controlled: false,
  hideInputBox: false,
  type: 'number',
  maxlength: 140,
  title: {
    title: '请输入',
    cancelText: '取消',
    confirmText: '确定',
  },
  isOpened: true,
  disorder: false,
  customButtons: [],
  onChange() {},
  onConfirm() {},
}

const defaultItemProps: KeyboardButtonProps = {
  hoverStyle: {
    backgroundColor: '#dddddd',
  },
}

KeyboardButton.defaultProps = defaultItemProps

Keyboard.defaultProps = defaultProps

Keyboard.DeleteButton = DeleteButton

Keyboard.Placeholder = Placeholder

Keyboard.validators = Validators

Keyboard.Button = KeyboardButton

export { Keyboard as default }
