import { Switch as TaroSwitch, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import '../../style/components/switch/index.scss'
// import { CommonEvent } from '@tarojs/components/types/common'
import { SwitchProps } from '../../types/switch'

export default class Switch extends React.Component<SwitchProps> {
  public static defaultProps: SwitchProps
  public static propTypes: InferProps<SwitchProps>

  private handleChange = (event): void => {
    const { value, checked } = event.detail
    const state = typeof value === 'undefined' ? checked : value
    this.props.onChange && this.props.onChange(state)
  }

  public render(): JSX.Element {
    const { customStyle, className, disabled, border, title, checked, color } = this.props

    const rootCls = classNames(
      'fta-switch',
      {
        'fta-switch--without-border': !border,
      },
      className
    )
    const containerCls = classNames('fta-switch__container', {
      'fta-switch--disabled': disabled,
    })

    return (
      <View className={rootCls} style={customStyle}>
        <View className='fta-switch__title'>{title}</View>
        <View className={containerCls}>
          <View className='fta-switch__mask'></View>
          <TaroSwitch
            disabled={disabled}
            className='fta-switch__switch'
            checked={checked}
            color={color}
            onChange={this.handleChange}
          />
        </View>
      </View>
    )
  }
}

Switch.defaultProps = {
  customStyle: '',
  className: '',
  title: '',
  color: '#6190e8',
  border: true,
  disabled: false,
  checked: false,
}

Switch.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  title: PropTypes.string,
  color: PropTypes.string,
  checked: PropTypes.bool,
  border: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}
