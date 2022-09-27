import './index.css';
import { View, Image, Button, Form, Text as Text$1 } from '@tarojs/components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inWeapp, inWeb, inAlipay, isString, inRN, useCarelessClass, useCareMode, scale, px, Assets as Assets$1 } from '../common';
import classNames from 'classnames';

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
            isString(children) ? (React.createElement(Text$1, { className: textClass, style: textStyle }, children)) : (children)));
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

const STATUS = {
    success: {
        src: Assets$1.tip.success,
        title: '操作成功',
    },
    error: {
        src: Assets$1.tip.error,
        title: '操作失败',
    },
    waiting: {
        src: Assets$1.tip.waiting,
    },
    warning: {
        src: Assets$1.tip.warning,
    },
    info: {
        src: Assets$1.tip.info,
    },
};
class Result extends Component {
    render() {
        const { type, renderBtn, btnText, onClick } = this.props;
        const { src, title, desc } = Object.assign(Object.assign({}, STATUS[type]), this.props);
        const [titleClz, descClz, btnClz] = [
            'fta-result-title__text',
            'fta-result-desc__text',
            'fta-result-button',
            // 'fta-result-button__text',
        ];
        return (React.createElement(View, { className: 'fta-result' },
            React.createElement(Image, { className: 'fta-result-image', src: src, mode: 'aspectFill' }),
            title ? (React.createElement(View, { className: 'fta-result-title' },
                React.createElement(Text, { level: 3, className: titleClz }, title))) : null,
            desc ? (React.createElement(View, { className: 'fta-result-desc' },
                React.createElement(Text, { level: 4, className: descClz }, desc))) : null,
            renderBtn || (React.createElement(FTAButton, { className: btnClz, onClick: onClick }, btnText))));
    }
}
Result.defaultProps = {
    type: 'success',
    btnText: '返回',
};
Result.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'waiting', 'info', 'warning']),
};

export { Result as default };
