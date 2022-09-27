import './index.css';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import React, { Component } from 'react';
import { px } from '../common';

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

const mergeNonNullable = (record, attrs) => attrs.forEach(([key, value]) => {
    if (value != null)
        record[key] = value;
});
class Gap extends Component {
    render() {
        const _a = this.props, { customStyle, className, bgColor, top, bottom, left, right, width, height, children } = _a, props = __rest(_a, ["customStyle", "className", "bgColor", "top", "bottom", "left", "right", "width", "height", "children"]);
        const rootClass = classNames('fta-gap', className);
        const rootStyle = Object.assign({}, customStyle);
        mergeNonNullable(rootStyle, [
            ['backgroundColor', bgColor],
            ['marginBottom', px(bottom)],
            ['marginTop', px(top)],
            ['marginLeft', px(left)],
            ['marginRight', px(right)],
            ['height', px(height)],
            ['width', px(width)],
        ]);
        return (React.createElement(View, Object.assign({ style: rootStyle, className: rootClass }, props), children));
    }
}

export { Gap as default };
