import './index.css';
import { View, Text, Image, Button, Form } from '@tarojs/components';
import classNames from 'classnames';
import React, { Fragment, createContext, Component, useState, useMemo, useEffect } from 'react';
import { systemInfo, inRN, inAndroid, inNotch, inWeb, inIOS, px, inAlipay, upperCase, isFunction, isString, inWeapp, Assets as Assets$1, isNumber } from '../common';
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

/** 乱序排列 */
function disorderList(list, flag) {
    if (!flag)
        return list;
    const newer = [];
    const copied = list.slice();
    let len = copied.length;
    while (len) {
        newer.push(copied.splice(~~(Math.random() * len), 1)[0]);
        len = copied.length;
    }
    return newer;
}
function validate(value, validator, typing = true) {
    if (!validator)
        return true;
    if (validator instanceof RegExp) {
        return validator.test(value);
    }
    if (typeof validator === 'function') {
        return validator(value, typing);
    }
    return true;
}
const typePresets = ['number', 'decimal', 'id'];
const baseButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const presets = {
    number: [null, 0],
    decimal: ['.', 0],
    id: ['X', 0],
};
const Validators = {
    number: /^(([1-9]\d*)|(0))$/,
    decimal: (value, typing) => {
        return (typing ? /^(([1-9]\d*)|((0|([1-9]\d*))(\.\d*)))$/ : /^(([1-9]\d*)|((0|([1-9]\d*))(\.\d+)))$/).test(value);
    },
    id: (value, typing) => {
        return (typing
            ? /(^\d{0,18}$)|(^\d{17}X?$)/i
            : /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(value);
    },
    phone: (value, typing) => {
        return (typing
            ? /^1\d{0,10}$/
            : /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(value);
    },
    // email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
    // postcode: /^[1-9]\d{5}(?!\d)$/,
};
const InputAdapter = Text;
function Keyboard(props) {
    const { type, hideInputBox, value, controlled, validator, disorder, placeholder, maxlength, onChange, onConfirm, customButtons, children } = props, actionSheetProps = __rest(props, ["type", "hideInputBox", "value", "controlled", "validator", "disorder", "placeholder", "maxlength", "onChange", "onConfirm", "customButtons", "children"]);
    const [val, _setVal] = useState(String(value));
    const isBasicType = typePresets.includes(type);
    const setVal = (char, _index) => {
        const newVal = val + String(char);
        if (newVal.length > maxlength)
            return;
        if (controlled)
            return onChange(newVal, val);
        const _validator = validator || (isBasicType ? Validators[type] : void 0);
        if (validate(newVal, _validator)) {
            _setVal(newVal);
            onChange(newVal, val);
        }
    };
    const buttons = useMemo(() => {
        const orderedButtons = isBasicType
            ? baseButtons.concat(presets[type])
            : type === 'custom'
                ? customButtons
                : [];
        // 是否打乱列表
        const _buttons = disorderList(orderedButtons, disorder);
        // 占位符固定
        if (type === 'number') {
            const pidx = _buttons.indexOf(null);
            _buttons.splice(pidx, 1);
            return _buttons
                .slice(0, 9)
                .concat(null)
                .concat(_buttons.slice(9));
        }
        return _buttons;
    }, [disorder, type]);
    useEffect(() => {
        if (controlled) {
            _setVal(String(value));
        }
    }, [value, controlled]);
    const renderDeleteButton = () => (React.createElement(KeyboardButton, { onClick: () => {
            const newVal = val.slice(0, -1);
            _setVal(newVal);
            onChange(newVal, val);
        } },
        React.createElement(DeleteButton, null)));
    const inputTextClz = classNames('fta-keyboard-input__inner-text', placeholder && val === '' && 'fta-keyboard-placeholder');
    const fullCustom = type === 'custom' && !(customButtons === null || customButtons === void 0 ? void 0 : customButtons.length);
    return (React.createElement(ActionSheet, Object.assign({}, actionSheetProps, { onConfirm: () => onConfirm(val, validate(val, validator, false)) }),
        React.createElement(React.Fragment, null,
            hideInputBox ? null : (React.createElement(View, { className: 'fta-keyboard-input' },
                React.createElement(View, { className: 'fta-keyboard-input__inner' },
                    React.createElement(InputAdapter, { className: inputTextClz }, val === '' ? placeholder : val)))),
            React.createElement(View, { className: 'fta-keyboard' },
                fullCustom
                    ? children
                    : buttons.map((v, i) => v == null ? (React.createElement(Placeholder, { key: i })) : (React.createElement(KeyboardButton, { _index: i, key: i, val: v, onClick: setVal }, v))),
                fullCustom ? null : renderDeleteButton()))));
}
/**
 * 输入按钮
 */
function KeyboardButton(props) {
    const { onClick, val, _index, hoverStyle, children } = props;
    return (React.createElement(View, { className: 'fta-keyboard-item', hoverStyle: hoverStyle, hoverClass: 'fta-keyboard-item--hover', onClick: () => onClick === null || onClick === void 0 ? void 0 : onClick(val, _index) }, isString(children) || isNumber(children) ? (React.createElement(Text, { className: 'fta-keyboard-item__text' }, children)) : (children || React.createElement(Text, { className: 'fta-keyboard-item__text' }, val))));
}
/**
 * 空白占位符
 */
function Placeholder() {
    return React.createElement(View, { className: 'fta-keyboard-item' });
}
/**
 * 删除按钮
 */
function DeleteButton() {
    return (React.createElement(Image, { className: 'fta-keyboard-delete', src: 'https://imagecdn.ymm56.com/ymmfile/static/resource/a0c5fc81-80a0-47c9-ad55-e3fb8d875507.png' })
    // <View className='fta-keyboard-delete'>
    //   <View className='fta-keyboard-delete-triangle' />
    //   <View className='fta-keyboard-delete-square'>
    //     <Text className='fta-keyboard-delete__text'>×</Text>
    //   </View>
    // </View>
    );
}
const defaultProps = {
    value: '',
    controlled: false,
    hideInputBox: false,
    type: 'number',
    maxlength: 140,
    title: {
        title: '请输入',
        cancelText: '取消',
        confirmText: '确定',
    },
    isOpened: true,
    disorder: false,
    customButtons: [],
    onChange() { },
    onConfirm() { },
};
const defaultItemProps = {
    hoverStyle: {
        backgroundColor: '#dddddd',
    },
};
KeyboardButton.defaultProps = defaultItemProps;
Keyboard.defaultProps = defaultProps;
Keyboard.DeleteButton = DeleteButton;
Keyboard.Placeholder = Placeholder;
Keyboard.validators = Validators;
Keyboard.Button = KeyboardButton;

export { Keyboard as default };
