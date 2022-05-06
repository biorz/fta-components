import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { FC, ReactElement, ReactNode, useState } from 'react'
import { Assets, isUndef } from '../../common'
import '../../style/components/radio/index.scss'
import { RadioProps, SimpleRadioProps } from '../../types/radio'

class Radio<T extends any = any> extends React.Component<RadioProps<T>> {
  public static defaultProps: RadioProps<unknown>
  public static propTypes: InferProps<RadioProps<unknown>>
  public static Simple: FC<SimpleRadioProps>

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  private handleClick(idx: number): void {
    const option = this.props.options[idx]
    const { disabled, value } = option
    if (disabled) return

    this.props.onClick(value)
  }

  public render(): JSX.Element {
    const {
      customStyle,
      // @ts-ignore
      style,
      className,
      options,
      icon,
      disabledIcon,
      selectedIcon,
      selectedDidsabledIcon,
      type,
      value,
    } = this.props

    const rootCls = classNames('fta-radio', `fta-radio--${type}`, className)

    return (
      <View className={rootCls} style={{ ...style, ...customStyle }}>
        {options.map((option, idx) => {
          let presentIcon: ReactNode
          const { disabled, label, desc } = option
          const selected = value === option.value
          if (selected) {
            presentIcon = disabled ? selectedDidsabledIcon : selectedIcon
          } else {
            presentIcon = disabled ? disabledIcon : icon
          }
          const optionCls = classNames('fta-radio__option', `fta-radio__option--${type}`, {
            'fta-radio__option--disabled': disabled,
            'fta-radio__option--selected': selected,
          })
          const iconCntCls = classNames('fta-radio__icon-cnt', `fta-radio__icon-cnt--${type}`, {
            'fta-radio__icon-cnt--selected': selected,
            'fta-radio__icon-cnt--disabled': disabled,
          })
          const titleClz = classNames(
            'fta-radio__title',
            selected && 'fta-radio__title--selected',
            disabled && 'fta-radio__title--disabled'
          )
          const descClz = classNames(
            'fta-radio__desc',
            selected && 'fta-radio__desc--selected',
            disabled && 'fta-radio__desc--disabled'
          )
          return (
            <View className={optionCls} key={idx} onClick={() => this.handleClick(idx)}>
              {isUndef(presentIcon) ? (
                <View className={iconCntCls}>
                  <Image className='fta-radio-icon' src={Assets.check.default} />
                </View>
              ) : (
                presentIcon
              )}

              <View className='fta-radio-content'>
                <Text className={titleClz}>{label}</Text>
                {desc && <Text className={descClz}>{desc}</Text>}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

function SimpleRadio(props: SimpleRadioProps): JSX.Element {
  const {
    active,
    disabled,
    icon,
    disabledIcon,
    selectedIcon,
    selectedDidsabledIcon,
    controlled,
    onChange,
    children,
  } = props
  const [_active, setActive] = useState(active)

  const checked = controlled ? active : _active

  const onClick = () => {
    if (disabled) return
    if (!controlled) {
      setActive(!checked)
    }
    onChange!(!checked)
  }

  let presentIcon: ReactNode

  if (checked) {
    presentIcon = disabled ? selectedDidsabledIcon || selectedIcon : selectedIcon
  } else {
    presentIcon = disabled ? disabledIcon || icon : icon
  }

  const rootClass = classNames(
    'fta-radio-simple-container',
    disabled &&
      (presentIcon === icon || presentIcon === selectedIcon) &&
      'fta-radio-simple-container--disabled'
  )

  return (
    <View className={rootClass} onClick={onClick}>
      {presentIcon as ReactElement}
      {children}
    </View>
  )
  // return <View className='fta-radio-simple' />
}

const simpleRadioImage = <Image className='fta-radio-simple-image' src={Assets.check.default} />

SimpleRadio.defaultProps = {
  icon: <View className='fta-radio-simple fta-radio-simple--normal' />,
  selectedIcon: (
    <View className='fta-radio-simple fta-radio-simple--selected'>{simpleRadioImage}</View>
  ),
  onChange() {},
}

Radio.defaultProps = {
  customStyle: {},
  className: '',
  options: [],
  value: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: (): void => {},
  type: 'left',
}

Radio.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.array,
  onClick: PropTypes.func,
}

Radio.Simple = SimpleRadio

export { Radio as default }
