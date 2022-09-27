import './index.css';
import { View } from '@tarojs/components';
export { View as TouchableWithoutFeedback } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, cloneElement } from 'react';
import { inRN, createSelectorQuery } from '../common';

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

/** 支持的Color列表 */
const COLOR = {
    black: ['#000', '#000000', 'rgb(0,0,0)', 'black'],
    white: ['#fff', '#ffffff', 'rgb(255,255,255)', 'white'],
};
/** 支持的underlayColor值 */
const colorList = Object.values(COLOR).reduce((prev, cur) => [...prev, ...cur], []);
const colorMap = Object.entries(COLOR).reduce((prev, [key, list]) => {
    list.forEach((v) => (prev[v] = key));
    return prev;
}, {});
/** 支持的activeOpacity值 */
const opacityList = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

let count = 0;
class LayoutView extends Component {
    constructor(props) {
        super(props);
        this._id = ++count;
        this._onLayout = this._onLayout.bind(this);
    }
    _onLayout(evt) {
        var _a, _b;
        (_b = (_a = this.props).onLayout) === null || _b === void 0 ? void 0 : _b.call(_a, evt.nativeEvent.layout, evt);
    }
    componentDidMount() {
        this.props.onLayout &&
            !inRN &&
            (createSelectorQuery === null || createSelectorQuery === void 0 ? void 0 : createSelectorQuery(`._fta-view-layout__${this._id}`, (result) => {
                this.props.onLayout(result, result);
            }));
    }
    render() {
        if (this.props.disabled)
            return renderDisabledView(this.props);
        const _a = this.props, { onLayout, className, children, style } = _a, props = __rest(_a, ["onLayout", "className", "children", "style"]);
        const rootClass = classNames(`_fta-view-layout__${this._id}`, className);
        return (
        // @ts-ignore onLayout没有类型声明
        React.createElement(View, Object.assign({ onLayout: onLayout && this._onLayout, className: rootClass, style: style }, props), children));
    }
}
LayoutView.defaultProps = {
    onLayout: null,
    disabled: false,
};
/**
 * TouchableOpacity
 * @component
 */
class TouchableOpacity extends Component {
    render() {
        if (this.props.disabled)
            return renderDisabledView(this.props);
        const _a = this.props, { children, activeOpacity } = _a, props = __rest(_a, ["children", "activeOpacity"]);
        // console.log(activeOpacity, 'activeOpacity', props)
        return (React.createElement(View, Object.assign({}, props, { hoverStyle: { opacity: activeOpacity }, hoverClass: `fta-view-hover__${activeOpacity * 10}` }), children));
    }
}
TouchableOpacity.defaultProps = {
    activeOpacity: 0.8,
};
TouchableOpacity.propTypes = {
    activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
};
/**
 * TouchableHighlight
 * @component
 */
class TouchableHighlight extends Component {
    render() {
        if (this.props.disabled)
            return renderDisabledView(this.props);
        let _a = this.props, { activeOpacity, underlayColor, children, underlayClass } = _a, props = __rest(_a, ["activeOpacity", "underlayColor", "children", "underlayClass"]);
        let hoverClass;
        if (underlayClass)
            hoverClass = underlayClass;
        else if (!inRN) {
            if (!~colorList.indexOf(underlayColor)) {
                underlayColor = '#000';
            }
            else {
                hoverClass = `fta-view-hover__${colorMap[underlayColor]}`;
            }
        }
        // 给子组件加额外的props
        const clonedChildren = cloneElement(children, {
            hoverClass: `fta-view-hover__${activeOpacity * 10}`,
            hoverStyle: { opacity: activeOpacity },
        });
        // console.log(clonedChildren, 'clonedChildren')
        return (React.createElement(View, Object.assign({ hoverStyle: { backgroundColor: underlayColor }, hoverClass: hoverClass }, props), clonedChildren));
    }
}
TouchableHighlight.defaultProps = {
    underlayColor: '#000',
    activeOpacity: 0.2,
};
TouchableHighlight.propTypes = {
    underlayColor: inRN ? PropTypes.any : PropTypes.oneOf(colorList),
    activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
};
/**
 * 禁用的View样式
 */
function renderDisabledView(props) {
    const { 
    // 忽略active属性
    hoverClass, hoverStyle, 
    // 禁用click事件
    onClick, disabled, disabledClassName, children, className, style } = props, _props = __rest(props, ["hoverClass", "hoverStyle", "onClick", "disabled", "disabledClassName", "children", "className", "style"]);
    const rootClass = classNames(className, 'fta-view-disabled', disabledClassName);
    return (React.createElement(View, Object.assign({}, _props, { style: style, className: rootClass }), children));
}

export { TouchableHighlight, TouchableOpacity, LayoutView as View, LayoutView as default };
