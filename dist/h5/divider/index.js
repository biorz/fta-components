import './index.css';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { Component } from 'react';
import { useClassWithCare, ConfigConsumer } from '../common';

class Divider extends Component {
    handleLineStyle(left, dashed, hairline, textPosition, careMode) {
        const offsetClass = textPosition === 'center'
            ? null
            : textPosition === 'left'
                ? left
                    ? 'fta-divider-line--offset'
                    : null
                : left
                    ? null
                    : 'fta-divider-line--offset';
        return classNames(useClassWithCare(careMode, ['fta-divider-line', hairline || 'fta-divider-line--bold']), offsetClass, dashed && 'fta-divider-line--dashed');
    }
    render() {
        const { dot, dashed, textPosition, text, hairline, lineColor, textStyle, textClassName } = this.props;
        const lineStyle = lineColor ? { borderBottomColor: lineColor } : {};
        return (React.createElement(ConfigConsumer, null, ({ careMode }) => {
            return (React.createElement(View, { className: 'fta-divider' },
                React.createElement(View, { className: this.handleLineStyle(true, dashed, hairline, textPosition, careMode), style: lineStyle }),
                React.createElement(View, { className: classNames('fta-divider-text', dot && `${useClassWithCare(careMode, ['fta-divider-dot'])} ${textClassName}`) }, dot ? null : (React.createElement(Text, { className: classNames(useClassWithCare(careMode, ['fta-divider-text__label']), textClassName), style: textStyle }, text))),
                React.createElement(View, { className: this.handleLineStyle(false, dashed, hairline, textPosition, careMode), style: lineStyle })));
        }));
    }
}
Divider.defaultProps = {
    dashed: false,
    hairline: true,
    dot: false,
    textPosition: 'center',
};

export { Divider as default };
