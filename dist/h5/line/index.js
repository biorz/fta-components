import './index.css';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import { isObject } from '../common';

const upperCase = (s) => s[0].toUpperCase() + s.slice(1);
function Line(props) {
    const { className, customStyle, color, col, 
    // @ts-ignore
    style, length, margin, hairline, dashed, } = props;
    const suffix = col ? 'col' : 'row';
    const rootClass = classNames('fta-line', `fta-line--${suffix}`, {
        [`fta-line--hairline--${suffix}`]: hairline,
        [`fta-line--dashed--${suffix}`]: dashed,
    }, className);
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    if (length) {
        rootStyle[col ? 'height' : 'width'] = length;
    }
    if (color) {
        rootStyle[col ? 'borderRightColor' : 'borderBottomColor'] = color;
    }
    if (margin) {
        if (isObject(margin)) {
            Object.entries(margin).forEach(([key, val]) => {
                rootStyle[`margin${upperCase(key)}`] = val;
            });
        }
        else {
            rootStyle['margin'] = margin;
        }
    }
    return React.createElement(View, { className: rootClass, style: rootStyle });
}
const defaultProps = {
    col: false,
    hairline: false,
    dashed: false,
};
Line.defaultProps = defaultProps;

export { Line as default };
