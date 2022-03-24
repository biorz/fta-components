import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { ReactNode } from 'react'
import { Assets, isUndef } from '../../common'
import '../../style/components/checkbox/index.scss'
import { CheckboxProps } from '../../types/checkbox'

export default class Checkbox<T extends any = any> extends React.Component<CheckboxProps<T>> {
  public static defaultProps: CheckboxProps<unknown>
  public static propTypes: InferProps<CheckboxProps<unknown>>

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

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
    const {
      customStyle,
      // @ts-ignore
      style,
      className,
      options,
      selectedList,
      icon,
      disabledIcon,
      selectedIcon,
      selectedDidsabledIcon,
      type,
    } = this.props

    const rootCls = classNames('fta-checkbox', `fta-checkbox--${type}`, className)

    return (
      <View className={rootCls} style={{ ...style, ...customStyle }}>
        {options.map((option, idx) => {
          let presentIcon: ReactNode
          const { value, disabled, label, desc } = option
          const selected = selectedList.includes(value)
          if (selected) {
            presentIcon = disabled ? selectedDidsabledIcon : selectedIcon
          } else {
            presentIcon = disabled ? disabledIcon : icon
          }
          const optionCls = classNames('fta-checkbox__option', `fta-checkbox__option--${type}`, {
            'fta-checkbox__option--disabled': disabled,
            'fta-checkbox__option--selected': selected,
          })
          const iconCntCls = classNames(
            'fta-checkbox__icon-cnt',
            `fta-checkbox__icon-cnt--${type}`,
            {
              'fta-checkbox__icon-cnt--selected': selected,
              'fta-checkbox__icon-cnt--disabled': disabled,
            }
          )
          const titleClz = classNames(
            'fta-checkbox__title',
            selected && 'fta-checkbox__title--selected',
            disabled && 'fta-checkbox__title--disabled'
          )
          const descClz = classNames(
            'fta-checkbox__desc',
            selected && 'fta-checkbox__desc--selected',
            disabled && 'fta-checkbox__desc--disabled'
          )
          return (
            <View className={optionCls} key={value as string} onClick={() => this.handleClick(idx)}>
              {isUndef(presentIcon) ? (
                <View className={iconCntCls}>
                  <Image className='fta-checkbox-icon' src={Assets.check.default} />
                </View>
              ) : (
                presentIcon
              )}

              <View className='fta-checkbox-content'>
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

Checkbox.defaultProps = {
  customStyle: {},
  className: '',
  options: [],
  selectedList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {},
  type: 'left',
}

Checkbox.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.array,
  selectedList: PropTypes.array,
  onChange: PropTypes.func,
}
