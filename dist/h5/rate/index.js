import './index.css';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { scale } from '../common';

const IMAGE_PREFIX = 'https://imagecdn.ymm56.com/ymmfile/static/resource/';
const STAR = {
    inactive: '0a8f0880-6fcd-4e37-8480-cbd3408bd6b7.png',
    active: '68b1135e-3a2f-4caa-9662-08a9676aee53.png',
    halfactive: '92aa7285-f3ac-4cd9-9ca3-8d6115e2d9e9.png',
    inactivedisabled: '93310f72-eeac-4287-8e7f-dd232880ccd1.png',
    activedisabled: '641a42f9-0122-4899-abed-2bd798d8b965.png',
    halfdisabled: 'e80a3fac-541d-41a6-b419-37e2e92e9df5.png',
};
function Rate(props) {
    const { value, customStyle, className, onChange, count, min, half, readonly, disabled, size, gutter, 
    // @ts-ignore
    style, } = props;
    const emptyList = useRef(new Array(count).fill(null)).current;
    const rootClass = classNames('fta-rate', className);
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    const onStarClick = (index, left) => {
        if (readonly || disabled || (!half && value === index + 1))
            return;
        if (index + 1 < min) {
            onChange === null || onChange === void 0 ? void 0 : onChange(min);
            return;
        }
        if (half) {
            const newVal = index + (left ? 0.5 : 1);
            if (newVal !== value) {
                // console.log('half click', newVal)
                onChange === null || onChange === void 0 ? void 0 : onChange(newVal);
            }
        }
        else {
            onChange === null || onChange === void 0 ? void 0 : onChange(index + 1);
        }
    };
    const getStarStatus = (i) => {
        const val = value - 1;
        const result = val - i;
        if (result >= 0) {
            return disabled ? 'activedisabled' : 'active';
            // if (half && result === 1.51) {
            //   return disabled ? 'halfdisabled' : 'halfactive'
            // } else {
            //   return disabled ? 'activedisabled' : 'active'
            // }
        }
        else {
            // return disabled ? 'inactivedisabled' : 'inactive'
            if (half && result === -0.5) {
                return disabled ? 'halfdisabled' : 'halfactive';
            }
            else {
                return disabled ? 'inactivedisabled' : 'inactive';
            }
        }
    };
    return (React.createElement(View, { className: rootClass, style: rootStyle }, emptyList.map((_, i) => (React.createElement(Star, { key: i, half: half, size: size, gutter: gutter, onClick: (left) => onStarClick(i, left), src: IMAGE_PREFIX + (STAR[getStarStatus(i)] || STAR.inactive) })))));
}
function Star(props) {
    const { src, size, gutter, half, last, onClick } = props;
    const rootClass = classNames('fta-star', last && 'fta-start--last');
    const rootStyle = {};
    if (size) {
        rootStyle.width = scale(size);
        rootStyle.height = scale(size);
    }
    if (gutter)
        rootStyle.marginRight = scale(gutter);
    const onHalfClick = (left) => {
        if (half) {
            onClick === null || onClick === void 0 ? void 0 : onClick(left);
        }
    };
    return (React.createElement(View, { className: rootClass, style: rootStyle, onClick: half ? void 0 : () => onClick === null || onClick === void 0 ? void 0 : onClick(true) },
        React.createElement(Image, { className: 'fta-star-image', src: src || IMAGE_PREFIX + STAR.active, 
            // @ts-ignore
            draggable: 'false' }),
        half ? (React.createElement(React.Fragment, null,
            React.createElement(View, { className: 'fta-star--placeholder fta-star--left', onClick: () => onHalfClick(true) }),
            React.createElement(View, { className: 'fta-star--placeholder fta-star--right', onClick: () => onHalfClick(false) }))) : null));
}
const RateDefaultProps = {
    value: 1,
    min: 1,
    count: 5,
    half: false,
    readonly: false,
    disabled: false,
};
Rate.defaultProps = RateDefaultProps;

export { Rate as default };
