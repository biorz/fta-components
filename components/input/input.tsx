import { Input, Label, Text, View } from '@tarojs/components'
import { BaseEventOrig, ITouchEvent } from '@tarojs/components/types/common'
import { InputProps } from '@tarojs/components/types/Input'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { inRN } from '../../common'
import '../../style/components/input/index.scss'
import {
  BlurEventDetail,
  ConfirmEventDetail,
  FocusEventDetail,
  InputEventDetail,
  InputProps as FTAInputProps,
  KeyboardHeightEventDetail,
} from '../../types/input'

type PickFTAInputProps = Pick<FTAInputProps, 'maxlength' | 'disabled' | 'password'>
type GetInputPropsReturn = PickFTAInputProps & Pick<InputProps, 'type'>

function getInputProps(props: FTAInputProps): GetInputPropsReturn {
  const actualProps = {
    type: props.type,
    maxlength: props.maxlength,
    disabled: props.disabled,
    password: false,
  }

  switch (actualProps.type) {
    case 'phone':
      actualProps.type = 'number'
      actualProps.maxlength = 11
      break
    case 'password':
      actualProps.type = 'text'
      actualProps.password = true
      break
    default:
      break
  }
  if (!props.disabled && !props.editable) {
    actualProps.disabled = true
  }
  return actualProps as GetInputPropsReturn
}

export default class FTAInput extends React.Component<FTAInputProps> {
  public static defaultProps: FTAInputProps
  public static propTypes: InferProps<FTAInputProps>
  // TODO: 有待考证是否为合理方式处理 #840
  private inputClearing = false

  private handleInput = (event: BaseEventOrig<InputEventDetail>): void =>
    // @ts-ignore
    this.props.onChange(event.detail.value, event)

  private handleFocus = (event: BaseEventOrig<FocusEventDetail>): void => {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event.detail.value, event)
    }
  }

  private handleBlur = (event: BaseEventOrig<BlurEventDetail>): void => {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event.detail.value, event)
    }
    if (event.type === 'blur' && !this.inputClearing) {
      // @ts-ignore
      // fix # 583 FTAInput 不触发 onChange 的问题
      this.props.onChange(event.detail.value, event as BaseEventOrig<InputEventDetail>)
    }
    // 还原状态
    this.inputClearing = false
  }

  private handleConfirm = (event: BaseEventOrig<ConfirmEventDetail>): void => {
    if (typeof this.props.onConfirm === 'function') {
      this.props.onConfirm(event.detail.value, event)
    }
  }

  private handleClick = (event: ITouchEvent): void => {
    if (!this.props.editable && typeof this.props.onClick === 'function') {
      this.props.onClick(event)
    }
  }

  private handleClearValue = (event: ITouchEvent): void => {
    this.inputClearing = true
    // @ts-ignore
    this.props.onChange('', event)
  }

  private handleKeyboardHeightChange = (event: BaseEventOrig<KeyboardHeightEventDetail>): void => {
    if (typeof this.props.onKeyboardHeightChange === 'function') {
      this.props.onKeyboardHeightChange(event)
    }
  }

  private handleErrorClick = (event: ITouchEvent): void => {
    if (typeof this.props.onErrorClick === 'function') {
      this.props.onErrorClick(event)
    }
  }

  public render(): JSX.Element {
    const {
      className,
      customStyle,
      name,
      cursorSpacing,
      confirmType,
      cursor,
      selectionStart,
      selectionEnd,
      adjustPosition,
      border,
      title,
      error,
      clear,
      placeholder,
      placeholderStyle,
      placeholderClass,
      autoFocus,
      focus,
      value,
      required,
    } = this.props
    const { type, maxlength, disabled, password } = getInputProps(this.props)

    const rootCls = classNames(
      'fta-input',
      {
        'fta-input--without-border': !border,
      },
      className
    )
    const containerCls = classNames('fta-input__container', {
      'fta-input--error': error,
      'fta-input--disabled': disabled,
    })
    const overlayCls = classNames('fta-input__overlay', {
      'fta-input__overlay--hidden': !disabled,
    })
    const placeholderCls = classNames('placeholder', placeholderClass)

    const id = name && { id: name }
    return (
      <View className={rootCls} style={customStyle}>
        <View className={containerCls}>
          <View className={overlayCls} onClick={this.handleClick}></View>
          {title && (
            <Label
              className={`fta-input__title ${required && !inRN && 'fta-input__title--required'} ${
                error && inRN && 'fta-input--error'
              }`}
              for={name}>
              {required && inRN ? <Text className='fta-input__title--required'>*</Text> : null}
              {title}
            </Label>
          )}
          <Input
            className='fta-input__input'
            {...id}
            name={name}
            type={type}
            disabled={disabled}
            password={password}
            placeholderStyle={placeholderStyle}
            placeholderClass={placeholderCls}
            placeholder={placeholder}
            cursorSpacing={cursorSpacing}
            maxlength={maxlength}
            autoFocus={autoFocus}
            focus={focus}
            value={value}
            confirmType={confirmType}
            cursor={cursor}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            adjustPosition={adjustPosition}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onConfirm={this.handleConfirm}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onKeyboardHeightChange={this.handleKeyboardHeightChange}
          />
          {clear && value && (
            <View className='fta-input__icon' onTouchEnd={this.handleClearValue}>
              <Text className='fta-icon fta-icon-close-circle fta-input__icon-close'></Text>
            </View>
          )}
          {error && (
            <View className='fta-input__icon' onTouchStart={this.handleErrorClick}>
              <Text className='fta-icon fta-icon-alert-circle fta-input__icon-alert'></Text>
            </View>
          )}
          <View className='fta-input__children'>{this.props.children}</View>
        </View>
      </View>
    )
  }
}

FTAInput.defaultProps = {
  className: '',
  customStyle: {},
  value: '',
  name: '',
  placeholder: '',
  placeholderStyle: '',
  placeholderClass: '',
  title: '',
  cursorSpacing: 50,
  confirmType: 'done',
  // cursor: 0,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  maxlength: 140,
  type: 'text',
  disabled: false,
  border: true,
  editable: true,
  error: false,
  clear: false,
  autoFocus: false,
  focus: false,
  required: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {},
}

FTAInput.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.string,
  placeholderClass: PropTypes.string,
  title: PropTypes.string,
  confirmType: PropTypes.string,
  cursor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectionStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectionEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  adjustPosition: PropTypes.bool,
  cursorSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  border: PropTypes.bool,
  editable: PropTypes.bool,
  error: PropTypes.bool,
  clear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onConfirm: PropTypes.func,
  onErrorClick: PropTypes.func,
  onClick: PropTypes.func,
  required: PropTypes.bool,
}

// todo: icon兼容，键盘优化
