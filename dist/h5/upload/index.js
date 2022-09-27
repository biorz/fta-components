import './index.css';
import { View, Image, Text } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import { Assets, isString } from '../common';

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

function Upload(props) {
    const { camera, placeholder, customStyle, className, error, image, src, errorTip, 
    // @ts-ignore
    style } = props, extraProps = __rest(props, ["camera", "placeholder", "customStyle", "className", "error", "image", "src", "errorTip", "style"]);
    const rootClz = classNames('fta-upload', className, {
        'fta-upload--error': error,
        'fta-upload--empty': !src && !image,
    });
    return (React.createElement(View, null,
        React.createElement(View, Object.assign({ className: rootClz, style: Object.assign(Object.assign({}, style), customStyle) }, extraProps), src ? (React.createElement(Image, { src: src, className: 'fta-upload-image', mode: 'aspectFill' })) : (React.createElement(React.Fragment, null,
            image ? React.createElement(Image, { src: image, className: 'fta-upload-image' }) : null,
            React.createElement(Image, { src: camera, className: 'fta-upload-camera' }),
            isString(placeholder) ? (React.createElement(Text, { className: 'fta-upload-placeholder' }, placeholder)) : (placeholder)))),
        error && errorTip ? (isString(errorTip) ? (React.createElement(Text, { className: 'fta-upload-errortip' }, errorTip)) : (errorTip)) : null));
}
const defaultProps = {
    camera: Assets.camera.default,
    placeholder: '上传图片',
    error: false,
    errorTip: '请重新上传',
};
Upload.defaultProps = defaultProps;

export { Upload as default };
