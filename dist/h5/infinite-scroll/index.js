import './index.css';
import { ScrollView, View, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { isString } from '../common';

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function InfiniteScroll(props) {
    const loadingRef = useRef(false);
    // const [loading, toggleLoading] = useState(false)
    const [hasLoad, setLoad] = useState(false);
    const [showLoader, toggleLoader] = useState(false);
    const { className, customStyle, 
    // @ts-ignore
    style, children, hasMore, loader, loaded, threshold, loadMore, onScrollToLower } = props, extraProps = __rest(props, ["className", "customStyle", "style", "children", "hasMore", "loader", "loaded", "threshold", "loadMore", "onScrollToLower"]);
    const rootClass = classNames('fta-infinite-scroll', className);
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    const onLoad = (evt) => __awaiter(this, void 0, void 0, function* () {
        showLoader || toggleLoader(true);
        setLoad(true);
        onScrollToLower === null || onScrollToLower === void 0 ? void 0 : onScrollToLower(evt);
        if (loadingRef.current || !hasMore)
            return;
        // toggleLoading(true)
        loadingRef.current = true;
        try {
            yield Promise.resolve(loadMore === null || loadMore === void 0 ? void 0 : loadMore());
        }
        catch (error) { }
        // toggleLoading(false)
        loadingRef.current = false;
    });
    const loadedEl = isString(loaded) ? React.createElement(Loader, { title: loaded }) : loaded;
    const loaderEl = isString(loader) ? React.createElement(Loader, { title: loader }) : loader;
    return (React.createElement(ScrollView, Object.assign({ scrollY: true, className: rootClass, style: rootStyle, lowerThreshold: threshold, onScrollToLower: onLoad }, extraProps),
        children,
        hasMore ? (showLoader || !hasLoad ? loaderEl : null) : loadedEl));
}
function Loader(props) {
    return (React.createElement(View, { className: 'fta-infinite-scroll-loader' },
        React.createElement(Text, { className: 'fta-infinite-scroll-loader__text' }, props.title)));
}
const defaultProps = {
    threshold: 100,
    loader: '加载中...',
    loaded: '没有更多数据了哦',
};
InfiniteScroll.defaultProps = defaultProps;

export { InfiniteScroll as default };
