import './index.css';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { createContext, forwardRef, useContext, useState, useRef, useLayoutEffect, useImperativeHandle, Fragment, cloneElement, useEffect } from 'react';
import { inWeb, inRN, isString, px, autoFix } from '../common';

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

const stopPropagation = (evt) => {
    var _a;
    (_a = evt === null || evt === void 0 ? void 0 : evt.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(evt);
};
const context = createContext({});
const IntroConsumer = context.Consumer;
const useIntroContext = () => useContext(context);
function _IntroProvider(props, _ref) {
    const [isDisabled, disabled] = useState(!!props.disabled);
    const [show, toggle] = useState(false);
    const [cursor, moveCursorTo] = useState(0);
    const stack = useRef([]).current;
    const ref = useRef({ isDisabled, disabled, cursor: 1 }).current;
    const hasReachEnd = () => cursor + 1 >= stack.length;
    useLayoutEffect(() => {
        ref.isDisabled = isDisabled;
        ref.disabled = disabled;
    }, [isDisabled, disabled]);
    useLayoutEffect(() => {
        disabled(!!props.disabled);
        // console.log('useLayoutEffect')
    }, [props.disabled]);
    const refAttrs = {
        delay: props.delay || 0,
        readonly: props.readonly,
        show(cursor) {
            if (ref.isDisabled)
                return;
            if (isString(cursor)) {
                const index = stack.findIndex((v) => v.prop === cursor);
                moveCursorTo(index > -1 ? index : 0);
            }
            else {
                cursor = cursor || 0;
                moveCursorTo(cursor);
            }
            toggle(true);
        },
        hide() {
            toggle(false);
        },
        next() {
            // console.log('hasreachend', hasReachEnd(), cursor)
            if (hasReachEnd()) {
                toggle(false);
            }
            else {
                moveCursorTo(cursor + 1);
                toggle(true);
            }
        },
        prev() {
            if (cursor === 0)
                return;
            moveCursorTo(cursor - 1);
            toggle(true);
        },
        register(metaData) {
            console.log('register element', metaData);
            stack.push(metaData);
            stack.sort((a, b) => a.priority - b.priority);
        },
        unregister(prop) {
            const index = stack.findIndex((meta) => meta.prop === prop);
            if (index > -1)
                stack.splice(index, 1);
        },
        destroy() {
            stack.length = 0;
        },
        disable: () => {
            ref.disabled(true);
            ref.isDisabled = true;
        },
        enable: () => ref.disabled(false),
        disabled: () => ref.isDisabled,
    };
    useImperativeHandle(_ref, () => refAttrs);
    const onOverlayClick = () => {
        refAttrs.next();
    };
    const current = stack[cursor];
    const _readonly = (current === null || current === void 0 ? void 0 : current.readonly) === false ? false : (current === null || current === void 0 ? void 0 : current.readonly) || props.readonly;
    // current &&
    //   console.log('current', current, {
    //   })
    return (React.createElement(context.Provider, { value: refAttrs },
        React.createElement(Overlay, { show: show, onClick: onOverlayClick, opacity: 0.7 }, current ? (React.createElement(Fragment, null,
            React.createElement(View
            // @ts-ignore
            , { 
                // @ts-ignore
                pointerEvents: _readonly ? 'none' : void 0, className: classNames('fta-intro-wrapper', _readonly && 'fta-intro-wrapper--readonly'), style: {
                    top: px(current.rect.y),
                    left: px(current.rect.x),
                    width: px(current.rect.width),
                    height: px(current.rect.height),
                } }, current.el || null),
            React.createElement(Tooltip, Object.assign({}, current.tooltip, { tooltipClassName: current.tooltip.tooltipClassName, tooltipStyle: Object.assign(Object.assign({}, getComputedStyle(current)), current.tooltip.tooltipStyle) })))) : null),
        props.children));
}
/**
 * @provider
 * 全局引导配置
 */
const IntroProvider = forwardRef(_IntroProvider);
IntroProvider.defaultProps = {
    readonly: true,
};
/** 高阶函数，直接包裹组件 */
const withIntro = (ChildComponent, props = {}) => () => (React.createElement(IntroProvider, null,
    React.createElement(ChildComponent, Object.assign({}, props))));
function Tooltip(props) {
    const { tooltipClassName, tooltipStyle, title, desc, text, placement, offset, onClick } = props;
    const ctx = useIntroContext();
    const rootClass = classNames('fta-intro-tooltip', tooltipClassName);
    const titleClass = classNames('fta-intro-tooltip-title', desc || 'fta-intro-tooltip-title--simple');
    return (React.createElement(View, { className: rootClass, style: tooltipStyle, key: tooltipStyle === null || tooltipStyle === void 0 ? void 0 : tooltipStyle.marginTop, onClick: stopPropagation },
        React.createElement(View, { className: titleClass },
            React.createElement(Text, { className: 'fta-intro-tooltip-title__text' }, title)),
        desc ? (React.createElement(View, { className: 'fta-intro-tooltip-desc' },
            React.createElement(Text, { className: 'fta-intro-tooltip-desc__text' }, desc))) : null,
        text ? (React.createElement(View, { className: 'fta-intro-tooltip-button', onClick: onClick || ctx.next },
            React.createElement(Text, { className: 'fta-intro-tooltip-button__text' }, text))) : null,
        React.createElement(View, { style: { left: offset }, className: classNames('fta-intro-tooltip-icon', `fta-intro-tooltip-icon--${placement}`) })));
}
Tooltip.defaultProps = {
    offset: '30%',
    placement: 'top',
};
const transformAdaptor = inRN
    ? (offset) => [{ translateY: offset }]
    : (offset) => `translateY(${offset}px)`;
function getComputedStyle(data) {
    const { rect, tooltip } = data;
    const style = {
        marginLeft: px(rect.x),
        marginTop: px(rect.y),
    };
    const absOffset = rect.height + autoFix(20);
    const offset = !tooltip.placement || tooltip.placement === 'top' ? -absOffset : absOffset;
    style.transform = transformAdaptor(offset);
    return style;
}

function getBoundingClientRect(ref, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const { x, y, width, height } = ref.current.getBoundingClientRect();
            return resolve({
                x,
                y,
                width,
                height,
            });
        }, delay);
    });
}

function _Intro(props, ref) {
    const children = cloneElement(props.children, { ref });
    return React.createElement(Fragment, null, children);
}
let uid = 0;
const FowardedIntro = forwardRef(_Intro);
function Intro(props) {
    const ref = useRef(uid++);
    const ctx = useIntroContext();
    useEffect(() => {
        if (ctx.disabled())
            return;
        // console.log('ref', ref)
        getBoundingClientRect(ref, props.delay || ctx.delay).then((rect) => {
            // @ts-ignore
            ctx.register({
                rect,
                prop: props.prop,
                el: React.cloneElement(props.children),
                tooltip: props,
            });
        });
    }, []);
    return (React.createElement(FowardedIntro, { ref: ref }, React.cloneElement(props.children, {
        id: 'fta-intro-child' + ref.current,
        /**
         * 下列属性兼容部分安卓机位置获取不到的问题
         * @see https://reactnative.dev/docs/view#collapsable-android
         * Views that are only used to layout their children or otherwise don't draw anything may be automatically removed from the native hierarchy as an optimization.
         * Set this property to false to disable this optimization and ensure that this View exists in the native view hierarchy.
         */
        collapsable: false,
    })));
}
Intro.Provider = IntroProvider;
Intro.Consumer = IntroConsumer;
Intro.useContext = useIntroContext;
Intro.with = withIntro;
Intro.Tooltip = Tooltip;

export { IntroConsumer, IntroProvider, Intro as default, useIntroContext, withIntro };
