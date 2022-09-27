import './index.css';
import { View, Image, Input, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { useState, Fragment } from 'react';
import { Assets, isUndef, isString, isArray } from '../common';

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

const SEARCH = {
    default: Assets.search.default,
    grey: Assets.search.grey,
};
function Search(props) {
    const { value, icon, className, customStyle, 
    // @ts-ignore
    style, inputClassName, inputStyle, children, hightlightColor, placeholderTextColor, clearable, cancelText, result, disabled, onCancel, onClear, onChange, onFocus, onBlur, onItemClick } = props, inputProps = __rest(props, ["value", "icon", "className", "customStyle", "style", "inputClassName", "inputStyle", "children", "hightlightColor", "placeholderTextColor", "clearable", "cancelText", "result", "disabled", "onCancel", "onClear", "onChange", "onFocus", "onBlur", "onItemClick"]);
    const [focused, toggleFocus] = useState(props.autoFocus || false);
    const highlightStyle = hightlightColor ? { color: hightlightColor } : void 0;
    const rootClass = classNames('fta-search', className);
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    const inputClass = classNames('fta-search-input', inputClassName);
    const _onFoucs = (evt) => {
        toggleFocus(true);
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(evt);
    };
    const _onBlur = (evt) => {
        toggleFocus(false);
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(evt);
    };
    const _onItemClick = (item) => {
        onItemClick === null || onItemClick === void 0 ? void 0 : onItemClick(isUndef(item.value) ? item.label : item.value);
    };
    return (React.createElement(View, { className: 'fta-search-root' },
        React.createElement(View, { className: rootClass, style: rootStyle },
            React.createElement(View, { className: 'fta-search-container' },
                isUndef(icon) || isString(icon) ? (React.createElement(Image, { src: icon || SEARCH[focused || (value === null || value === void 0 ? void 0 : value.length) ? 'default' : 'grey'], className: 'fta-search-icon' })) : (icon),
                React.createElement(Input, Object.assign({ disabled: disabled, value: value, className: inputClass, style: inputStyle, placeholderClass: 'fta-search-input--placeholder', 
                    // @ts-ignore
                    placeholderTextColor: placeholderTextColor, onFocus: _onFoucs, onBlur: _onBlur, onInput: (evt) => onChange === null || onChange === void 0 ? void 0 : onChange(evt.detail.value) }, inputProps)),
                clearable && (value === null || value === void 0 ? void 0 : value.length) ? (React.createElement(Image, { className: 'fta-search-clear', src: Assets.close.circleBlack, onClick: onClear })) : null),
            focused || (value === null || value === void 0 ? void 0 : value.length) ? (React.createElement(View, { className: 'fta-search-cancel', onClick: onCancel },
                React.createElement(Text, { className: 'fta-search-cancel__text' }, cancelText))) : null),
        children ||
            (isArray(result) ? (React.createElement(View, { className: 'fta-search-result' }, result.length ? (result.map((item, i) => (React.createElement(View, { key: i, className: 'fta-search-result-item', onClick: () => _onItemClick(item) },
                React.createElement(ResultText, { keyword: value, style: highlightStyle }, item.label))))) : (React.createElement(View, { className: 'fta-search-result__empty' },
                React.createElement(View, { className: 'fta-search-title' },
                    React.createElement(Text, { className: 'fta-search-title__text' }, "\u641C\u7D22\u65E0\u7ED3\u679C")),
                React.createElement(View, { className: 'fta-search-desc' },
                    React.createElement(Text, { className: 'fta-search-desc__text' }, "\u6362\u4E2A\u540D\u79F0\u8BD5\u8BD5\u5427\uFF5E")))))) : null)));
}
function ResultText(props) {
    const { children, keyword, style } = props;
    if (!keyword)
        return React.createElement(Text, { className: 'fta-search-result__text' }, children);
    const list = [];
    const len = keyword.length;
    const reg = new RegExp(keyword, 'g');
    let t;
    let i = 0;
    let tmp;
    while ((t = reg.exec(children))) {
        if ((tmp = children.slice(i, t.index))) {
            list.push(React.createElement(Text, { className: 'fta-search-result__text' }, tmp));
        }
        i = t.index;
        if ((tmp = children.slice(i, i + len))) {
            list.push(React.createElement(Text, { className: 'fta-search-result__text fta-search-result__text--hightlight', style: style }, tmp));
            i = i + len;
        }
    }
    if ((tmp = children.slice(i))) {
        list.push(React.createElement(Text, { className: 'fta-search-result__text' }, tmp));
    }
    // console.log('list', list.length)
    return (React.createElement(Fragment, null, list.map((node, i) => (React.createElement(Fragment, { key: `value-${i}` }, node)))));
}
const defaultProps = {
    disabled: false,
    cancelText: '取消',
    placeholderTextColor: '#cccccc',
};
Search.defaultProps = defaultProps;

export { Search as default };
