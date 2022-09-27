import './index.css';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import React, { createContext, useContext, Component, Fragment } from 'react';
import { systemInfo, inRN, inAndroid, inNotch, inWeb, inIOS, px, inAlipay, upperCase } from '../common';

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

const safeAreaContext = createContext({
    disabled: false,
});
/**
 * useSafeArea hook.
 */
const useSafeArea = () => useContext(safeAreaContext);

const safeArea = systemInfo.safeArea || {
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
};
/** 是否是沉浸式屏幕 */
const isImmersive = systemInfo.screenHeight === systemInfo.windowHeight;
/** 沉浸式的刘海屏需要安全区适配 */
const needSafeArea = isImmersive && inNotch;
// console.log(safeArea, 'safearea', systemInfo)
/** 安全区 */
const _safeArea = {
    top: inRN && inAndroid
        ? 0
        : safeArea.top
            ? safeArea.top < 44 && inNotch && inRN
                ? 44
                : safeArea.top
            : isImmersive && inWeb
                ? // @ts-ignore
                    (window._MBWEB_statusbarHeight || 0) / systemInfo.pixelRatio
                : inNotch && !inWeb
                    ? 44
                    : 0,
    bottom: safeArea.top > 20 && inRN && inIOS
        ? 34
        : inRN && inAndroid
            ? 0
            : safeArea.bottom
                ? systemInfo.screenHeight - safeArea.bottom
                : needSafeArea
                    ? // @ts-ignore
                        (window._MBWEB_bottombarHeight || 0) / systemInfo.pixelRatio
                    : 0,
    left: safeArea.left,
    right: safeArea.right ? systemInfo.screenWidth - safeArea.right : 0,
};

/**
 * safe area container
 * @component
 */
class SafeAreaView extends Component {
    getInlineStyle(style) {
        const attr = this.props.useMargin ? 'margin' : 'padding';
        const safeAreaStyle = {};
        if (_safeArea.top)
            safeAreaStyle[`${attr}Top`] = px(_safeArea.top);
        if (_safeArea.right)
            safeAreaStyle[`${attr}Right`] = px(_safeArea.right);
        if (_safeArea.left)
            safeAreaStyle[`${attr}Left`] = px(_safeArea.left);
        if (_safeArea.bottom)
            safeAreaStyle[`${attr}Bottom`] = px(_safeArea.bottom);
        return Object.assign(Object.assign({}, safeAreaStyle), style);
    }
    render() {
        if (inAlipay)
            return React.createElement(Fragment, null, this.props.children);
        return (React.createElement(safeAreaContext.Consumer, null, (ctx) => {
            if (this.props.disabled || ctx.disabled) {
                const _a = this.props, props = __rest(_a, ["disabled"]);
                return React.createElement(View, Object.assign({}, props));
            }
            const _b = this.props, { className, style, children, useMargin } = _b, props = __rest(_b, ["className", "style", "children", "useMargin"]);
            const rootCla = classNames(className, `fta-safe-area-container${useMargin ? '__margin' : ''}`);
            const rootStyle = this.getInlineStyle(style);
            return (React.createElement(View, Object.assign({}, props, { className: rootCla, style: rootStyle }), children));
        }));
    }
}
SafeAreaView.defaultProps = {
    style: {},
    disabled: false,
};
/**
 * 顶部或底部安全区
 * @component
 */
class SafeArea extends Component {
    getInlineStyle(position, style) {
        const attr = this.props.useMargin ? 'margin' : 'padding';
        return Object.assign({ [`${attr}${upperCase(position)}`]: px(_safeArea[position]) }, style);
    }
    renderSafeArea(position, props) {
        const { style, className, children, useMargin } = props, extraProps = __rest(props, ["style", "className", "children", "useMargin"]);
        const rootStyle = this.getInlineStyle(position, props.style);
        const rootCla = classNames(props.className, `fta-safe-area-${position}${useMargin ? '__margin' : ''}`);
        return (React.createElement(View, Object.assign({}, extraProps, { style: rootStyle, className: rootCla }), children));
    }
    render() {
        if (inAlipay)
            return null;
        return (React.createElement(safeAreaContext.Consumer, null, (ctx) => {
            if (this.props.disabled || ctx.disabled) {
                const _a = this.props, props = __rest(_a, ["disabled"]);
                return React.createElement(View, Object.assign({}, props));
            }
            const _b = this.props, { top, bottom } = _b, props = __rest(_b, ["top", "bottom"]);
            const position = !top && bottom ? 'bottom' : 'top';
            return this.renderSafeArea(position, props);
        }));
    }
}
SafeArea.defaultProps = {
    bottom: true,
    top: false,
    style: {},
    disabled: false,
};
SafeArea.Consumer = safeAreaContext.Consumer;
SafeArea.Provider = safeAreaContext.Provider;
SafeArea.View = SafeAreaView;

export { SafeAreaView, _safeArea, SafeArea as default, useSafeArea };
