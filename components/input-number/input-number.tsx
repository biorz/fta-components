import { Input, Text, View } from '@tarojs/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import _toString from 'lodash.tostring'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { px as pxTransform } from '../../common'
import '../../style/components/input-number/index.scss'
import { InputError, InputNumberProps } from '../../types/input-number'
// TODO: Check all types

// 实现两数相加并保留小数点后最短尾数
function addNum(num1: number, num2: number): number {
  let sq1: number, sq2: number
  try {
    sq1 = _toString(num1).split('.')[1].length
  } catch (e) {
    sq1 = 0
  }
  try {
    sq2 = _toString(num2).split('.')[1].length
  } catch (e) {
    sq2 = 0
  }
  const m = Math.pow(10, Math.max(sq1, sq2))
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m
}

// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num: string): string {
  if (num === '') return '0'

  const numStr = _toString(num)
  if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
    // 处理01变成1,并且不处理1.
    return _toString(parseFloat(num))
  }
  return _toString(num)
}

type ExtendEvent = {
  target: {
    value: string | number
  }
}

export default class InputNumber extends React.Component<InputNumberProps> {
  public static defaultProps: InputNumberProps
  public static propTypes: InferProps<InputNumberProps>

  private handleClick(clickType: 'minus' | 'plus', e: CommonEvent): void {
    const { disabled, value, min = 0, max = 100, step = 1 } = this.props
    const lowThanMin = clickType === 'minus' && value <= min
    const overThanMax = clickType === 'plus' && value >= max
    if (lowThanMin || overThanMax || disabled) {
      const deltaValue = clickType === 'minus' ? -step : step
      const errorValue = addNum(Number(value), deltaValue)
      if (disabled) {
        this.handleError({
          type: 'DISABLED',
          errorValue,
        })
      } else {
        this.handleError({
          type: lowThanMin ? 'LOW' : 'OVER',
          errorValue,
        })
      }
      return
    }
    const deltaValue = clickType === 'minus' ? -step : step
    let newValue = addNum(Number(value), deltaValue)
    newValue = Number(this.handleValue(newValue))
    this.props.onChange(newValue, e)
  }

  private handleValue = (value: string | number): string => {
    const { max = 100, min = 0 } = this.props
    let resultValue = value === '' ? min : value
    // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
    if (resultValue > max) {
      resultValue = max
      this.handleError({
        type: 'OVER',
        errorValue: resultValue,
      })
    }
    if (resultValue < min) {
      resultValue = min
      this.handleError({
        type: 'LOW',
        errorValue: resultValue,
      })
    }
    if (resultValue && !Number(resultValue)) {
      resultValue = parseFloat(String(resultValue)) || min

      this.handleError({
        type: 'OVER',
        errorValue: resultValue,
      })
    }

    resultValue = parseValue(String(resultValue))
    return resultValue
  }

  private handleInput = (e: CommonEvent & ExtendEvent): string => {
    const { value } = e.target
    const { disabled } = this.props
    if (disabled) return ''

    const newValue = this.handleValue(value)
    this.props.onChange(Number(newValue), e)
    return newValue
  }

  private handleBlur = (event: ITouchEvent): void => this.props.onBlur && this.props.onBlur(event)

  private handleError = (errorValue: InputError): void => {
    if (!this.props.onErrorInput) {
      return
    }
    this.props.onErrorInput(errorValue)
  }

  public render(): JSX.Element {
    const {
      customStyle,
      className,
      width,
      disabled,
      value,
      type,
      min = 0,
      max = 100,
      size,
      disabledInput,
    } = this.props

    const inputStyle = width
      ? {
          width: pxTransform(width),
        }
      : {}
    const inputValue = Number(this.handleValue(value))
    const rootCls = classNames(
      'fta-input-number',
      {
        'fta-input-number--lg': size === 'large',
      },
      className
    )
    const minusBtnCls = classNames('fta-input-number__btn', {
      'fta-input-number--disabled': inputValue <= min || disabled,
    })
    const plusBtnCls = classNames('fta-input-number__btn', {
      'fta-input-number--disabled': inputValue >= max || disabled,
    })

    return (
      <View className={rootCls} style={customStyle}>
        <Text className={minusBtnCls} onClick={this.handleClick.bind(this, 'minus')}>
          -
        </Text>
        <Input
          className='fta-input-number__input'
          style={inputStyle}
          type={type}
          value={String(inputValue)}
          disabled={disabledInput || disabled}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
        />
        <Text className={plusBtnCls} onClick={this.handleClick.bind(this, 'plus')}>
          +
        </Text>
      </View>
    )
  }
}

InputNumber.defaultProps = {
  customStyle: {},
  className: '',
  disabled: false,
  disabledInput: false,
  value: 1,
  type: 'number',
  width: 0,
  min: 0,
  max: 100,
  step: 1,
  size: 'normal',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {},
}

InputNumber.propTypes = {
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['number', 'digit']),
  disabled: PropTypes.bool,
  width: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  size: PropTypes.oneOf(['normal', 'large']),
  disabledInput: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onErrorInput: PropTypes.func,
}
