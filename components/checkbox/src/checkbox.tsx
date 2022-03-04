import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { CheckboxProps } from '../types'
import './style/index.scss'

export default class Checkbox extends React.Component<CheckboxProps<any>> {
  public static defaultProps: CheckboxProps<any>
  public static propTypes: InferProps<CheckboxProps<any>>

  private handleClick(idx: number): void {
    const { selectedList, options } = this.props
    const option = options[idx]
    const { disabled, value } = option
    if (disabled) return

    const selectedSet = new Set(selectedList)
    if (!selectedSet.has(value)) {
      selectedSet.add(value)
    } else {
      selectedSet.delete(value)
    }
    this.props.onChange([...selectedSet])
  }

  public render(): JSX.Element {
    const { customStyle, className, options, selectedList } = this.props

    const rootCls = classNames('fta-checkbox', className)

    return (
      <View className={rootCls} style={customStyle}>
        {options.map((option, idx) => {
          const { value, disabled, label, desc } = option
          const selected = selectedList.includes(value)
          const optionCls = classNames('fta-checkbox__option', {
            'fta-checkbox__option--disabled': disabled,
            'fta-checkbox__option--selected': selected,
          })
          console.log('disabled', disabled, optionCls, rootCls)
          const iconCntCls = classNames('fta-checkbox__icon-cnt', {
            'fta-checkbox__icon-cnt--selected': selected,
          })
          return (
            <View className={optionCls} key={value} onClick={this.handleClick.bind(this, idx)}>
              <View className='fta-checkbox__option-wrap'>
                <View className='fta-checkbox__option-cnt'>
                  <View className={iconCntCls}>
                    <Text className='fta-icon fta-icon-check'></Text>
                  </View>
                  <View className='fta-checkbox__title'>{label}</View>
                </View>
                {desc && <View className='fta-checkbox__desc'>{desc}</View>}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

Checkbox.defaultProps = {
  customStyle: '',
  className: '',
  options: [],
  selectedList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {},
}

Checkbox.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.array,
  selectedList: PropTypes.array,
  onChange: PropTypes.func,
}
