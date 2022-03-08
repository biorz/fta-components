import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { mergeStyle, pxTransform } from '../../common'
import '../../style/components/segmented-control/index.scss'
import { SegmentedControlProps } from '../../types/segmented-control'
export default class SegmentedControl extends React.Component<SegmentedControlProps> {
  public static defaultProps: SegmentedControlProps
  public static propTypes: InferProps<SegmentedControlProps>

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
      'fta-segmented-control',
      {
        'fta-segmented-control--disabled': disabled,
      },
      className
    )

    console.log(99, mergeStyle(rootStyle, customStyle))
    return (
      <View className={rootCls} style={{ borderColor: selectedColor, ...customStyle }}>
        {values.map((value, i) => (
          <View
            className={classNames('fta-segmented-control__item', {
              'fta-segmented-control__item--active': current === i,
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
              className={classNames('fta-segmented-control__item__text', {
                'fta-segmented-control__item--active__text': current === i,
              })}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    )
  }
}

SegmentedControl.defaultProps = {
  customStyle: {},
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

SegmentedControl.propTypes = {
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  current: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  values: PropTypes.array,
  onClick: PropTypes.func,
}
