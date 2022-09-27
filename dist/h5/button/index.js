import './index.css';
import { View, Image, Button, Form, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inWeapp, inWeb, inAlipay, isString, inRN } from '../common';

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

export { FTAButton as default };
