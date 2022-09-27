import './index.css';
import { View, Image, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, createContext, Component } from 'react';
import { px, ConfigConsumer, useClassesWithCare, inRN, Assets, systemInfo, inAndroid, inNotch, inWeb, inIOS, inAlipay, upperCase } from '../common';

function Modal(props) {
    return React.createElement(Fragment, null, props.children);
}

class ListItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = (event) => {
            if (typeof this.props.onClick === 'function' && !this.props.disabled) {
                this.props.onClick(event);
            }
        };
    }
    // private handleSwitchClick(e: CommonEvent): void {
    //   e.stopPropagation()
    // }
    // private handleSwitchChange = (event: CommonEvent): void => {
    //   if (typeof this.props.onSwitchChange === 'function' && !this.props.disabled) {
    //     this.props.onSwitchChange(event)
    //   }
    // }
    render() {
        const { note, arrow, thumb, iconInfo, disabled, hasBorder, extraThumb, customStyle, 
        // @ts-ignore
        style,
        // isSwitch,
        // switchColor,
        // switchIsCheck,
         } = this.props;
        let { extraText, title } = this.props;
        extraText = String(extraText);
        title = String(title);
        const iconStyle = {};
        if (iconInfo === null || iconInfo === void 0 ? void 0 : iconInfo.color) {
            iconStyle.color = iconInfo.color;
        }
        if (iconInfo === null || iconInfo === void 0 ? void 0 : iconInfo.size) {
            iconStyle.fontSize = px(iconInfo.size);
        }
        return (React.createElement(ConfigConsumer, null, ({ careMode }) => {
            const iconClz = [];
            if (iconInfo === null || iconInfo === void 0 ? void 0 : iconInfo.value) {
                iconClz.push(`${(iconInfo && iconInfo.prefixClass) || 'fta-icon'}-${iconInfo && iconInfo.value}`);
            }
            const [rootCareClz, iconCareClz, thumbCareClz, titleClz, noteClz, extraClz, extraImgClz, arrowClz,] = useClassesWithCare(careMode, ['fta-list__item', thumb && 'fta-list__item--thumb'], iconClz, ['item-thumb'], ['item-content__info-title'], ['item-content__info-note'], ['item-extra__info'], ['item-extra__image'], ['item-extra__icon-arrow']);
            return (React.createElement(View, null,
                React.createElement(View, { className: classNames(rootCareClz, {
                        'fta-list__item--multiple': note,
                        'fta-list__item--disabled': disabled,
                        'fta-list__item--no-border': !hasBorder,
                    }, this.props.className), onClick: this.handleClick, hoverStyle: disabled || { backgroundColor: '#F0F0F0' }, style: Object.assign(Object.assign({}, style), customStyle) },
                    React.createElement(View, { className: 'fta-list__item-container' },
                        thumb && (React.createElement(View, { className: classNames('fta-list__item-thumb', thumbCareClz) },
                            React.createElement(Image, { className: 'item-thumb__info', mode: 'scaleToFill', src: thumb }))),
                        iconInfo && iconInfo.value ? (React.createElement(View, { className: 'fta-list__item-icon item-icon' },
                            React.createElement(Text, { className: classNames(iconCareClz, (iconInfo && iconInfo.prefixClass) || 'fta-icon', iconInfo && iconInfo.className), style: iconStyle }))) : null,
                        React.createElement(View, { className: 'fta-list__item-content item-content' },
                            React.createElement(Text, { className: titleClz }, title),
                            note ? (React.createElement(View, null,
                                React.createElement(Text, { className: noteClz }, note))) : null),
                        React.createElement(View, { className: 'fta-list__item-extra item-extra' },
                            extraText && React.createElement(Text, { className: extraClz }, extraText),
                            extraThumb && !extraText && (React.createElement(View, { className: extraImgClz },
                                React.createElement(Image, { className: 'item-extra__image-info', mode: 'aspectFit', src: extraThumb }))),
                            arrow ? (React.createElement(View, { className: 'item-extra__icon' }, !inRN ? (React.createElement(Text, { className: classNames(`fta-icon fta-icon-chevron-${arrow === true ? 'right' : arrow}`, arrowClz) })) : (React.createElement(Image, { mode: 'aspectFit', className: classNames('fta-icon', arrowClz), src: Assets.arrow[arrow] })))) : null))),
                inRN && hasBorder ? React.createElement(View, { className: 'item-border-line' }) : null));
        }));
    }
}
ListItem.defaultProps = {
    note: '',
    disabled: false,
    title: '',
    thumb: '',
    // isSwitch: false,
    hasBorder: true,
    // switchColor: '#6190E8',
    // switchIsCheck: false,
    extraText: '',
    extraThumb: '',
    iconInfo: { value: '' },
};
ListItem.propTypes = {
    note: PropTypes.string,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    thumb: PropTypes.string,
    onClick: PropTypes.func,
    // isSwitch: PropTypes.bool,
    hasBorder: PropTypes.bool,
    // switchColor: PropTypes.string,
    // switchIsCheck: PropTypes.bool,
    extraText: PropTypes.string,
    extraThumb: PropTypes.string,
    // onSwitchChange: PropTypes.func,
    arrow: PropTypes.oneOf(['up', 'down', 'right', true, false]),
    iconInfo: PropTypes.shape({
        size: PropTypes.number,
        value: PropTypes.string,
        color: PropTypes.string,
        prefixClass: PropTypes.string,
        customStyle: PropTypes.oneOfType([PropTypes.object]),
        className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    }),
};

class List extends React.Component {
    // public static Item: typeof AtListItem
    render() {
        const rootClass = classNames('fta-list', {
            'fta-list--no-border': !this.props.hasBorder,
        }, this.props.className);
        return React.createElement(View, { className: rootClass }, this.props.children);
    }
}
List.defaultProps = {
    hasBorder: true,
};
List.propTypes = {
    hasBorder: PropTypes.bool,
};

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

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.inRN = process.env.TARO_ENV === 'rn';
        this.state = {
            animShow: false,
            _show: props.show,
        };
    }
    componentDidMount() {
        const { _show } = this.state;
        if (_show)
            this.animShow();
    }
    onItemClick(index) {
        this.props.onItemClick && this.props.onItemClick(index);
        this.animHide();
    }
    onHide() {
        this.setState({ _show: false }, () => {
            this.props.onClose && this.props.onClose();
        });
    }
    animHide() {
        this.setState({
            animShow: false,
        });
        if (this.inRN) {
            return this.onHide();
        }
        setTimeout(() => {
            this.onHide();
        }, 300);
    }
    animShow() {
        this.setState({ _show: true });
        if (this.inRN) {
            this.setState({
                animShow: true,
            });
            return;
        }
        setTimeout(() => {
            this.setState({
                animShow: true,
            });
        }, 200);
    }
    onMaskClick() {
        this.animHide();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { show } = nextProps;
        if (show !== this.state._show) {
            show ? this.animShow() : this.animHide();
        }
    }
    render() {
        const { mask, width, right, items, useNativeModal } = this.props;
        const { animShow, _show } = this.state;
        const rootClassName = ['fta-drawer'];
        const maskStyle = {
            display: mask ? 'flex' : 'none',
            opacity: animShow ? 1 : 0,
        };
        const listStyle = this.inRN
            ? {}
            : {
                width,
                transition: animShow
                    ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
                    : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)',
            };
        const classObject = {
            'fta-drawer--show': animShow,
            'fta-drawer--right': right,
            'fta-drawer--left': !right,
        };
        const viewBody = _show ? (React.createElement(Fragment, null,
            React.createElement(View, { className: 'fta-drawer__mask', style: maskStyle, onClick: this.onMaskClick.bind(this) }),
            React.createElement(View, { className: classNames('fta-drawer__content', classObject), style: listStyle },
                React.createElement(SafeArea.View, null, !!items && items.length ? (React.createElement(List, null, items.map((name, index) => (React.createElement(ListItem, { key: `${name}-${index}`, "data-index": index, onClick: this.onItemClick.bind(this, index), title: name, arrow: 'right' }))))) : (this.props.children))))) : (React.createElement(Fragment, null));
        return _show ? (this.inRN ? (viewBody) : (React.createElement(Modal, { transparent: true, useNative: useNativeModal },
            React.createElement(View, { className: classNames(rootClassName, classObject, this.props.className) }, viewBody)))) : (React.createElement(Fragment, null));
    }
}
Drawer.defaultProps = {
    show: false,
    mask: true,
    width: '',
    right: false,
    items: [],
    useNativeModal: true,
};
Drawer.propTypes = {
    show: PropTypes.bool,
    mask: PropTypes.bool,
    width: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
    onItemClick: PropTypes.func,
    onClose: PropTypes.func,
};

export { Drawer as default };
