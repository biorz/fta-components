import './index.css';
import { Text as Text$1 } from '@tarojs/components';
import React from 'react';
import { useCarelessClass, useCareMode, scale, px } from '../common';

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

/**
 * 正文
 */
function Text(props) {
    const { className, style, level, children, size, color, scale: scale$1, weight, line, underline, type, strong, italic } = props, extraProps = __rest(props, ["className", "style", "level", "children", "size", "color", "scale", "weight", "line", "underline", "type", "strong", "italic"]);
    const textClz = useCarelessClass(['fta-text', size ? '' : `fta-text--${level}`], [type && `fta-text--${type}`, className]);
    const careMode = useCareMode();
    const textStyle = Object.assign({}, style);
    if (color) {
        textStyle.color = color;
    }
    if (strong) {
        textStyle.fontWeight = '500';
    }
    if (weight) {
        textStyle.fontWeight = weight + '';
    }
    if (italic) {
        textStyle.fontStyle = 'italic';
    }
    if (line || underline) {
        textStyle.textDecorationLine = line ? 'line-through' : 'underline';
    }
    if (size) {
        const fontSize = careMode ? size * 1.3 : size;
        textStyle.fontSize = scale$1 ? scale(fontSize) : px(fontSize);
    }
    return (React.createElement(Text$1, Object.assign({ className: textClz, style: textStyle }, extraProps), children));
}
const textDefaultProps = {
    level: 4,
    scale: true,
};
Text.defaultProps = textDefaultProps;

export { Text };
