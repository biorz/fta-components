import { Switch as TaroSwitch, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { CSSProperties } from 'react'
import { inRN, isString, Themes } from '../../common'
import '../../style/components/switch/index.scss'
// import { CommonEvent } from '@tarojs/components/types/common'
import { SwitchProps, SwitchState } from '../../types/switch'

export default class Switch extends React.Component<SwitchProps, SwitchState> {
  public static defaultProps: SwitchProps
  public static propTypes: InferProps<SwitchProps>

  private $ref: any

  public state: SwitchState = {
    checked: !!this.props.checked,
  }

  public componentDidUpdate(prevProps: SwitchProps, prevState: SwitchState) {
    if (
      prevState.checked === this.state.checked &&
      prevProps.checked !== this.props.checked &&
      this.state.checked !== this.props.checked
    ) {
      // console.log('切换')
      const willChecked = !!this.props.checked
      this.setState(
        {
          checked: willChecked,
        },
        () => {
          // RN端逻辑修复
          this.$ref?.onCheckedChange?.(willChecked)
        }
      )
    }
  }

  private handleChange = (event): void => {
    const { value, checked } = event.detail
    const state = typeof value === 'undefined' ? checked : value
    this.setState({ checked: state }, () => {
      this.props.onChange?.(state)
    })
  }

  public render(): JSX.Element {
    const { customStyle, className, disabled, border, title, color, rnProps } = this.props

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
    const swithStyle: CSSProperties = inRN
      ? {
          backgroundColor: this.state.checked ? color : disabled ? '#ccc' : '#efefef',
        }
      : {}

    const extraProps = inRN
      ? {
          width: 52,
          height: 32,
        }
      : {}

    const switchClz = classNames('fta-switch__switch', disabled && 'switch--disabled')
    const switchElm = (
      <View className={containerCls}>
        {disabled && <View className='fta-switch__mask'></View>}
        <TaroSwitch
          ref={(ref) => (this.$ref = ref)}
          style={swithStyle}
          disabled={disabled}
          className={switchClz}
          checked={this.state.checked}
          color={inRN ? Themes.color.white : color}
          onChange={this.handleChange}
          {...extraProps}
          {...(inRN ? rnProps : {})}
        />
      </View>
    )

    if (!title) return switchElm

    return (
      <View className={rootCls} style={customStyle}>
        {isString(title) ? <Text className='fta-switch__title'>{title}</Text> : title}
        {switchElm}
      </View>
    )
  }
}

Switch.defaultProps = {
  customStyle: {},
  className: '',
  title: '',
  color: Themes.color.brand,
  border: true,
  disabled: false,
  checked: false,
  rnProps: {},
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
  rnProps: PropTypes.object,
}
