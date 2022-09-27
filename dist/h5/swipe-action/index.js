import './index.css';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { createSelectorQuery } from '@tarojs/taro';

const isArray = Array.isArray;
/** 中间态适配器 */
const callbackAdaptor = (callback) => (rect) => callback(isArray(rect) ? rect[0] : rect);
function PolyCreateSelectorQuery(selector, callback) {
    const cb = callbackAdaptor(callback);
    const query = createSelectorQuery();
    const el = query.select(selector);
    el.boundingClientRect(cb);
    query.exec(cb);
}

const inRN = process.env.TARO_ENV === 'rn';
// const inDesktop = typeof window !== 'undefined' && !('ontouchstart' in window)
const px = inRN ? (num) => num : (num) => num + 'px';
const transitionClass = 'fta-swipe-action-modal__transition';
const getPageX = inRN
    ? (e) => e.nativeEvent.pageX
    : (e) => e.changedTouches[0].pageX;
/**
 * 是否能继续滑动
 */
function isMovable(left, offset, distance) {
    return ((!left && offset <= 0) || (left && offset >= 0)) && Math.abs(offset) <= distance;
}
function SwipeAction(props) {
    const { className, children, style, disabled, show, left, breakpoint, render, options, swipeClassName, swipeStyle, follow, swipeProps, } = props;
    const [distance, setDistance] = useState(props.distance || 0);
    const [offset, setOffset] = useState(0);
    const [transition, useTransition] = useState(transitionClass);
    const ref = useRef({
        setOffset,
        startX: 0,
        offset: 0,
        timer: null,
        show: false,
        transitionClass: '',
    });
    const rootClass = classNames('fta-swipe-action', className);
    useEffect(() => {
        !inRN &&
            !props.distance &&
            setTimeout(() => PolyCreateSelectorQuery('.fta-swipe-action-button-group', (rect) => {
                setDistance(rect.width);
            }));
    }, [options.length]);
    useEffect(() => {
        ref.current.show = show;
    }, [props.show]);
    useEffect(() => {
        ref.current.setOffset = setOffset;
    }, [setOffset]);
    useEffect(() => {
        const d = show ? (left ? distance : -1 * distance) : 0;
        setOffset(d);
        ref.current.offset = d;
    }, [show, setOffset, distance, left]);
    function onTouchStart(e) {
        if (disabled)
            return;
        useTransition('');
        const cur = ref.current;
        cur.startX = e.changedTouches[0].pageX;
        cur.transitionClass = '';
        // console.log(offset, 'touchstart')
    }
    function onTouchMove(e) {
        var _a;
        if (disabled)
            return;
        (_a = e.preventDefault) === null || _a === void 0 ? void 0 : _a.call(e);
        const deltaX = getPageX(e) - ref.current.startX + ref.current.offset;
        if (isMovable(left, deltaX, distance)) {
            // console.log('movable')
            setOffset(deltaX);
            setTimer();
        }
    }
    /** 松手自动定位，open or close */
    function autoPositioning(deltaX) {
        var _a, _b;
        const { setOffset, show } = ref.current;
        const ratio = show ? 1 - breakpoint : breakpoint;
        // console.log(show, 'ref.current.show')
        let offset = 0;
        if (left && deltaX > 0) {
            offset = deltaX > distance * ratio ? distance : 0;
            setOffset(offset);
            (_a = props.onToggle) === null || _a === void 0 ? void 0 : _a.call(props, !!offset);
        }
        else if (!left && deltaX < 0) {
            offset = deltaX * -1 > distance * ratio ? -1 * distance : 0;
            setOffset(offset);
            (_b = props.onToggle) === null || _b === void 0 ? void 0 : _b.call(props, !!offset);
        }
        ref.current.show = !!offset;
        ref.current.offset = offset;
    }
    function handleLayout(e) {
        !props.distance && setDistance(e.nativeEvent.layout.width);
    }
    function onTouchEnd(e) {
        if (disabled)
            return;
        useTransition(transitionClass);
        let t;
        if ((t = ref.current.timer))
            clearTimeout(t);
        const deltaX = e.changedTouches[0].pageX - ref.current.startX + ref.current.offset;
        // console.log('touchend outside', deltaX, offset)
        if (isMovable(left, deltaX, distance)) {
            autoPositioning(deltaX);
            // console.log(offset, 'touchend')
        }
        else {
            //做边界判断
            autoPositioning(offset);
        }
    }
    function setTimer() {
        if (!inRN)
            return;
        const timer = ref.current.timer;
        if (timer) {
            clearTimeout(timer);
            ref.current.timer = null;
        }
        ref.current.timer = setTimeout(() => {
            useTransition(transitionClass);
            autoPositioning(offset);
        }, 300);
    }
    return (React.createElement(View, { className: rootClass, style: style },
        React.createElement(View, Object.assign({}, swipeProps, { className: classNames('fta-swipe-action-modal', transition, swipeClassName), style: Object.assign(Object.assign({}, swipeStyle), { left: px(offset) }), onTouchStart: onTouchStart, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd }), children),
        React.createElement(View, { style: follow ? { [left ? 'left' : 'right']: px(-distance + (left ? offset : -offset)) } : {}, 
            // @ts-ignore
            onLayout: handleLayout, className: classNames('fta-swipe-action-button-group', transition, left && 'fta-swipe-action-button-group-left', follow && (left ? 'fta-swipe-action-follow-left' : 'fta-swipe-action-follow')) }, render || (React.createElement(Fragment, null, options.map((o, i) => (React.createElement(View, { key: i, className: classNames('fta-swipe-action-button', o.containerClassName), style: o.containerStyle, onClick: o.onClick },
            React.createElement(Text, { className: classNames('fta-swipe-action-button__text', o.textClassName), style: o.textStyle }, o.text)))))))));
}
const defaultProps = {
    left: false,
    show: false,
    breakpoint: 0.3,
    swipeStyle: {},
    follow: false,
    options: [],
};
SwipeAction.defaultProps = defaultProps;

export { SwipeAction as default };
