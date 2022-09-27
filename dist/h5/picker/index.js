import './index.css';
import { View, Text, Image, Button, Form, ScrollView } from '@tarojs/components';
import React, { Fragment, createContext, Component, useState, memo, forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { systemInfo, inRN, inAndroid, inNotch, inWeb, inIOS, px, inAlipay, upperCase, isFunction, isString, inWeapp, Assets as Assets$1 } from '../common';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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

function Modal(props) {
    return React.createElement(Fragment, null, props.children);
}

const safeAreaContext = createContext({
    disabled: false,
});

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

class AtActionSheetBody extends React.Component {
    render() {
        const rootClass = classNames('fta-action-sheet__body', this.props.className);
        return React.createElement(View, { className: rootClass }, this.props.children);
    }
}

/** 阻止事件冒泡 */
function stopPropagation(evt) {
    var _a;
    (_a = evt === null || evt === void 0 ? void 0 : evt.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(evt);
}

class ActionSheetItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (args) => {
            stopPropagation(args);
            const onClick = this.props.onClick;
            if (isFunction(onClick)) {
                onClick(args);
            }
        };
    }
    render() {
        const { children, className, textClassName, textStyle, noBorder, hint, left } = this.props;
        const rootClass = classNames('fta-action-sheet__item', noBorder && 'item-no-border', left && 'item-left', className);
        const textClass = classNames('fta-action-sheet__item__text', textClassName);
        const fragment = isString(children) ? (React.createElement(Text, { className: textClass, style: textStyle }, children)) : (children);
        const hintNode = isString(hint) ? (React.createElement(Text, { className: 'fta-action-sheet__item__hint' }, hint)) : (hint);
        return (React.createElement(View, { className: rootClass, onClick: this.handleClick, hoverStyle: { opacity: 0.6 } },
            fragment,
            hint ? hintNode : null));
    }
}
ActionSheetItem.defaultProps = {
    left: false,
};
ActionSheetItem.propTypes = {
    onClick: PropTypes.func,
};

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

// console.log(Button, _Button, _Button === Button)
const ButtonAdapter = inRN ? Button : View;
const SIZE_CLASS = {
    small: 'small',
    medium: 'medium',
    large: 'large',
};
const TYPE_CLASS = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    fourth: 'fourth',
};
class FTAButton extends Component {
    constructor(props) {
        super(props);
    }
    onClick(event) {
        if (!this.props.disabled) {
            this.props.onClick && this.props.onClick(event);
        }
    }
    onGetUserInfo(event) {
        this.props.onGetUserInfo && this.props.onGetUserInfo(event);
    }
    onContact(event) {
        this.props.onContact && this.props.onContact(event);
    }
    onGetPhoneNumber(event) {
        this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(event);
    }
    onError(event) {
        this.props.onError && this.props.onError(event);
    }
    onOpenSetting(event) {
        this.props.onOpenSetting && this.props.onOpenSetting(event);
    }
    get hoverStyle() {
        const { disabled, hoverStyle } = this.props;
        return disabled ? undefined : hoverStyle;
    }
    get hoverClass() {
        const { disabled, hoverClassName, type } = this.props;
        return disabled ? undefined : classNames(`fta-button--${type}--active`, hoverClassName);
    }
    onSumit(event) {
        if (inWeapp || inWeb) {
            // TODO: 3.0 this.$scope
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.$scope.triggerEvent('submit', event.detail, {
                bubbles: true,
                composed: true,
            });
        }
    }
    onReset(event) {
        if (inWeapp || inWeb) {
            // TODO: 3.0 this.$scope
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.$scope.triggerEvent('reset', event.detail, {
                bubbles: true,
                composed: true,
            });
        }
    }
    render() {
        // console.log(this.hoverClass, 'this.hoverClass', this.hoverStyle)
        const { 
        // @ts-ignore
        size, type, circle, full, loading, disabled, customStyle, formType, openType, lang, sessionFrom, sendMessageTitle, sendMessagePath, sendMessageImg, showMessageCard, appParameter, textClassName, textStyle, className, children, 
        // @ts-ignore
        style, } = this.props;
        let rootClassName = classNames('fta-button', {
            [`fta-button--${SIZE_CLASS[size]}`]: SIZE_CLASS[size],
            [`fta-button--${type}`]: TYPE_CLASS[type],
            [`fta-button--${size}--circle`]: circle,
            'fta-button--full': full,
        }, disabled && ['fta-button--disabled', `fta-button--${type}--disabled`], className);
        const textClass = classNames('fta-button__text', `fta-button__text--${SIZE_CLASS[size] || 'default'}`, `fta-button__text--${TYPE_CLASS[type] || 'default'}`, disabled && `fta-button__text--${type}--disabled`, loading && `fta-button__text--loading fta-button__text--${type}--loading`, textClassName);
        const loadingColor = type === 'primary' ? '#fff' : '';
        // const loadingSize = size === 'small' ? '30' : 0
        let loadingComponent;
        if (loading === true) {
            loadingComponent = (React.createElement(View, { className: 'fta-button__icon' },
                React.createElement(Loading, { color: loadingColor, size: size, useImage: true })));
            rootClassName = classNames(rootClassName);
        }
        else {
            loadingComponent = loading;
        }
        const webButton = (React.createElement(Button, { className: 'fta-button__wxbutton', lang: lang, disabled: disabled, formType: formType }));
        const button = (React.createElement(Button, { className: 'fta-button__wxbutton', formType: formType, openType: openType, lang: lang, sessionFrom: sessionFrom, sendMessageTitle: sendMessageTitle, sendMessagePath: sendMessagePath, sendMessageImg: sendMessageImg, showMessageCard: showMessageCard, appParameter: appParameter, onGetUserInfo: this.onGetUserInfo.bind(this), onGetPhoneNumber: this.onGetPhoneNumber.bind(this), onOpenSetting: this.onOpenSetting.bind(this), onError: this.onError.bind(this), onContact: this.onContact.bind(this) }));
        return (React.createElement(ButtonAdapter, { disabled: disabled, className: rootClassName, style: Object.assign(Object.assign({}, style), customStyle), onClick: this.onClick.bind(this), 
            // @ts-ignore
            hoverClassName: this.hoverClass, hoverStyle: this.hoverStyle, hoverClass: this.hoverClass },
            inWeb && !disabled && webButton,
            inWeapp && !disabled && (React.createElement(Form, { onSubmit: this.onSumit.bind(this), onReset: this.onReset.bind(this) }, button)),
            inAlipay && !disabled && button,
            loadingComponent,
            isString(children) ? (React.createElement(Text, { className: textClass, style: textStyle }, children)) : (children)));
    }
}
FTAButton.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'fourth']),
    circle: PropTypes.bool,
    full: PropTypes.bool,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    customStyle: PropTypes.object,
    textStyle: PropTypes.object,
    formType: PropTypes.oneOf(['submit', 'reset', '']),
    openType: PropTypes.oneOf([
        'contact',
        'share',
        'getUserInfo',
        'getPhoneNumber',
        'launchApp',
        'openSetting',
        'feedback',
        'getRealnameAuthInfo',
        'getAuthorize',
        'contactShare',
        '',
    ]),
    lang: PropTypes.string,
    sessionFrom: PropTypes.string,
    sendMessageTitle: PropTypes.string,
    sendMessagePath: PropTypes.string,
    sendMessageImg: PropTypes.string,
    showMessageCard: PropTypes.bool,
    appParameter: PropTypes.string,
    onGetUserInfo: PropTypes.func,
    onContact: PropTypes.func,
    onGetPhoneNumber: PropTypes.func,
    onError: PropTypes.func,
    onOpenSetting: PropTypes.func,
};
FTAButton.defaultProps = {
    customStyle: {},
    textStyle: {},
    type: 'primary',
    // size: 'medium',
    // size: 'medium',
    // circle: false,
};

class ActionSheetFooter extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (...args) => {
            stopPropagation(args[0]);
            const onClick = this.props.onClick;
            if (isFunction(onClick)) {
                onClick(...args);
            }
        };
    }
    render() {
        const { children, className, onConfirm, confirmText, icon } = this.props;
        if (icon && confirmText) {
            return (React.createElement(View, { className: 'fta-action-sheet-footer' },
                React.createElement(FTAButton, { size: 'large', type: 'primary', onClick: onConfirm }, confirmText)));
        }
        const rootClass = classNames('fta-action-sheet__footer', className);
        const fragment = typeof children === 'string' ? (React.createElement(Text, { className: 'fta-action-sheet__footer__text' }, children)) : (children);
        return (React.createElement(View, { onClick: this.handleClick, className: rootClass, hoverStyle: { opacity: 0.6 } }, fragment));
    }
}
ActionSheetFooter.defaultProps = {
// hoverClassName: 'item-active',
};
ActionSheetFooter.propTypes = {
    onClick: PropTypes.func,
};

class ActionSheetHeader extends Component {
    render() {
        const { children, className } = this.props;
        const noBorder = children && children.border === false;
        const isComplexType = children && (children.title || children.icon);
        const isSimpleType = children && children.icon && !children.title;
        const classObject = {
            'fta-action-sheet__header--complex': isComplexType,
            'fta-action-sheet__header--no-title': isSimpleType,
            'fta-action-sheet__header--no-border': noBorder,
        };
        const rootClass = classNames('fta-action-sheet__header', classObject, className);
        let fragment;
        let icon = null;
        if (isString(children)) {
            // 字符串直接展示标题
            fragment = React.createElement(Text, { className: 'fta-action-sheet__header__text' }, children);
        }
        else if (isComplexType) {
            const { title, confirmText, cancelText, onCancel, onConfirm, icon, confirmTextClassName, confirmTextStyle, cancelTextClassName, cancelTextStyle, } = children;
            fragment = (React.createElement(React.Fragment, null,
                isString(cancelText) && !icon ? (React.createElement(Text, { className: classNames('fta-action-sheet__header-cancel', cancelTextClassName), style: cancelTextStyle, onClick: onCancel }, cancelText)) : icon ? null : (cancelText),
                isString(title) ? React.createElement(Text, { className: 'fta-action-sheet__header-text' }, title) : title,
                isString(confirmText) && !icon ? (React.createElement(Text, { className: classNames('fta-action-sheet__header-confirm', confirmTextClassName), style: confirmTextStyle, onClick: onConfirm }, confirmText)) : icon ? null : (confirmText),
                icon === true || isString(icon) ? (React.createElement(Image, { className: 'fta-action-sheet__header-close', src: isString(icon) ? icon || Assets$1.close.default : Assets$1.close.default, onClick: onCancel })) : (icon)));
        }
        else {
            fragment = children;
        }
        return (React.createElement(View, { className: rootClass },
            fragment,
            icon));
    }
}

function Motion (props) {
    const { className, customStyle, children, example } = props;
    return (React.createElement(View, { className: className, style: customStyle },
        example ? React.createElement(View, { className: 'fta-action-sheet-example' }, example) : null,
        children));
}

class ActionSheet extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = () => {
            if (typeof this.props.onClose === 'function') {
                this.props.onClose();
            }
        };
        this.handleCancel = () => {
            if (typeof this.props.onCancel === 'function') {
                return this.props.onCancel();
            }
            this.close();
        };
        this.close = (evt) => {
            stopPropagation(evt);
            if (this.props.clickOverlayOnClose) {
                this.setState({
                    _isOpened: false,
                }, this.handleClose);
            }
        };
        this.handleTouchMove = (e) => {
            var _a, _b;
            (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
            (_b = e.preventDefault) === null || _b === void 0 ? void 0 : _b.call(e);
        };
        const { isOpened } = props;
        this.state = {
            _isOpened: isOpened,
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isOpened } = nextProps;
        if (isOpened !== this.state._isOpened) {
            this.setState({
                _isOpened: isOpened,
            });
            !isOpened && this.handleClose();
        }
    }
    render() {
        const { title, cancelText, className, customStyle, containerClassName, containerStyle, overlayClassName, overlayStyle, useNativeModal, catchMove, example, } = this.props;
        const { _isOpened } = this.state;
        const rootClass = classNames('fta-action-sheet', {
            'fta-action-sheet--active': _isOpened,
        }, className);
        const overlayClass = classNames('fta-action-sheet__overlay', overlayClassName);
        const containerClz = classNames('fta-action-sheet__container', containerClassName);
        return (React.createElement(Modal, { transparent: true, visible: _isOpened, useNative: useNativeModal },
            React.createElement(View, { className: rootClass, style: customStyle, catchMove: catchMove },
                React.createElement(View, { onClick: this.close, className: overlayClass, style: overlayStyle, onTouchMove: this.handleTouchMove }),
                React.createElement(Motion, { _isOpened: _isOpened, example: example, className: containerClz, customStyle: Object.assign({}, containerStyle) },
                    title ? React.createElement(ActionSheetHeader, null, title) : null,
                    React.createElement(AtActionSheetBody, null, this.props.children),
                    cancelText || ((title === null || title === void 0 ? void 0 : title.icon) && (title === null || title === void 0 ? void 0 : title.confirmText)) ? (React.createElement(ActionSheetFooter, { onClick: this.handleCancel, icon: title === null || title === void 0 ? void 0 : title.icon, confirmText: title === null || title === void 0 ? void 0 : title.confirmText, onConfirm: title === null || title === void 0 ? void 0 : title.onConfirm }, cancelText)) : null,
                    React.createElement(SafeArea, { bottom: true })))));
    }
}
ActionSheet.defaultProps = {
    title: '',
    cancelText: '',
    isOpened: false,
    useNativeModal: true,
    catchMove: true,
    clickOverlayOnClose: true,
};
ActionSheet.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    isOpened: PropTypes.bool.isRequired,
    cancelText: PropTypes.string,
};

const ItemHeight = 30;
/** 获取当前激活的索引 */
const getAcitveIndex = (scrollTop, maxLenth) => {
    // if (scrollTop < 25) return 0
    // if (scrollTop < 25 + 33 - 10) return 1
    // if (scrollTop < 25 + 33 + 10) return 2
    // const index = Math.round((scrollTop - (25 + 33 + 15)) / 20) + 3
    //
    const index = Math.round(scrollTop / ItemHeight);
    return index >= maxLenth ? maxLenth - 1 : index;
};
/** 根据索引获得当前位置 */
const getScrollTopOverIndex = (index) => {
    return ItemHeight * index;
};
const formatNum = (num) => (num < 10 ? `0${num}` : String(num));
/** 获取当前日期·yyyy-mm-dd· */
const getCurrentDate = () => {
    const date = new Date();
    return date.getFullYear() + '-' + formatNum(date.getMonth() + 1) + '-' + formatNum(date.getDate());
};
/** 获取选择精度 */
const getSelectorDepth = (fields) => fields === 'day' ? 3 : fields === 'month' ? 2 : 1;
/** 获取起始日期 */
const parseDate = (date) => date.split('-').map(Number);
/** 生成指定数字区间数组 */
const genPeriodList = (start, end) => new Array(end - start + 1).fill(0).map((_, i) => start + i);
/** 根据年月获取当前月有多少天 */
const getDaysCount = (year, month) => new Date(year, month, 0).getDate();
/** 获取安全的scrollTop */
// export const resolveSafeScrollTop = (scrollTop: number, length: number) => {
// let safeScrollTop = scrollTop
// if (length >= 5) {
//   const maxScrollTop = 20 * length + 13 * 2 + 30 * 2
//   if (safeScrollTop > maxScrollTop) {
//     safeScrollTop = maxScrollTop
//   }
// }
// return scrollTop
// }
/** item是否对齐 */
const getAlignedIndex = (scrollTop, range) => {
    const indexOffset = scrollTop / ItemHeight;
    let indexAligned = Math.round(indexOffset);
    if (indexAligned > range.length - 1) {
        indexAligned = range.length - 1;
    }
    return indexAligned * ItemHeight;
};
/** 获取当前时间 */
const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return formatNum(hours) + ':' + formatNum(minutes);
};
/** 解析时间·hh:mm· */
const parseTime = (time) => {
    return time.split(':').map(Number);
};
/** useArray hook */
const useArray = (initialArray) => {
    const [array, _setArray] = useState(initialArray);
    const setArray = (value, index) => {
        if (value === array[index])
            return;
        const copy = array.slice();
        copy[index] = value;
        _setArray(copy);
    };
    return [array, setArray, _setArray];
};
/** 判断children节点是否为空 */
const isChildrenNull = (children) => {
    if (!children)
        return true;
    if (Array.isArray(children) && children.every((child) => child == null)) {
        return true;
    }
    return false;
};
// export const useLatest = <T extends any>(current: T) => {
//   const storedValue = useRef(current)
//   useEffect(() => {
//     storedValue.current = current
//   })
//   return storedValue
// }
// export const useThrottle = (fn: (...args: any) => any, delay = 10) => {
//   // const timerRef = useRef<NodeJS.Timeout>()
//   const latestFn = useLatest(fn).current
//   const timeRef = useRef(+new Date())
//   return useCallback(
//     (...args: any[]) => {
//       const nowTime = +new Date()
//       if (nowTime - timeRef.current > delay) {
//         timeRef.current = nowTime
//         latestFn.apply(null, args)
//       } else {
//         console.log('节流')
//       }
//     },
//     [latestFn]
//   )
// }
// export const useForceUpdate = (): (() => void) => {
//   const [, force2Update] = useState<{}>(Object.create(null))
//   const forceUpdate = useCallback((): void => {
//     force2Update(Object.create(null))
//   }, [force2Update])
//   return forceUpdate
// }

// console.log(getCurrentDate(), 'getCurrentDate')
const builtInModes = [
    'selector',
    /** 多列选择器 */
    'multiSelector',
    /** 时间选择器 */
    'time',
    /** 日期选择器 */
    'date',
    /** 省市区选择器 */
    // 'region',
];
function _ScrollArea(props) {
    const { activeIndex, range, format, onChange, scrollWithAnimation } = props;
    const activeIndexRef = useRef(+activeIndex >= 0 ? +activeIndex : 0);
    const [scrollTop, setScrollTop] = useState(getScrollTopOverIndex(activeIndex));
    const timerRef = useRef();
    const [top, setTop] = useState(scrollTop);
    const scrollRef = useRef({ scrollTop, setScrollTop, top, setTop, onChange }).current;
    useEffect(() => {
        scrollRef.scrollTop = scrollTop;
        scrollRef.setScrollTop = setScrollTop;
        scrollRef.top = top;
        scrollRef.setTop = setTop;
        scrollRef.onChange = onChange;
    }, [scrollTop, top, setScrollTop, setTop, onChange]);
    useEffect(() => {
        if (activeIndexRef.current !== activeIndex) {
            activeIndexRef.current = activeIndex;
            const top = getScrollTopOverIndex(activeIndex);
            setScrollTop(top);
            // 需要直接设置高度
            setTop(top);
        }
    }, [activeIndex]);
    useEffect(() => {
        fixOffset();
    }, [scrollTop]);
    /** 滚动 */
    const _onScroll = (e) => {
        const scrollTop = e.detail.scrollTop;
        setScrollTop(scrollTop);
        inRN && setTop(scrollTop);
    };
    /** 滚动到底部 */
    const _onScrollToLower = () => {
        const scrollTop = getScrollTopOverIndex(range.length - 1);
        setScrollTop(scrollTop);
    };
    /**
     * 滑动停止后修复位置偏移
     */
    const fixOffset = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            var _a;
            const scrollTop = scrollRef.scrollTop;
            const offset = getAlignedIndex(scrollTop, range);
            // if (offset > -1) {
            let _activeIndex = getAcitveIndex(offset, range.length);
            const _prevIndex = activeIndexRef.current;
            const needChange = _prevIndex !== _activeIndex;
            if (needChange) {
                activeIndexRef.current = _activeIndex;
                (_a = scrollRef.onChange) === null || _a === void 0 ? void 0 : _a.call(scrollRef, _activeIndex, _prevIndex);
            }
            // WARNING: 滚动位置过小，使得setState生效，前后两次值必须不同
            scrollRef.setTop(offset + Math.abs(scrollTop - offset) / 1000);
            // scrollRef.setScrollTop(offset)
            //
            timerRef.current = null;
            // }
        }, 500);
    };
    return (React.createElement(ScrollView, { scrollY: true, enhanced: true, className: 'fta-picker-block', lowerThreshold: 10, scrollTop: top, bounces: false, 
        // @ts-ignore
        alwaysBounceVertical: false, scrollWithAnimation: scrollWithAnimation, showsVerticalScrollIndicator: false, showScrollbar: false, onScroll: _onScroll, onScrollToLower: _onScrollToLower },
        React.createElement(View, { className: 'fta-picker-item--placeholder' }, range.map((v, i) => {
            // const itemClass = classNames(
            //   'fta-picker-item',
            //   activeIndexRef.current === i && 'fta-picker-item--active'
            // )
            const _value = format(v);
            return (React.createElement(View, { key: `${_value}-${i}-${range[0]}-${range.length}`, className: 'fta-picker-item' },
                React.createElement(Text
                // @ts-ignore
                , { 
                    // @ts-ignore
                    numberOfLines: 1, className: 'fta-picker-item__text' }, _value)));
        }))));
}
_ScrollArea.defaultProps = {
    scrollWithAnimation: true,
    activeIndex: 0,
    format: (v) => v,
    onChange() { },
};
const ScrollArea = memo(_ScrollArea);
const pickerMap = {
    selector: SelectorPicker,
    multiSelector: MultiSelectorPicker,
    time: TimePicker,
    date: DatePicker,
    region: RegionPicker,
};
/**
 * @component
 * 基础Picker
 */
function BasePicker(props) {
    const { isOpened, children, title, methods, cancelText, confirmText, onConfirm, onCancel, value } = props, extrapProps = __rest(props, ["isOpened", "children", "title", "methods", "cancelText", "confirmText", "onConfirm", "onCancel", "value"]);
    return (React.createElement(ActionSheet, Object.assign({ isOpened: isOpened, title: {
            title,
            cancelText,
            confirmText,
            onConfirm() {
                onConfirm === null || onConfirm === void 0 ? void 0 : onConfirm(value);
                console.log('确认值', value);
                methods === null || methods === void 0 ? void 0 : methods.hide();
            },
            onCancel() {
                onCancel === null || onCancel === void 0 ? void 0 : onCancel(value);
                methods === null || methods === void 0 ? void 0 : methods.hide();
            },
        } }, extrapProps),
        React.createElement(View, { className: 'fta-picker', catchMove: true },
            children,
            isChildrenNull(children) ? null : (React.createElement(React.Fragment, null,
                React.createElement(View, { className: 'fta-picker-opacity fta-picker-opacity--top', 
                    // @ts-ignore
                    pointerEvents: 'none' }),
                React.createElement(View, { className: 'fta-picker-line', 
                    // @ts-ignore
                    pointerEvents: 'none' }),
                React.createElement(View, { className: 'fta-picker-opacity fta-picker-opacity--bottom', 
                    // @ts-ignore
                    pointerEvents: 'none' }))))));
}
BasePicker.defaultProps = {
    title: ' ',
    cancelText: '取消',
    confirmText: '确认',
};
/** Picker */
function _Picker(props, ref) {
    const [visible, toggle] = useState(false);
    const methods = {
        show() {
            toggle(true);
        },
        hide() {
            toggle(false);
        },
    };
    useImperativeHandle(ref, () => methods);
    const { mode } = props;
    const _mode = builtInModes.includes(mode) ? mode : 'selector';
    const TypedPicker = pickerMap[_mode];
    // @ts-ignore
    return React.createElement(TypedPicker, Object.assign({}, props, { isOpened: visible, onClose: methods.hide, methods: methods }));
}
const Picker = forwardRef(_Picker);
const pickerDefaultProps = {
    mode: 'selector',
    range: [],
    onChange() { },
};
// @ts-ignore
Picker.defaultProps = pickerDefaultProps;
/** 默认的格式化函数 */
const createDefaultFormat = (rangeKey) => rangeKey ? (value) => value[rangeKey] : void 0;
/* ========================= 类型选择器具体实现 ======================= */
/**
 * @component
 * 单列选择器
 */
function SelectorPicker(props) {
    const { range, rangeKey, value, onChange, format } = props;
    const _format = format || createDefaultFormat(rangeKey);
    const ref = useRef(value || 0);
    const _onChange = (newVal, oldVal) => {
        onChange === null || onChange === void 0 ? void 0 : onChange(newVal, oldVal);
        ref.current = newVal;
    };
    return (React.createElement(BasePicker, Object.assign({}, props, { value: ref.current }),
        React.createElement(ScrollArea, { format: _format, range: range, activeIndex: value, onChange: _onChange })));
}
/**
 * @component
 * 多列选择器
 */
function MultiSelectorPicker(props) {
    const { range, rangeKey, value, onChange, format } = props;
    const [_value, setValue] = useState((value === null || value === void 0 ? void 0 : value.length) ? value : new Array(range.length).fill(0));
    const ref = useRef(_value);
    const _onChange = (newIndex, index) => {
        const copy = _value.slice();
        copy[index] = newIndex;
        onChange === null || onChange === void 0 ? void 0 : onChange(copy, _value);
        setValue(copy);
        ref.current = copy;
    };
    return (React.createElement(BasePicker, Object.assign({}, props, { value: ref.current }), range.map((column, index) => {
        const _format = Array.isArray(format) && format[index] ? format[index] : createDefaultFormat(rangeKey);
        return (React.createElement(ScrollArea, { key: index, format: _format, range: column, activeIndex: _value[index], onChange: (newV) => _onChange(newV, index) }));
    })));
}
const createTimeFormat = (format, index, defaultFormat) => (Array.isArray(format) && format[index] ? format[index] : defaultFormat);
const months = genPeriodList(1, 12);
const days = genPeriodList(1, 31);
const dYearFormat = (v) => (v === 9999 ? '长期' : `${v}年`);
const dMonthFormat = (v) => `${v}月`;
const dDayFormat = (v) => `${v}日`;
/**
 * @component
 * 日期选择器
 */
function DatePicker(props) {
    const { start, end, value, onChange, longterm, format, fields } = props;
    const depth = useRef(getSelectorDepth(fields)).current;
    const [y1, m1, d1] = useRef(parseDate(start)).current;
    const [y2, m2, d2] = useRef(parseDate(end)).current;
    const [indexs, _setIndexs] = useState([0, 0, 0]);
    const setIndexs = (value, depth) => {
        // if(depth)
        const copy = indexs.slice();
        copy[depth] = value;
        // console.log('indexs', copy, indexs)
        _setIndexs(copy);
        // @ts-ignore
        onChange === null || onChange === void 0 ? void 0 : onChange(dateRef);
    };
    const nowDates = parseDate(value);
    const dateRef = useRef(nowDates).current;
    const [y, m, d] = dateRef;
    const years = useRef(genPeriodList(y1, y2).concat(longterm ? [9999] : [])).current;
    // let yTimerRef = useRef<NodeJS.Timer | null>(null)
    const onYearChange = (i) => {
        dateRef[0] = years[i];
        setIndexs(years[i] === 9999 ? indexs[0] : i, 0);
        // if (yTimerRef.current) {
        //   clearTimeout(yTimerRef.current)
        //   yTimerRef.current = null
        // }
        // yTimerRef.current = setTimeout(() => {
        // }, 150)
    };
    let MonthElement = null;
    let DayElement = null;
    const yIndex = years.indexOf(y);
    // 年份
    const YearElement = (React.createElement(ScrollArea, { activeIndex: yIndex, range: years, format: createTimeFormat(format, 0, dYearFormat), onChange: onYearChange }));
    // 月份
    if (depth > 1) {
        const _months = months.slice();
        if (
        // 结束月份早于12月
        m2 !== 12 &&
            // 当前位于结束年份
            dateRef[0] === y2) {
            _months.splice(m2, 12 - m2);
        }
        if (
        // 起始月份不是从第一个月开始
        m1 !== 1 &&
            // 当前位于起始年份
            dateRef[0] === y1) {
            _months.splice(0, m1 - 1);
        }
        let tmp;
        let mActiveIndex = (tmp = _months.indexOf(m)) === -1
            ? m > _months[_months.length - 1]
                ? _months.length - 1
                : 0
            : tmp;
        MonthElement = (React.createElement(ScrollArea, { activeIndex: mActiveIndex, range: _months, format: createTimeFormat(format, 1, dMonthFormat), onChange: (i) => {
                // console.log('m change')
                dateRef[1] = _months[i];
                setIndexs(i, 1);
            } }));
        // FIXME: 重新赋值 DONE！
        dateRef[1] = _months[mActiveIndex];
        // 日期
        if (depth > 2) {
            // FIXME: 引用最新的月份 DONE！
            const m = dateRef[1];
            const count = getDaysCount(y, m);
            const _days = days.slice(0, count);
            if (
            // 结束日期不是最后一天
            d2 !== count &&
                // 当前位于结束年份
                dateRef[0] === y2 &&
                // 当前位于结束月份
                dateRef[1] === m2) {
                _days.splice(d2, count - d2);
            }
            if (
            // 起始日期不是从第一天开始
            d1 !== 1 &&
                // 当前位于起始年份
                dateRef[0] === y1 &&
                // 当前位于起始月份
                dateRef[1] === m1) {
                _days.splice(0, d1 - 1);
            }
            let i;
            let dActiveIndex = (i = _days.indexOf(d)) === -1 ? (d > _days[_days.length - 1] ? _days.length - 1 : 0) : i;
            dateRef[2] = _days[dActiveIndex];
            DayElement = (React.createElement(ScrollArea, { activeIndex: dActiveIndex, range: _days, format: createTimeFormat(format, 2, dDayFormat), onChange: (i) => {
                    // console.log('d changed index:' + i, 'value:' + _days[i])
                    dateRef[2] = _days[i];
                    setIndexs(i, 2);
                } }));
        }
    }
    return (React.createElement(BasePicker, Object.assign({}, props, { value: dateRef.map(formatNum).join('-') }),
        YearElement,
        MonthElement,
        DayElement));
}
DatePicker.defaultProps = {
    start: '1970-01-01',
    end: '2099-12-31',
    fields: 'day',
    value: getCurrentDate(),
    longterm: false,
};
const totalHours = genPeriodList(0, 23);
const totalMins = genPeriodList(0, 59);
/**
 * @component
 * 时间选择器
 */
function TimePicker(props) {
    const { start, end, value = getCurrentTime() } = props;
    // 起始时分
    const [[h1, m1], [h2, m2]] = useRef([parseTime(start), parseTime(end)]).current;
    // 小时区间不变, 用Ref存储
    const hours = useRef(totalHours.slice(h1, h2 + 1)).current;
    // 存储更新之前分针的区间
    const preRef = useRef(totalMins.length);
    const [times, setTimes, replaceTimes] = useArray([h1, h2]);
    const [indexs, setIndexs, replaceIndexs] = useArray([0, 0]);
    const [mins, setMins] = useState(totalMins.slice());
    // 根据value值来取索引
    useEffect(() => {
        const [h, m] = parseTime(value);
        let hIndex = 0;
        let mIndex = 0;
        if (h >= h1 && h <= h2) {
            hIndex = hours.indexOf(h);
            // 分针位置
            if (h1 === h2) {
                if (h === h1 && m >= m1 && m <= m2) {
                    mIndex = m - m1;
                }
            }
            else if (h > h1 && h < h2) {
                mIndex = m;
            }
            else if (h === h1) {
                mIndex = m >= m1 ? m - m1 : 0;
            }
            else if (h === h2) {
                mIndex = m <= m2 ? m : 0;
            }
        }
        replaceIndexs([hIndex, mIndex]);
        replaceTimes([hours[hIndex], mins[mIndex]]);
    }, [value]);
    // 根据当前选择的小时来展示分钟区间
    useEffect(() => {
        const minsCopy = totalMins.slice();
        const activeHour = hours[indexs[0]];
        let shortened = false; // 列表是否被裁剪
        // 选择了结束小时
        if (m2 !== 59 && hours[hours.length - 1] === activeHour) {
            minsCopy.splice(m2, 60 - m2);
            shortened = true;
        }
        // 选择了初始小时
        if (m1 !== 0 && hours[0] === activeHour) {
            minsCopy.splice(0, m1);
            shortened = true;
        }
        if (
        // 裁剪了
        shortened ||
            // 之前的长度不等于现在数组的长度
            preRef.current !== minsCopy.length ||
            // 之前被裁剪过
            preRef.current !== 60) {
            // console.log('更新分针列表：' + indexs[1])
            preRef.current = minsCopy.length;
            const mVal = mins[indexs[1]];
            let tmp;
            if (!((tmp = minsCopy.indexOf(mVal)) > -1)) {
                tmp = 0;
            }
            setIndexs(tmp, 1);
            setTimes(minsCopy[tmp], 1);
            setMins(minsCopy);
        }
    }, [indexs[0]]);
    return (React.createElement(BasePicker, Object.assign({}, props, { value: times.map(formatNum).join(':') }),
        React.createElement(ScrollArea, { activeIndex: indexs[0], range: hours, format: (v) => `${formatNum(v)}时`, onChange: (i) => {
                setIndexs(i, 0);
                setTimes(hours[i], 0);
            } }),
        React.createElement(ScrollArea, { activeIndex: indexs[1], range: mins, format: (v) => `${formatNum(v)}分`, onChange: (i) => {
                setIndexs(i, 1);
                setTimes(mins[i], 1);
            } })));
}
TimePicker.defaultProps = {
    start: '00:00',
    end: '23:59',
};
/**
 * TODO: 待支持
 * @component
 * 地址选择器
 */
function RegionPicker() {
    return React.createElement(BasePicker, null);
}

export { BasePicker, ScrollArea, Picker as default };
