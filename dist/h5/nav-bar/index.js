import './index.css';
import { View, Text as Text$1, Image } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { createContext, Component, Fragment, cloneElement } from 'react';
import { systemInfo, inRN, inAndroid, inNotch, inWeb, inIOS, px, inAlipay, upperCase, useCarelessClass, useCareMode, scale, createSelectorQuery, useCareClass, Assets, ConfigConsumer, useClassWithCare } from '../common';

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

const safeAreaContext = createContext({
    disabled: false,
});

const safeArea = systemInfo.safeArea || {
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
};
/** 是否是沉浸式屏幕 */
const isImmersive = systemInfo.screenHeight === systemInfo.windowHeight;
/** 沉浸式的刘海屏需要安全区适配 */
const needSafeArea = isImmersive && inNotch;
// console.log(safeArea, 'safearea', systemInfo)
/** 安全区 */
const _safeArea = {
    top: inRN && inAndroid
        ? 0
        : safeArea.top
            ? safeArea.top < 44 && inNotch && inRN
                ? 44
                : safeArea.top
            : isImmersive && inWeb
                ? // @ts-ignore
                    (window._MBWEB_statusbarHeight || 0) / systemInfo.pixelRatio
                : inNotch && !inWeb
                    ? 44
                    : 0,
    bottom: safeArea.top > 20 && inRN && inIOS
        ? 34
        : inRN && inAndroid
            ? 0
            : safeArea.bottom
                ? systemInfo.screenHeight - safeArea.bottom
                : needSafeArea
                    ? // @ts-ignore
                        (window._MBWEB_bottombarHeight || 0) / systemInfo.pixelRatio
                    : 0,
    left: safeArea.left,
    right: safeArea.right ? systemInfo.screenWidth - safeArea.right : 0,
};

/**
 * safe area container
 * @component
 */
class SafeAreaView extends Component {
    getInlineStyle(style) {
        const attr = this.props.useMargin ? 'margin' : 'padding';
        const safeAreaStyle = {};
        if (_safeArea.top)
            safeAreaStyle[`${attr}Top`] = px(_safeArea.top);
        if (_safeArea.right)
            safeAreaStyle[`${attr}Right`] = px(_safeArea.right);
        if (_safeArea.left)
            safeAreaStyle[`${attr}Left`] = px(_safeArea.left);
        if (_safeArea.bottom)
            safeAreaStyle[`${attr}Bottom`] = px(_safeArea.bottom);
        return Object.assign(Object.assign({}, safeAreaStyle), style);
    }
    render() {
        if (inAlipay)
            return React.createElement(Fragment, null, this.props.children);
        return (React.createElement(safeAreaContext.Consumer, null, (ctx) => {
            if (this.props.disabled || ctx.disabled) {
                const _a = this.props, props = __rest(_a, ["disabled"]);
                return React.createElement(View, Object.assign({}, props));
            }
            const _b = this.props, { className, style, children, useMargin } = _b, props = __rest(_b, ["className", "style", "children", "useMargin"]);
            const rootCla = classNames(className, `fta-safe-area-container${useMargin ? '__margin' : ''}`);
            const rootStyle = this.getInlineStyle(style);
            return (React.createElement(View, Object.assign({}, props, { className: rootCla, style: rootStyle }), children));
        }));
    }
}
SafeAreaView.defaultProps = {
    style: {},
    disabled: false,
};
/**
 * 顶部或底部安全区
 * @component
 */
class SafeArea extends Component {
    getInlineStyle(position, style) {
        const attr = this.props.useMargin ? 'margin' : 'padding';
        return Object.assign({ [`${attr}${upperCase(position)}`]: px(_safeArea[position]) }, style);
    }
    renderSafeArea(position, props) {
        const { style, className, children, useMargin } = props, extraProps = __rest(props, ["style", "className", "children", "useMargin"]);
        const rootStyle = this.getInlineStyle(position, props.style);
        const rootCla = classNames(props.className, `fta-safe-area-${position}${useMargin ? '__margin' : ''}`);
        return (React.createElement(View, Object.assign({}, extraProps, { style: rootStyle, className: rootCla }), children));
    }
    render() {
        if (inAlipay)
            return null;
        return (React.createElement(safeAreaContext.Consumer, null, (ctx) => {
            if (this.props.disabled || ctx.disabled) {
                const _a = this.props, props = __rest(_a, ["disabled"]);
                return React.createElement(View, Object.assign({}, props));
            }
            const _b = this.props, { top, bottom } = _b, props = __rest(_b, ["top", "bottom"]);
            const position = !top && bottom ? 'bottom' : 'top';
            return this.renderSafeArea(position, props);
        }));
    }
}
SafeArea.defaultProps = {
    bottom: true,
    top: false,
    style: {},
    disabled: false,
};
SafeArea.Consumer = safeAreaContext.Consumer;
SafeArea.Provider = safeAreaContext.Provider;
SafeArea.View = SafeAreaView;

/**
 * 正文
 */
function Text(props) {
    const { className, style, level, children, size, color, scale: scale$1, weight, line, underline, type, strong, italic } = props, extraProps = __rest(props, ["className", "style", "level", "children", "size", "color", "scale", "weight", "line", "underline", "type", "strong", "italic"]);
    const textClz = useCarelessClass(['fta-text', size ? '' : `fta-text--${level}`], [type && `fta-text--${type}`, className]);
    const careMode = useCareMode();
    const textStyle = Object.assign({}, style);
    if (color) {
        textStyle.color = color;
    }
    if (strong) {
        textStyle.fontWeight = '500';
    }
    if (weight) {
        textStyle.fontWeight = weight + '';
    }
    if (italic) {
        textStyle.fontStyle = 'italic';
    }
    if (line || underline) {
        textStyle.textDecorationLine = line ? 'line-through' : 'underline';
    }
    if (size) {
        const fontSize = careMode ? size * 1.3 : size;
        textStyle.fontSize = scale$1 ? scale(fontSize) : px(fontSize);
    }
    return (React.createElement(Text$1, Object.assign({ className: textClz, style: textStyle }, extraProps), children));
}
const textDefaultProps = {
    level: 4,
    scale: true,
};
Text.defaultProps = textDefaultProps;

/** 支持的Color列表 */
const COLOR = {
    black: ['#000', '#000000', 'rgb(0,0,0)', 'black'],
    white: ['#fff', '#ffffff', 'rgb(255,255,255)', 'white'],
};
/** 支持的underlayColor值 */
const colorList = Object.values(COLOR).reduce((prev, cur) => [...prev, ...cur], []);
const colorMap = Object.entries(COLOR).reduce((prev, [key, list]) => {
    list.forEach((v) => (prev[v] = key));
    return prev;
}, {});
/** 支持的activeOpacity值 */
const opacityList = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

let count = 0;
class LayoutView extends Component {
    constructor(props) {
        super(props);
        this._id = ++count;
        this._onLayout = this._onLayout.bind(this);
    }
    _onLayout(evt) {
        var _a, _b;
        (_b = (_a = this.props).onLayout) === null || _b === void 0 ? void 0 : _b.call(_a, evt.nativeEvent.layout, evt);
    }
    componentDidMount() {
        this.props.onLayout &&
            !inRN &&
            (createSelectorQuery === null || createSelectorQuery === void 0 ? void 0 : createSelectorQuery(`._fta-view-layout__${this._id}`, (result) => {
                this.props.onLayout(result, result);
            }));
    }
    render() {
        if (this.props.disabled)
            return renderDisabledView(this.props);
        const _a = this.props, { onLayout, className, children, style } = _a, props = __rest(_a, ["onLayout", "className", "children", "style"]);
        const rootClass = classNames(`_fta-view-layout__${this._id}`, className);
        return (
        // @ts-ignore onLayout没有类型声明
        React.createElement(View, Object.assign({ onLayout: onLayout && this._onLayout, className: rootClass, style: style }, props), children));
    }
}
LayoutView.defaultProps = {
    onLayout: null,
    disabled: false,
};
/**
 * TouchableOpacity
 * @component
 */
class TouchableOpacity extends Component {
    render() {
        if (this.props.disabled)
            return renderDisabledView(this.props);
        const _a = this.props, { children, activeOpacity } = _a, props = __rest(_a, ["children", "activeOpacity"]);
        // console.log(activeOpacity, 'activeOpacity', props)
        return (React.createElement(View, Object.assign({}, props, { hoverStyle: { opacity: activeOpacity }, hoverClass: `fta-view-hover__${activeOpacity * 10}` }), children));
    }
}
TouchableOpacity.defaultProps = {
    activeOpacity: 0.8,
};
TouchableOpacity.propTypes = {
    activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
};
/**
 * TouchableHighlight
 * @component
 */
class TouchableHighlight extends Component {
    render() {
        if (this.props.disabled)
            return renderDisabledView(this.props);
        let _a = this.props, { activeOpacity, underlayColor, children, underlayClass } = _a, props = __rest(_a, ["activeOpacity", "underlayColor", "children", "underlayClass"]);
        let hoverClass;
        if (underlayClass)
            hoverClass = underlayClass;
        else if (!inRN) {
            if (!~colorList.indexOf(underlayColor)) {
                underlayColor = '#000';
            }
            else {
                hoverClass = `fta-view-hover__${colorMap[underlayColor]}`;
            }
        }
        // 给子组件加额外的props
        const clonedChildren = cloneElement(children, {
            hoverClass: `fta-view-hover__${activeOpacity * 10}`,
            hoverStyle: { opacity: activeOpacity },
        });
        // console.log(clonedChildren, 'clonedChildren')
        return (React.createElement(View, Object.assign({ hoverStyle: { backgroundColor: underlayColor }, hoverClass: hoverClass }, props), clonedChildren));
    }
}
TouchableHighlight.defaultProps = {
    underlayColor: '#000',
    activeOpacity: 0.2,
};
TouchableHighlight.propTypes = {
    underlayColor: inRN ? PropTypes.any : PropTypes.oneOf(colorList),
    activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
};
/**
 * 禁用的View样式
 */
function renderDisabledView(props) {
    const { 
    // 忽略active属性
    hoverClass, hoverStyle, 
    // 禁用click事件
    onClick, disabled, disabledClassName, children, className, style } = props, _props = __rest(props, ["hoverClass", "hoverStyle", "onClick", "disabled", "disabledClassName", "children", "className", "style"]);
    const rootClass = classNames(className, 'fta-view-disabled', disabledClassName);
    return (React.createElement(View, Object.assign({}, _props, { style: style, className: rootClass }), children));
}

function NavbarButton(props) {
    const textClz = useCareClass(['fta-nav-bar-button__text']);
    // console.log('渲染button', props)
    const { style, className, tintColor, title, handler, disabled, accessible, accessibilityLabel } = props;
    const rootClass = classNames('fta-nav-bar-button', className);
    return (React.createElement(TouchableOpacity, { className: rootClass, style: style, onClick: handler, disabled: disabled, 
        // @ts-ignore
        accessible: accessible, 
        // @ts-ignore
        accessibilityLabel: accessibilityLabel },
        React.createElement(Text, { level: 3, className: textClz, style: tintColor ? { color: tintColor } : {} }, title)));
}
NavbarButton.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    tintColor: PropTypes.string,
    title: PropTypes.string,
    handler: PropTypes.func,
    disabled: PropTypes.bool,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
};
NavbarButton.defaultProps = {
    style: {},
    title: '',
    // tintColor: '#0076FF',
    disabled: false,
    handler: () => ({}),
};

class StatusBar extends Component {
    render() {
        return React.createElement(Fragment, null, this.props.children);
    }
}

function useBackIcon(props) {
    const { className, style, color } = props, extraProps = __rest(props, ["className", "style", "color"]);
    const imageClz = useCarelessClass(['fta-nav-bar-back__image']);
    const colorStyle = {
        //@ts-ignore
        tintColor: color,
    };
    return (React.createElement(TouchableOpacity, Object.assign({ className: 'fta-nav-bar-back', activeOpacity: 0.6 }, extraProps),
        React.createElement(Image, { src: NavBar.backIcon, className: imageClz, style: Object.assign(Object.assign({}, style), colorStyle), 
            // @ts-ignore
            tintColor: color, mode: 'aspectFit' })));
}
function getTitleElement(data, careMode) {
    const titleClz = useClassWithCare(careMode, ['fta-nav-bar-custom-title']);
    if (!data || data.props) {
        return React.createElement(View, { className: titleClz }, data);
    }
    const colorStyle = data.tintColor ? { color: data.tintColor } : null;
    const textStyle = Object.assign(Object.assign({}, data.style), colorStyle);
    return (React.createElement(View, { className: 'fta-nav-bar-title-container' },
        React.createElement(Text, { level: 3, onClick: data.handler, 
            // @ts-ignore
            ellipsizeMode: data.ellipsizeMode, numberOfLines: data.numberOfLines, style: textStyle, className: 'fta-nav-bar-title-text' }, data.title)));
}
function getButtonElement(data, className) {
    return (React.createElement(View, { className: 'fta-nav-bar-button-container' }, !data || data.props ? (data) : (React.createElement(NavbarButton, { title: data.title, style: data.style, className: classNames(className, data.className), tintColor: data.tintColor, handler: data.handler, disabled: data.disabled, accessible: data.accessible, accessibilityLabel: data.accessibilityLabel }))));
}
class NavBar extends Component {
    componentDidMount() {
        this.customizeStatusBar();
    }
    UNSAFE_componentWillReceiveProps() {
        this.customizeStatusBar();
    }
    customizeStatusBar() {
        var _a;
        const { statusBar = {} } = this.props;
        if (inIOS) {
            if (statusBar.style) {
                // @ts-ignore
                (_a = StatusBar === null || StatusBar === void 0 ? void 0 : StatusBar.setBarStyle) === null || _a === void 0 ? void 0 : _a.call(StatusBar, statusBar.style);
            }
            const animation = statusBar.hidden ? statusBar.hideAnimation : statusBar.showAnimation;
            // @ts-ignore
            StatusBar.showHideTransition = animation;
            // @ts-ignore
            StatusBar.hidden = statusBar.hidden;
        }
        else if (inAndroid && statusBar.backgroundColor) {
            // @ts-ignore
            StatusBar === null || StatusBar === void 0 ? void 0 : StatusBar.setBackgroundColor(statusBar.backgroundColor);
        }
    }
    render() {
        var _a;
        const _b = this.props, { containerStyle, tintColor, title, leftButton, rightButton, style, className, containerClassName, safeAreaClassName, safeAreaStyle } = _b, props = __rest(_b, ["containerStyle", "tintColor", "title", "leftButton", "rightButton", "style", "className", "containerClassName", "safeAreaClassName", "safeAreaStyle"]);
        const customTintColor = tintColor ? { backgroundColor: tintColor } : {};
        const customStatusBarTintColor = ((_a = this.props.statusBar) === null || _a === void 0 ? void 0 : _a.tintColor)
            ? { backgroundColor: this.props.statusBar.tintColor }
            : {};
        // const statusBarHeight: CSSProperties = systemInfo.statusBarHeight
        //   ? {
        //       height: systemInfo.statusBarHeight,
        //     }
        //   : null
        const rootStyle = Object.assign(Object.assign(Object.assign({}, customTintColor), customStatusBarTintColor), containerStyle);
        const rootClass = classNames('fta-nav-bar', containerClassName);
        let statusBar = React.createElement(SafeArea, { top: true, style: safeAreaStyle });
        // @ts-ignore
        const showStatusBar = !this.props.statusBar.hidden;
        if (inIOS) {
            // @ts-ignore
            statusBar = showStatusBar
                ? statusBar
                : // <View
                    //   style={{ ...customStatusBarTintColor }}
                    //   className='fta-status-bar'></View>
                    null;
        }
        return (React.createElement(ConfigConsumer, null, ({ careMode }) => {
            return (React.createElement(Fragment, null,
                statusBar,
                React.createElement(View, Object.assign({ style: rootStyle, className: rootClass }, props),
                    React.createElement(View, { className: classNames('fta-nav-bar-container', className), style: style },
                        getTitleElement(title, careMode),
                        getButtonElement(leftButton, 'fta-nav-bar-left-button'),
                        getButtonElement(rightButton, 'fta-nav-bar-right-button')))));
        }));
    }
}
NavBar.backIcon = Assets.arrow.left;
NavBar.BackIcon = useBackIcon;
NavBar.defaultProps = {
    style: {},
    tintColor: '',
    // leftButton: null,
    // rightButton: null,
    // title: null,
    statusBar: {
        style: 'default',
        hidden: false,
        hideAnimation: 'slide',
        showAnimation: 'slide',
    },
    containerStyle: {},
    safeAreaStyle: {
        backgroundColor: 'white',
    },
};
const ButtonShape = {
    title: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
    handler: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};
const TitleShape = {
    title: PropTypes.string.isRequired,
    tintColor: PropTypes.string,
    ellipsizeMode: PropTypes.string,
    numberOfLines: PropTypes.number,
};
const StatusBarShape = {
    style: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    tintColor: PropTypes.string,
    hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
    showAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
};
NavBar.propTypes = {
    style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.oneOf([null])]),
    tintColor: PropTypes.string,
    statusBar: PropTypes.shape(StatusBarShape),
    leftButton: PropTypes.oneOfType([
        PropTypes.shape(ButtonShape),
        PropTypes.element,
        PropTypes.oneOf([null]),
    ]),
    rightButton: PropTypes.oneOfType([
        PropTypes.shape(ButtonShape),
        PropTypes.element,
        PropTypes.oneOf([null]),
    ]),
    title: PropTypes.oneOfType([
        PropTypes.shape(TitleShape),
        PropTypes.element,
        PropTypes.oneOf([null]),
    ]),
    containerStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export { NavbarButton as NavBarButton, NavBar as default };
