import { mergeStyle, pxTransform } from '@fta/common'
import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { AtSegmentedControlProps } from '../types'
import './index.scss'
export default class AtSegmentedControl extends React.Component<AtSegmentedControlProps> {
  public static defaultProps: AtSegmentedControlProps
  public static propTypes: InferProps<AtSegmentedControlProps>

  private handleClick(index: number, event: CommonEvent): void {
    if (this.props.disabled) return
    this.props.onClick(index, event)
  }

  public render(): JSX.Element {
    const {
      customStyle = '',
      className,
      disabled,
      values,
      selectedColor,
      current,
      color,
      fontSize = 28,
    } = this.props
    console.log(22, current)
    const rootStyle = {
      borderColor: selectedColor,
    }
    const itemStyle = {
      color: selectedColor,
      fontSize: pxTransform(fontSize),
      borderColor: selectedColor,
      backgroundColor: color,
    }
    const selectedItemStyle = {
      color,
      fontSize: pxTransform(fontSize),
      borderColor: selectedColor,
      backgroundColor: selectedColor,
    }
    const rootCls = classNames(
      'at-segmented-control',
      {
        'at-segmented-control--disabled': disabled,
      },
      className
    )

    console.log(99, mergeStyle(rootStyle, customStyle))
    return (
      <View className={rootCls} style={{ borderColor: selectedColor, ...customStyle }}>
        {values.map((value, i) => (
          <View
            className={classNames('at-segmented-control__item', {
              'at-segmented-control__item--active': current === i,
            })}
            style={current === i ? { ...selectedItemStyle } : { ...itemStyle }}
            key={value}
            onClick={this.handleClick.bind(this, i)}>
            <Text
              style={
                current === i
                  ? { color, fontSize: pxTransform(fontSize) }
                  : { color: selectedColor, fontSize: pxTransform(fontSize) }
              }
              className={classNames('at-segmented-control__item__text', {
                'at-segmented-control__item--active__text': current === i,
              })}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    )
  }
}

AtSegmentedControl.defaultProps = {
  customStyle: '',
  className: '',
  current: 0,
  color: '#fff',
  fontSize: 16,
  disabled: false,
  selectedColor: '#6190E8',
  values: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: (): void => {},
}

AtSegmentedControl.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  current: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  values: PropTypes.array,
  onClick: PropTypes.func,
}
