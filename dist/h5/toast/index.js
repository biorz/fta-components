import './index.css';
import { View, Image, Text as Text$1 } from '@tarojs/components';
import classNames from 'classnames';
import React, { Fragment, forwardRef, useState, useRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { useCarelessClass, useCareMode, scale, px, useEnhancedState, inRN } from '../common';

function Modal(props) {
    return React.createElement(Fragment, null, props.children);
}

const Assets = {
    default: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
    dt: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
};

function Loading(props) {
    const { src, customStyle, className, stop, duration, easing, circle, useImage, size, color } = props;
    const rootClz = classNames('fta-loading', `fta-loading--${size}`, circle && 'fta-loading--circle', className);
    const imageStyle = { animationDuration: `${duration}s` };
    if (stop) {
        imageStyle.animationPlayState = 'paused';
    }
    if (color) {
        imageStyle.borderColor = color;
        imageStyle.borderLeftColor = 'transparent';
    }
    imageStyle.animationTimingFunction = Array.isArray(easing)
        ? `cubic-bezier(${easing.toString()})`
        : easing;
    return (React.createElement(View, { className: rootClz, style: customStyle }, useImage ? (React.createElement(Image, { className: 'fta-loading__image', style: imageStyle, src: src })) : (React.createElement(View, { className: classNames('fta-loading__view', `fta-loading__view--${size}`), style: imageStyle }))));
}
Loading.defaultProps = {
    src: Assets.default,
    duration: 1,
    easing: 'linear',
    size: 'medium',
};

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

const nullTimer = null;
function Toast(props, ref) {
    const [state, setState] = useEnhancedState(props);
    const { title, duration, mask, position, textClassName, textStyle, className, customStyle, transparent, textLevel, clickMaskOnClose, loading, icon, useNative, containerClassName, customContainerStyle, onMaskClick, } = state;
    const [visible, toggleVisible] = useState(false);
    const _ref = useRef({
        timer: nullTimer,
        toggleVisible,
    });
    const rootClz = classNames('fta-toast', `fta-toast--${position}`, !useNative && inRN && 'fta-toast--custom', mask ? 'fta-toast--overlay' : 'fta-toast--transparent', className);
    const containerClz = classNames('fta-toast-view', icon && 'fta-toast-view--icon', loading && 'fta-toast-view--loading', containerClassName);
    const rootStyle = Object.assign({}, customStyle);
    const textClz = classNames('fta-toast__text', icon && 'fta-toast__text--icon', textClassName);
    if (transparent) {
        rootStyle.backgroundColor = 'transparent';
    }
    useEffect(() => {
        _ref.current.toggleVisible = toggleVisible;
    }, [toggleVisible]);
    /** 设置定时器 */
    const setTimer = (force) => {
        if (duration > 0 && (force || visible)) {
            _ref.current.timer = setTimeout(() => _ref.current.toggleVisible(false), duration * 1000);
        }
    };
    /** 清除定时器 */
    const clearTimer = () => {
        // console.log('清除定时器')
        clearTimeout(_ref.current.timer);
        _ref.current.timer = nullTimer;
    };
    useImperativeHandle(ref, () => ({
        show: (options) => {
            clearTimer();
            setState(options);
            toggleVisible(true);
            // setTimer(options.duration > 0)
        },
        hide: () => {
            clearTimer();
            toggleVisible(false);
        },
    }));
    useEffect(() => {
        setState(props);
    }, [props]);
    useEffect(() => {
        if (!_ref.current.timer) {
            setTimer();
        }
        return clearTimer;
    }, []);
    useEffect(() => {
        if (visible) {
            setTimer(state.duration > 0);
            return clearTimer;
        }
    }, [state, visible]);
    const _onMaskClick = () => {
        if (clickMaskOnClose) {
            clearTimer();
            toggleVisible(false);
        }
        onMaskClick();
    };
    const ToastView = (React.createElement(View, { className: rootClz, style: rootStyle, onClick: _onMaskClick },
        React.createElement(View, { className: containerClz, style: customContainerStyle },
            loading === true ? React.createElement(Loading, { useImage: true, className: 'fta-toast-loading' }) : loading,
            !loading && icon,
            title ? (
            /* @ts-ignore */
            React.createElement(Text, { level: textLevel, className: textClz, style: textStyle, pointerEvents: 'none' }, title)) : null)));
    return (React.createElement(Modal, { transparent: true, visible: visible, useNative: useNative }, inRN ? ToastView : visible ? ToastView : null));
}
const defaultProps = {
    title: '',
    duration: 2,
    mask: true,
    transparent: true,
    position: 'center',
    textLevel: 4,
    clickMaskOnClose: false,
    loading: false,
    icon: false,
    useNative: true,
    onMaskClick: () => { },
};
const ForwardToast = forwardRef(Toast);
ForwardToast.defaultProps = defaultProps;
/**
 * useToast hooks
 * 返回当前toast ref和Element Fragment
 */
function useToast(defaultProps = { title: '' }) {
    const ref = useRef();
    const toastInstance = useMemo(() => React.createElement(ForwardToast, Object.assign({}, defaultProps, { ref: ref })), []);
    return [ref, toastInstance];
}

export { ForwardToast as default, useToast };
