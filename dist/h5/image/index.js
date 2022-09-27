import './index.css';
import { Text, Image as Image$1, View } from '@tarojs/components';
import classNames from 'classnames';
import React, { Component, Fragment } from 'react';

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

const isString = (val) => typeof val === 'string';
class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /** 是否加载失败 */
            _errored: false,
            /** 是否加载完成 */
            _loaded: false,
        };
        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
    }
    // FIXME: 异步加载图片不生效
    componentDidUpdate(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({
                _errored: false,
                _loaded: false,
            });
        }
    }
    /**
     * 是否是加载态
     */
    get isLoading() {
        return !this.state._errored && !this.state._loaded;
    }
    get isErrored() {
        return this.state._errored && this.props.showError;
    }
    get needLoading() {
        return !!(this.isLoading && this.props.showLoading && this.props.loadingIcon);
    }
    get needError() {
        return !!(this.state._errored && this.props.showError && this.props.errorIcon);
    }
    get isCircle() {
        return this.props.shape === 'circle';
    }
    onLoad(event) {
        var _a, _b;
        this.setState({
            _loaded: true,
        });
        return (_b = (_a = this.props).onLoad) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    }
    onError(event) {
        var _a, _b;
        this.setState({
            _errored: true,
        });
        return (_b = (_a = this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    }
    getInlineStyle() {
        // @ts-ignore
        const style = Object.assign(Object.assign({}, this.props.style), this.props.customStyle);
        let i;
        if ((i = this.props.bgColor)) {
            style.backgroundColor = i;
        }
        return style;
    }
    renderIntermediate(needRender, icon, className) {
        const circleClass = this.isCircle && 'fta-image--circle';
        return needRender ? (isString(icon) ? (React.createElement(Image$1, { src: icon, className: classNames(className, circleClass), style: this.getInlineStyle(), mode: this.props.mode })) : (React.createElement(View, { className: classNames(className, 'fta-image--flex', circleClass), style: this.getInlineStyle() }, icon))) : null;
    }
    render() {
        const _a = this.props, { className, src, shape, showLoading, loadingIcon, showError, errorIcon, 
        // ignore
        customStyle, bgColor, onError, onLoad, asyncIcon } = _a, props = __rest(_a, ["className", "src", "shape", "showLoading", "loadingIcon", "showError", "errorIcon", "customStyle", "bgColor", "onError", "onLoad", "asyncIcon"]);
        const loadingClass = classNames('fta-image', className, this.isCircle && 'fta-image--circle');
        // 异步加载的image先返回占位符
        if (!src && asyncIcon !== false) {
            return asyncIcon || React.createElement(View, { className: loadingClass, style: this.getInlineStyle() });
        }
        const rootClass = classNames(loadingClass, ((showLoading && this.isLoading) || this.isErrored) && 'fta-image--loading', this.isErrored && 'fta-image--errored');
        return (React.createElement(Fragment, null,
            this.renderIntermediate(this.needLoading, loadingIcon, loadingClass),
            this.renderIntermediate(this.needError, errorIcon, loadingClass),
            React.createElement(Image$1, Object.assign({}, props, { src: src, className: rootClass, style: this.getInlineStyle(), onLoad: this.onLoad, onError: this.onError }))));
    }
}
Image.defaultProps = {
    showLoading: true,
    showError: true,
    loadingIcon: React.createElement(Text, { className: 'fta-image--flex__text' }, "\u52A0\u8F7D\u4E2D"),
    errorIcon: React.createElement(Text, { className: 'fta-image--flex__text' }, "\u52A0\u8F7D\u5931\u8D25"),
    src: '',
};

export { Image as default };
