import './index.css';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import { inWeb, inRN } from '../common';

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

const defaultProps = {
    fixed: true,
};

function Overlay(props) {
    const { className, 
    // @ts-ignore
    style, customStyle, fixed, zIndex, bgColor, opacity, show, children, center, onClick } = props, extraProps = __rest(props, ["className", "style", "customStyle", "fixed", "zIndex", "bgColor", "opacity", "show", "children", "center", "onClick"]);
    const fixedCls = inRN || (fixed && 'fta-overlay--fixed');
    const rootClass = classNames('fta-overlay', fixedCls, opacity == null || (opacity === 0.5 && 'fta-overlay--anim'));
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    const bodyStyle = {};
    if (opacity)
        rootStyle.opacity = opacity;
    if (zIndex) {
        rootStyle.zIndex = zIndex;
        bodyStyle.zIndex = zIndex + 1;
    }
    if (bgColor)
        rootStyle.backgroundColor = bgColor;
    const stopPropagation = (evt) => { var _a; return !inRN && ((_a = evt.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(evt)); };
    const _onClick = (evt) => {
        stopPropagation(evt);
        onClick === null || onClick === void 0 ? void 0 : onClick();
    };
    return show ? (React.createElement(React.Fragment, null,
        React.createElement(View, Object.assign({}, extraProps, { className: rootClass, style: rootStyle, onClick: _onClick, catchMove: true })),
        React.createElement(View
        // @ts-ignore
        , { 
            // @ts-ignore
            pointerEvents: 'box-none', className: classNames('fta-overlay-container', fixedCls, center && 'fta-overlay-container--center'), style: bodyStyle, onClick: stopPropagation }, inWeb || inRN ? children : React.createElement(View, { className: 'fta-overlay-container-root' }, children)))) : null;
}
Overlay.defaultProps = defaultProps;

export { Overlay as default };
