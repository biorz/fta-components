import './index.css';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useCareClass, useCarelessClass } from '../common';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const shapes = ['circle', 'horn', 'square', 'sector', 'coupon'];
const types = ['primary', 'info', 'success', 'warning', 'error'];
const numberTypes = ['ellipsis', 'limit', 'overflow'];
// 给定的prop是否在prop列表中，如果是，返回类名，否则返回null
const hit = (prop, propList, prefix) => propList.includes(prop) ? `${prefix}${prop}` : null;
/** 处理显示值 */
const handleValue = (value, max, numberType) => {
    let val = value;
    const num = +val;
    if (!Number.isNaN(num) && num > max) {
        switch (numberType) {
            case 'overflow':
                val = `${max}+`;
                break;
            case 'ellipsis':
                val = `${max}...`;
                break;
            case 'limit':
                if (num >= 1000) {
                    let base, suffix;
                    if (num < 10000) {
                        base = 1000;
                        suffix = 'k';
                    }
                    else {
                        base = 10000;
                        suffix = 'w';
                    }
                    let d = num / base;
                    if (/.\d{3,}/.test(d + '')) {
                        d = d.toFixed(2);
                    }
                    val = d + suffix;
                }
                break;
        }
    }
    return val;
};
function Badge(props) {
    /** 处理真实显示的值 */
    const { className, textClassName, textStyle, value, type, numberType, shape, isDot, show, showZero, absolute, offset, customStyle, max, color, bgColor } = props, extraProps = __rest(props
    // 隐藏直接返回null即可
    , ["className", "textClassName", "textStyle", "value", "type", "numberType", "shape", "isDot", "show", "showZero", "absolute", "offset", "customStyle", "max", "color", "bgColor"]);
    // 隐藏直接返回null即可
    if (!show || (value === 0 && !showZero && !isDot))
        return React.createElement(Fragment, null);
    const careClz = useCareClass([
        'fta-badge',
        hit(shape, shapes, 'fta-badge--'),
        isDot && 'fta-badge--dot',
    ]);
    const isSector = shape === 'sector';
    const realVal = handleValue(value, max, numberType);
    const isSingle = String(realVal).length === 1;
    const typeClz = hit(type, types, 'fta-badge--');
    const rootClass = classNames(typeClz, careClz, 
    // 'fta-badge',
    // hit<BadgeType>(type, types, 'fta-badge--'),
    // hit<BadgeShape>(shape, shapes, 'fta-badge--'),
    absolute && 'fta-badge--absolute', isSingle && shape === 'circle' && 'fta-badge--rimless', className);
    const textClz = useCarelessClass(['fta-badge-text', isSector && 'fta-badge--sector__text'], [textClassName]);
    const rootStyle = absolute && offset
        ? Object.assign(Object.assign({}, customStyle), { top: offset[0], right: offset[1] }) : Object.assign({}, customStyle);
    if (bgColor) {
        rootStyle.backgroundColor = bgColor;
    }
    const textStyles = Object.assign({}, textStyle);
    if (color)
        textStyles.color = color;
    return (React.createElement(View, Object.assign({ className: rootClass, style: rootStyle }, extraProps),
        isDot ? null : (React.createElement(Text, { className: textClz, style: textStyles }, realVal)),
        shape === 'coupon' ? (React.createElement(Fragment, null,
            React.createElement(View, { className: useCareClass(['fta-badge-coupon', 'coupon-left']) }),
            React.createElement(View, { className: useCareClass(['fta-badge-coupon', 'coupon-right']) }))) : null,
        isSector ? React.createElement(View, { className: useCarelessClass(['fta-badge-sector'], [typeClz]) }) : null));
}
const defaultProps = {
    isDot: false,
    show: true,
    type: 'error',
    shape: 'circle',
    showZero: false,
    max: 99,
    numberType: 'overflow',
    color: '',
    bgColor: '',
};
const propTypes = {
    type: PropTypes.oneOf(types),
    numberType: PropTypes.oneOf(numberTypes),
    shape: PropTypes.oneOf(shapes),
    offset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
};
Badge.defaultProps = defaultProps;
Badge.propTypes = propTypes;

export { Badge as default };
