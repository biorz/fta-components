import './index.css';
import { View, Text, ScrollView } from '@tarojs/components';
import React, { useState, useRef, useEffect } from 'react';
import { px, inRN } from '../common';

const getPageY = (e) => e.changedTouches[0].pageY;
const getCrossPageY = inRN ? (e) => e.nativeEvent.pageY : getPageY;
// inRN ? (e) => e.nativeEvent.pageY :
function PullToRefresh(props) {
    const { children } = props;
    const [height, setHeight] = useState(0);
    const [reachTop, setReachTop] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);
    const ref = useRef({ start: 0, preHeight: 0, height, setHeight }).current;
    useEffect(() => {
        ref.height = height;
        ref.setHeight = setHeight;
    }, [height]);
    const onTouchStart = (evt) => {
        var _a;
        // 阻止事件冒泡
        (_a = evt.preventDefault) === null || _a === void 0 ? void 0 : _a.call(evt);
        ref.preHeight = height;
        // alert('触摸')
        console.log('ontouchstart evt');
        ref.start = getCrossPageY(evt);
        // evt.stopPropagation?.()
        // console.log(getPageY(evt))
    };
    const onTouchMove = (evt) => {
        console.log('onTouchMove evt');
        // 阻止事件冒泡
        // evt.preventDefault?.()
        if (!reachTop) {
            ref.start = getCrossPageY(evt);
            return;
        }
        const pageY = getCrossPageY(evt);
        const offset = pageY - ref.start + ref.preHeight;
        if (offset > 0) {
            setHeight(offset);
        }
        else {
            // if (offset < 5) {
            //   setReachTop(false)
            // } else {
            //   setReachTop(true)
            // }
            setHeight(0);
            // setReachTop(false)
        }
        console.log(pageY);
    };
    const onTouchEnd = () => {
        console.log('触摸结束');
    };
    const onScroll = (evt) => {
        console.log('scrolltop', evt.detail.scrollTop);
        setScrollTop(evt.detail.scrollTop);
    };
    return (React.createElement(View, { catchMove: true, className: 'fta-pull-to-refresh' },
        React.createElement(View, { className: 'fta-pull-to-refresh-head', style: { height: px(height), backgroundColor: '#999' } },
            React.createElement(Text, null, "\u4E0B\u62C9\u52A0\u8F7D")),
        React.createElement(View, { className: 'fta-pull-to-refresh-content' },
            React.createElement(ScrollView, { scrollY: true, upperThreshold: 2, bounces: false, scrollTop: scrollTop, onTouchStart: onTouchStart, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd, onScrollToUpper: (evt) => {
                    console.log('滚动到顶部', evt);
                    setReachTop(true);
                }, onScroll: onScroll, className: 'fta-pull-to-refresh-scrollview' }, children))));
}

export { PullToRefresh as default };
