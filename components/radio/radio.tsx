import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
// TODO: icon
import '../../style/components/icon/index.scss'
import '../../style/components/radio/index.scss'
import { RadioOption, RadioProps } from '../../types/radio'

export default class Radio extends React.Component<RadioProps<any>> {
  public static defaultProps: RadioProps<any>
  public static propTypes: InferProps<RadioProps<any>>

  private handleClick(option: RadioOption<any>, event: CommonEvent): void {
    if (option.disabled) return
    this.props.onClick(option.value, event)
  }

  public render(): JSX.Element {
    const { customStyle, className, options, value } = this.props

    return (
      <View className={classNames('fta-radio', className)} style={customStyle}>
        {options.map((option) => (
          <View
            key={option.value}
            onClick={this.handleClick.bind(this, option)}
            className={classNames({
              'fta-radio__option': true,
              'fta-radio__option--disabled': option.disabled,
            })}>
            <View className='fta-radio__option-wrap'>
              <View className='fta-radio__option-container'>
                <View className='fta-radio__title'>{option.label}</View>
                <View
                  className={classNames({
                    'fta-radio__icon': true,
                    'fta-radio__icon--checked': value === option.value,
                  })}>
                  <Text className='fta-icon fta-icon-check'></Text>
                </View>
              </View>
              {option.desc && <View className='fta-radio__desc'>{option.desc}</View>}
            </View>
          </View>
        ))}
      </View>
    )
  }
}

Radio.defaultProps = {
  customStyle: '',
  className: '',
  value: '',
  options: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: (): void => {},
}

Radio.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
}
