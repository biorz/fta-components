import { Text, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React, { CSSProperties } from 'react'
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
    const { customStyle, className, disabled, values, selectedColor, current, color } = this.props
    const itemStyle: CSSProperties = {}
    const selectedItemStyle: CSSProperties = {}
    const itemTextStyle: CSSProperties = {}
    const selectedTextStyle: CSSProperties = {}
    const borderStyle: CSSProperties = {}
    if (color) {
      selectedTextStyle.color = color
      itemStyle.backgroundColor = color
    }
    if (selectedColor) {
      selectedItemStyle.backgroundColor = selectedColor
      itemTextStyle.color = selectedColor
      borderStyle.borderLeftColor = selectedColor
      borderStyle.borderRightColor = selectedColor
      borderStyle.borderTopColor = selectedColor
      borderStyle.borderBottomColor = selectedColor
    }
    const rootCls = classNames(
      'fta-segmented-control',
      {
        'fta-segmented-control--disabled': disabled,
      },
      className
    )

    return (
      <View className={rootCls} style={{ ...borderStyle, ...customStyle }}>
        {values.map((value, i) => (
          <View
            className={classNames('fta-segmented-control__item', {
              'fta-segmented-control__item--active': current === i,
              'fta-segmented-control__item--bordered': !!i,
            })}
            style={{ ...(current === i ? selectedItemStyle : itemStyle), ...borderStyle }}
            key={value}
            onClick={this.handleClick.bind(this, i)}>
            <Text
              style={current === i ? selectedTextStyle : itemTextStyle}
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
  disabled: false,
  values: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: (): void => {},
}

SegmentedControl.propTypes = {
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  current: PropTypes.number,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  values: PropTypes.array,
  onClick: PropTypes.func,
}
