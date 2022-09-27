import './index.css';
import { View, Text, Image } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import { isString, Assets } from '../common';

const IMAGE_PREFIX = 'https://imagecdn.ymm56.com/ymmfile/static/resource/';
const srcset = {
    'rich-unused': IMAGE_PREFIX + '2cb799e7-d6ee-4771-ab63-6a1848692b1d.png',
    'rich-used': IMAGE_PREFIX + 'ad1e375c-0029-4fdc-b635-e069ae5fc4a8.png',
    'rich-expired': IMAGE_PREFIX + '697d6222-848a-4205-8535-7de2294cf585.png',
    'simple-used': IMAGE_PREFIX + 'dc5d4b83-03b6-471f-9567-2399b638bf83.png',
    'simple-expired': IMAGE_PREFIX + 'c5e8d09e-9f43-44a7-bca6-ad0579ab263a.png',
};
function Coupon(props) {
    const { className, customStyle, 
    // @ts-ignore
    style, status, type, price, meet, title, src, desc, period, remark, remarkBgColor, remarkColor, btnText, showExpand, onBtnClick, onClick, onExpand, } = props;
    const disabled = ['used', 'expired', 'disabled'].includes(status);
    const disabledClass = disabled && 'fta-coupon__text--disabled';
    const hitTextClass = (clazz) => classNames(clazz, disabledClass);
    const rootClass = classNames('fta-coupon', `fta-coupon--${type}`, className);
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    const containerClass = classNames('fta-coupon-container', `fta-coupon-coupon--${type}`);
    const leftClass = classNames('fta-coupon-left', `fta-coupon-left--${type}`);
    const rightClass = classNames('fta-coupon-right', `fta-coupon-right--${type}`);
    const simpleDisabled = disabled && type === 'simple';
    const remarkStyle = {};
    const bgStyle = {};
    if (!simpleDisabled) {
        let i;
        if ((i = remarkBgColor))
            bgStyle.backgroundColor = i;
        if ((i = remarkColor))
            remarkStyle.color = i;
    }
    return (React.createElement(View, { className: rootClass, style: rootStyle, onClick: onClick },
        React.createElement(View, { className: containerClass },
            React.createElement(View, { className: leftClass },
                React.createElement(View, { className: 'fta-coupon-price' },
                    React.createElement(Text, { className: hitTextClass('fta-coupon-price-sign') }, "\uFFE5"),
                    React.createElement(Text, { className: hitTextClass('fta-coupon-price-value') }, price)),
                React.createElement(View, { className: 'fta-coupon-meet' },
                    React.createElement(Text, { className: 'fta-coupon-meet__text' }, isString(meet) ? meet : meet <= 0 ? '无门槛' : `满${meet}元可用`))),
            React.createElement(View, { className: 'fta-coupon-line' }),
            React.createElement(View, { className: rightClass },
                React.createElement(View, { className: 'fta-coupon-detail' },
                    React.createElement(Text, { className: hitTextClass('fta-coupon-title') }, title),
                    React.createElement(View, { className: classNames('fta-coupon-remark', disabled && 'fta-coupon-remark--disabled', simpleDisabled && 'fta-coupon-remark--disabled--simple'), style: bgStyle },
                        React.createElement(Text, { className: classNames('fta-coupon-remark__text', simpleDisabled && 'fta-coupon-remark__text--disabled'), style: remarkStyle }, remark)),
                    React.createElement(Text, { className: 'fta-coupon-period' }, period)),
                type === 'rich' ? (status === 'unused' ? (React.createElement(View, { className: 'fta-coupon-button', onClick: onBtnClick, 
                    // @ts-ignore
                    hoverClassName: 'fta-coupon-button--hover', hoverClass: 'fta-coupon-button--hover' },
                    React.createElement(Text, { className: 'fta-coupon-button__text' }, btnText))) : null) : status === 'unused' ? (React.createElement(View, { className: 'fta-coupon-radio', onClick: onBtnClick })) : status === 'disabled' ? null : (React.createElement(Image, { src: src || srcset[`${type}-${status}`], className: 'fta-coupon-status' })))),
        type === 'rich' ? (React.createElement(React.Fragment, null,
            React.createElement(Image, { src: src || srcset[`${type}-${status}`], className: 'fta-coupon-bg' }),
            React.createElement(View, { className: 'fta-coupon-desc' },
                React.createElement(Text, { className: 'fta-coupon-desc__text' }, desc),
                showExpand ? (React.createElement(Image, { onClick: onExpand, src: Assets.arrow.down, className: 'fta-coupon-desc__down' })) : null))) : null));
}
const defaultProps = {
    type: 'simple',
    price: 50,
    meet: 150,
    showExpand: true,
    status: 'unused',
    btnText: '去使用',
    remark: '通用券',
};
Coupon.defaultProps = defaultProps;

export { Coupon as default };
