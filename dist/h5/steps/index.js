import './index.css';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { cloneElement } from 'react';
import { isArray, isString } from '../common';

function Steps(props) {
    var _a;
    const { children, items, current, type, onChange, format } = props;
    return (React.createElement(View, { className: 'fta-steps' }, ((_a = children === null || children === void 0 ? void 0 : children.map) === null || _a === void 0 ? void 0 : _a.call(children, (child, index) => cloneElement(child, {
        index,
        type,
        endpoint: index === children.length - 1,
        startpoint: !index,
        onChange: (i) => i !== current && onChange(i),
        key: index,
        active: current >= index,
        current: current === index,
        mark: isArray(format) ? format[index] : format(index),
    }))) ||
        items.map((item, index) => (React.createElement(StepsItem, Object.assign({ onChange: (i) => i !== current && onChange(i), key: index, index: index, active: current >= index, current: current === index, type: type, startpoint: !index, endpoint: index === items.length - 1, mark: isArray(format) ? format[index] : format(index) }, item))))));
}
/**
 * @type {StepsProps}
 */
Steps.defaultProps = {
    items: [],
    current: 0,
    type: 'dot',
    onChange: () => { },
    format: (i) => i + 1,
};
function StepsItem(props) {
    const { title, desc, startpoint, endpoint, active, type, current, index, mark, onChange, render, } = props;
    const rootClz = classNames('fta-step');
    const wrapClz = classNames('fta-step-wrap', `fta-step-wrap--${type}`);
    const ballClz = classNames('fta-step-ball', type === 'dot' ? 'fta-step-ball--dot' : 'fta-step-ball--ordered', {
        'fta-step-ball--active': active,
    });
    const leftLineClz = classNames('fta-step-line', {
        'fta-step-line--active': active,
    });
    const rightLineClz = classNames('fta-step-line', {
        'fta-step-line--active': active,
        'fta-step-line--inactive': current,
    });
    const titleClz = classNames('fta-step-title__text', {
        'fta-step-title__text--active': active,
    });
    const descClz = desc
        ? classNames('fta-step-desc__text', {
            'fta-step-desc__text--active': active,
        })
        : void 0;
    return (React.createElement(View, { className: rootClz, onClick: () => onChange === null || onChange === void 0 ? void 0 : onChange(index) },
        React.createElement(View, { className: wrapClz },
            startpoint ? React.createElement(View, { className: 'fta-step-lineless' }) : React.createElement(View, { className: leftLineClz }),
            type === 'custom' && render ? (render) : (React.createElement(View, { className: ballClz }, type !== 'dot' ? React.createElement(Text, { className: 'fta-step-index' }, mark) : null)),
            endpoint ? React.createElement(View, { className: 'fta-step-lineless' }) : React.createElement(View, { className: rightLineClz })),
        React.createElement(View, { className: 'fta-step-title' }, isString(title) ? React.createElement(Text, { className: titleClz }, title) : title),
        desc ? (React.createElement(View, { className: 'fta-step-desc' }, isString(desc) ? React.createElement(Text, { className: descClz }, desc) : desc)) : null));
}
/**
 * @type {StepsProps}
 */
StepsItem.defaultProps = {
    type: 'dot',
};

export { StepsItem, Steps as default };
