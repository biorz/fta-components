import './index.css';
import { View, Text, Image } from '@tarojs/components';
import classNames from 'classnames';
import React, { forwardRef, useState, cloneElement, useImperativeHandle, useEffect, Fragment, useRef } from 'react';
import { isString, useMeasure, inRN, isFunction, px } from '../common';

function createRootSiblings(_element) {
    return {
        update(_element) { },
        destroy() { },
    };
}
const withRootSiblings = (Component) => Component;

const useOnceCallback = (cb) => {
    const timesRef = useRef(true);
    const resRef = useRef();
    if (timesRef.current) {
        timesRef.current = false;
        resRef.current = cb();
    }
    return resRef;
};
function Tooltip(props) {
    const { children, className, customStyle, 
    // @ts-ignore
    style, content, isOpened, icon, iconClassName, iconStyle, contentClassName, contentStyle, popoverClassName, popoverStyle, textClassName, textStyle, } = props;
    const rootClass = classNames('fta-tooltip', className);
    const iconClass = classNames('fta-tooltip-popover__icon', iconClassName);
    const popClass = classNames('fta-tooltip-popover', popoverClassName);
    const textClass = classNames('fta-tooltip-popover__content__text', textClassName);
    const contentClass = classNames('fta-tooltip-popover__content', contentClassName);
    return (React.createElement(View, { className: rootClass, style: Object.assign(Object.assign({}, style), customStyle) },
        isOpened ? (React.createElement(View, { className: popClass, style: popoverStyle, 
            // @ts-ignore
            pointerEvents: 'box-none' },
            React.createElement(View, { className: contentClass, style: contentStyle }, isString(content) ? (React.createElement(Text, { className: textClass, style: textStyle }, content)) : (content)),
            React.createElement(Image, { className: iconClass, style: iconStyle, src: icon }))) : null,
        children));
}
const defaultRect = {
    left: 0,
    right: 0,
    // hack
    top: -0.1,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
};
const position = inRN ? 'absolute' : 'fixed';
function _TooltipView(props, ref) {
    const { children, render, overlay, overlayClassName, overlayStyle, clickOverlayOnClose = true, } = props;
    const [visible, setVisible] = useState(false);
    const [rect, setRect] = useState(defaultRect);
    const [refs, measure] = useMeasure();
    const clonedChildren = cloneElement(children, refs);
    useImperativeHandle(ref, () => ({
        show: () => setVisible(true),
        hide: () => setVisible(false),
        measure: () => measure().then(setRect),
    }));
    useEffect(() => {
        if (visible) {
            measure().then((res) => {
                console.log('res', res);
                setRect(res);
            });
        }
    }, [visible]);
    useEffect(() => {
        var _a, _b;
        inRN && ((_b = (_a = sRef.current) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, renderTooltip()));
        return () => { var _a, _b; return inRN && ((_b = (_a = sRef.current) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a)); };
    });
    const renderTooltip = () => {
        if (visible) {
            const wrapperEl = rect.top === -0.1 ? null : isFunction(render) ? (render(rect)) : (React.createElement(View, { className: 'fta-tooltip-wrapper', style: { position, top: px(rect.top), left: px(rect.left) }, 
                // @ts-ignore
                pointerEvents: 'box-none' }, render));
            return overlay ? (React.createElement(View, { className: classNames('fta-tooltip-overlay', overlayClassName), style: overlayStyle, onClick: () => {
                    clickOverlayOnClose && setVisible(false);
                } }, wrapperEl)) : (wrapperEl);
        }
        return React.createElement(Fragment, null);
    };
    const sRef = useOnceCallback(() => createRootSiblings(renderTooltip()));
    return (React.createElement(Fragment, null,
        inRN ? null : renderTooltip(),
        clonedChildren));
}
const TooltipView = forwardRef(_TooltipView);
const defaultProps = {
    isOpened: true,
    icon: 'https://imagecdn.ymm56.com/ymmfile/static/resource/006b5964-32f4-47ba-9c5f-6209360421ad.png',
};
Tooltip.defaultProps = defaultProps;

export { TooltipView, Tooltip as default, withRootSiblings as withTooltip };
