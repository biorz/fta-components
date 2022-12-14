import { Text, Textarea as TaroTextArea, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { pxTransform } from '../../common'
import '../../style/components/textarea/index.scss'
import { TextareaProps } from '../../types/textarea'

type ExtendEvent = {
  target: {
    value: string
  }
}

function getMaxLength(maxLength: number, textOverflowForbidden: boolean): number {
  if (!textOverflowForbidden) {
    return maxLength + 500
  }
  return maxLength
}

const ENV = Taro.getEnv()

export default class Textarea extends React.Component<TextareaProps> {
  public static defaultProps: TextareaProps
  public static propTypes: InferProps<TextareaProps>

  private handleInput = (event: CommonEvent & ExtendEvent): void => {
    this.props.onChange(event.target.value, event)
  }

  private handleFocus = (event: CommonEvent): void => {
    this.props.onFocus && this.props.onFocus(event)
  }

  private handleBlur = (event: CommonEvent): void => {
    this.props.onBlur && this.props.onBlur(event)
  }

  private handleConfirm = (event: CommonEvent): void => {
    this.props.onConfirm && this.props.onConfirm(event)
  }

  private handleLinechange = (event: CommonEvent): void => {
    this.props.onLinechange && this.props.onLinechange(event)
  }

  public render(): JSX.Element {
    const {
      customStyle,
      className,
      value,
      cursorSpacing,
      placeholder,
      placeholderStyle = { color: 'red' },
      placeholderClass,
      maxLength = 200,
      count,
      disabled,
      autoFocus,
      focus,
      showConfirmBar,
      selectionStart,
      selectionEnd,
      fixed,
      textOverflowForbidden = true,
      height,
      title,
    } = this.props

    const _maxLength = parseInt(maxLength.toString())
    const actualMaxLength = getMaxLength(_maxLength, textOverflowForbidden)
    const textareaStyle = height ? `height:${pxTransform(Number(height))}` : ''
    const rootCls = classNames('fta-textarea', `fta-textarea--${ENV}`, className)
    const placeholderCls = classNames('placeholder', placeholderClass)
    return (
      <View className={rootCls} style={customStyle}>
        {title ? <Text>{title}</Text> : null}
        <TaroTextArea
          className='fta-textarea__textarea'
          style={textareaStyle}
          // @ts-ignore
          placeholderStyle={placeholderStyle}
          placeholderClass={placeholderCls}
          cursorSpacing={cursorSpacing}
          value={value}
          maxlength={actualMaxLength}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          focus={focus}
          showConfirmBar={showConfirmBar}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          fixed={fixed}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onConfirm={this.handleConfirm}
          onLineChange={this.handleLinechange}
        />
        {count && (
          <View className='fta-textarea__counter'>
            <Text
              className={classNames(
                'fta-textarea__counter-current',
                value.length == _maxLength && `fta-textarea__counter-full`
              )}>
              {value.length}
            </Text>
            <Text className='fta-textarea__counter-limit'>/{_maxLength}</Text>
          </View>
        )}
      </View>
    )
  }
}

Textarea.defaultProps = {
  customStyle: {},
  className: '',
  value: '',
  cursorSpacing: 100,
  maxLength: 200,
  placeholder: '',
  disabled: false,
  autoFocus: false,
  focus: false,
  showConfirmBar: false,
  selectionStart: -1,
  selectionEnd: -1,
  count: true,
  fixed: false,
  height: '',
  textOverflowForbidden: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {},
}

Textarea.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.string.isRequired,
  cursorSpacing: PropTypes.number,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholderClass: PropTypes.string,
  placeholderStyle: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  focus: PropTypes.bool,
  showConfirmBar: PropTypes.bool,
  selectionStart: PropTypes.number,
  selectionEnd: PropTypes.number,
  count: PropTypes.bool,
  textOverflowForbidden: PropTypes.bool,
  fixed: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLinechange: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onConfirm: PropTypes.func,
}
