import './index.css';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

class SegmentedControl extends React.Component {
    handleClick(index, event) {
        if (this.props.disabled)
            return;
        this.props.onClick(index, event);
    }
    render() {
        const { customStyle, className, disabled, values, selectedColor, current, color } = this.props;
        const itemStyle = {};
        const selectedItemStyle = {};
        const itemTextStyle = {};
        const selectedTextStyle = {};
        const borderStyle = {};
        if (color) {
            selectedTextStyle.color = color;
            itemStyle.backgroundColor = color;
        }
        if (selectedColor) {
            selectedItemStyle.backgroundColor = selectedColor;
            itemTextStyle.color = selectedColor;
            borderStyle.borderLeftColor = selectedColor;
            borderStyle.borderRightColor = selectedColor;
            borderStyle.borderTopColor = selectedColor;
            borderStyle.borderBottomColor = selectedColor;
        }
        const rootCls = classNames('fta-segmented-control', {
            'fta-segmented-control--disabled': disabled,
        }, className);
        return (React.createElement(View, { className: rootCls, style: Object.assign(Object.assign({}, borderStyle), customStyle) }, values.map((value, i) => (React.createElement(View, { className: classNames('fta-segmented-control__item', {
                'fta-segmented-control__item--active': current === i,
                'fta-segmented-control__item--bordered': !!i,
            }), style: Object.assign(Object.assign({}, (current === i ? selectedItemStyle : itemStyle)), borderStyle), key: value, onClick: this.handleClick.bind(this, i) },
            React.createElement(Text, { style: current === i ? selectedTextStyle : itemTextStyle, className: classNames('fta-segmented-control__item__text', {
                    'fta-segmented-control__item--active__text': current === i,
                }) }, value))))));
    }
}
SegmentedControl.defaultProps = {
    customStyle: {},
    className: '',
    current: 0,
    disabled: false,
    values: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => { },
};
SegmentedControl.propTypes = {
    customStyle: PropTypes.object,
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    current: PropTypes.number,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    values: PropTypes.array,
    onClick: PropTypes.func,
};

export { SegmentedControl as default };
