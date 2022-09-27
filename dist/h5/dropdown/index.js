import './index.css';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import React, { createContext, Component, Fragment, useContext, forwardRef, useState, useRef, useLayoutEffect, useEffect, useImperativeHandle } from 'react';
import { systemInfo, inRN, inAndroid, inNotch, inWeb, inIOS, px, inAlipay, upperCase, Assets, useEnhancedState, useMeasure, isArray, classNames as classNames$1 } from '../common';
import classNames from 'classnames';

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

const dropdownContext = createContext({});
const DropdownProvider = dropdownContext.Provider;
const useDropdown = () => useContext(dropdownContext);

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
const ScrollViewContainer = inRN ? View : Fragment;
function Dropdown(props, ref) {
    var _a;
    const { check, arrow, delay, onChange, overlay, overlayClassName, overlayStyle, safeArea } = props;
    const [state, setState] = useEnhancedState({
        prop: '',
        isOpened: false,
        preventDefault: false,
        activeIndex: -1,
        // activeItem: -1,
        options: [],
        onChange() { },
        rect: {},
        height: 300,
        maxDepth: 0,
    });
    const [depth, setDepth] = useState(1);
    const [opts, setOpts] = useState([]);
    const refs = useRef(new Set()).current;
    const store = useRef({
        // depth: 1,
        option: {},
        options: [],
        // reachEnd: false,
    }).current;
    const [mRef, measure] = useMeasure();
    /** 定位 */
    const positioning = () => measure().then((res) => {
        const stretchHeight = systemInfo.windowHeight - res.bottom;
        setState({ height: stretchHeight, rect: res });
    });
    useLayoutEffect(() => {
        positioning();
        return () => { var _a, _b; return (_b = (_a = sRef.current) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a); };
    }, []);
    useEffect(() => {
        if (!state.preventDefault && !isArray(state.options) && state.maxDepth && state.isOpened) {
            // console.log('depth', depth, state.isOpened)
            fetchData();
        }
    }, [depth, state.isOpened, state.options]);
    const fetchData = () => __awaiter(this, void 0, void 0, function* () {
        const dataList = yield state.options(depth, store.option);
        // console.log('dataList', dataList)
        if (isArray(dataList)) {
            setState('activeIndex', state.maxDepth ? state.activeIndex : -1);
            setOpts(dataList);
        }
    });
    const hasReachEnd = (depth, option) => {
        const res = state.options(depth, option);
        // console.log('hasreachend', !res)
        return !res;
    };
    const register = (ref) => {
        refs.add(ref);
    };
    const unregister = (ref) => {
        refs.delete(ref);
    };
    const toggle = (params) => __awaiter(this, void 0, void 0, function* () {
        yield positioning();
        const { ref } = params, state = __rest(params, ["ref"]);
        closeItems(ref);
        if (!state.preventDefault) {
            // 重置当前选择的深度
            setDepth(1);
            setState(state);
        }
        else {
            setState('isOpened', false);
        }
    });
    const closeItems = (ref) => {
        const copy = new Set(refs);
        ref && copy.delete(ref);
        copy.forEach((ref) => {
            ref.current.isOpened && ref.current.close();
        });
    };
    const _onItemClick = (item, index) => __awaiter(this, void 0, void 0, function* () {
        if (depth <= state.maxDepth) {
            // 说明是级联选择
            if (depth < state.maxDepth && !(yield hasReachEnd(depth + 1, item))) {
                setTimeout(() => {
                    setDepth(depth + 1);
                }, delay);
            }
            const activeIndex = state.activeIndex;
            activeIndex[depth - 1] = index;
            setState('activeIndex', activeIndex.slice());
        }
        else {
            setState('activeIndex', index);
        }
        state.onChange(index, state.maxDepth ? depth : undefined);
        store.option = item;
        onChange === null || onChange === void 0 ? void 0 : onChange(state.prop, item.value || item.label, depth);
    });
    const closePanel = () => {
        closeItems();
        setState('isOpened', false);
    };
    const renderOptions = (opts) => {
        const activeIndex = state.maxDepth ? state.activeIndex[depth - 1] : state.activeIndex;
        return (React.createElement(Fragment, null, opts.map((v, i, self) => {
            return (React.createElement(DropdownOption, { key: i, check: check, active: activeIndex === i, borderless: self.length === i + 1, onClick: () => _onItemClick(v, i) }, v.label));
        })));
    };
    useImperativeHandle(ref, () => ({
        measure: positioning,
        close() {
            refs.forEach((ref) => {
                ref.current.isOpened && ref.current.close();
            });
            setState('isOpened', false);
        },
        show() {
            var _a, _b;
            (_b = (_a = sRef.current) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, sibling);
        },
        hide() {
            var _a, _b;
            (_b = (_a = sRef.current) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a, null);
        },
        destroy() {
            var _a, _b;
            (_b = (_a = sRef.current) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        },
    }));
    const rootClass = classNames$1('fta-dropdown', state.isOpened && 'fta-dropdown--full');
    const itemsFragment = (React.createElement(View, Object.assign({ className: 'fta-dropdown-menu' }, mRef), props.children ||
        ((_a = props.list) === null || _a === void 0 ? void 0 : _a.map((cprops, i) => React.createElement(DropdownItem, Object.assign({}, cprops, { key: i }))))));
    const dynamicStyle = inRN ? { top: state.rect.bottom } : { top: px(state.rect.bottom) };
    const sibling = (React.createElement(View, { className: rootClass, style: dynamicStyle }, state.isOpened ? (React.createElement(View, { style: { [overlay ? 'height' : 'maxHeight']: px(state.height) }, className: classNames$1('fta-dropdown-options', !inRN && props.absolute && 'fta-dropdown-options--absolute') },
        React.createElement(ScrollViewContainer, null,
            React.createElement(ScrollView, { scrollY: true, bounces: false, className: 'fta-dropdown-scrollview' }, isArray(state.options) ? renderOptions(state.options) : renderOptions(opts))),
        overlay ? (React.createElement(View, { className: classNames$1('fta-dropdown-modal', overlayClassName), style: overlayStyle, onClick: closePanel })) : null,
        React.createElement(SafeArea, Object.assign({}, safeArea)))) : null));
    const sRef = useOnceCallback(() => createRootSiblings());
    useLayoutEffect(() => {
        var _a;
        (_a = sRef.current) === null || _a === void 0 ? void 0 : _a.update(sibling);
        // console.log('sRef.current', sRef.current?.)
    });
    // const elem = useRef().current
    return (React.createElement(Fragment, null,
        React.createElement(DropdownProvider, { value: {
                register,
                unregister,
                toggle,
                arrow,
                check,
            } },
            inRN ? null : sibling,
            itemsFragment)));
}
function DropdownItem(props, ref) {
    const { title, options, activeIndex, prop, preventDefault, maxDepth } = props;
    const activeIndexRef = useRef(maxDepth && !isArray(activeIndex) ? [activeIndex !== null && activeIndex !== void 0 ? activeIndex : -1] : activeIndex);
    const [isOpened, toggleOpened] = useState(false);
    const ctx = useDropdown();
    const _ref = {
        isOpened: () => isOpened,
        close: () => toggleOpened(false),
    };
    const mRef = useRef(_ref);
    const onClick = () => {
        var _a;
        (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props);
        const willOpen = !isOpened;
        // console.log('will open', willOpen)
        if (!preventDefault) {
            toggleOpened(willOpen);
        }
        ctx.toggle({
            prop,
            options,
            ref: mRef,
            maxDepth: maxDepth || 0,
            isOpened: willOpen,
            preventDefault: !!preventDefault,
            activeIndex: activeIndexRef.current,
            onChange(index, depth) {
                if (depth) {
                    activeIndexRef.current[depth - 1] = index;
                }
                else {
                    activeIndexRef.current = index;
                }
            },
        });
    };
    useImperativeHandle(ref, () => _ref);
    mRef.current = _ref;
    useEffect(() => {
        ctx.register(mRef);
        return () => ctx.unregister(mRef);
    }, []);
    return (React.createElement(View, { className: 'fta-dropdown-item', onClick: onClick },
        React.createElement(Text, { className: classNames$1('fta-dropdown-item__text', isOpened && 'fta-dropdown-item__text--active') }, title),
        React.createElement(Image, { src: isOpened ? ctx.arrow : Assets.arrow.down, className: 'fta-dropdown-item__arrow' })));
}
function DropdownOption(props) {
    const { active, children, borderless, check, onClick } = props;
    return (React.createElement(View, { className: classNames$1('fta-dropdown-option', borderless && 'fta-dropdown-option--borderless'), onClick: onClick },
        React.createElement(Text, { className: classNames$1('fta-dropdown-option__text', active && 'fta-dropdown-option__text--active') }, children),
        active ? React.createElement(Image, { src: check, className: 'fta-dropdown-option__check' }) : null));
}
const ForwardedDropdown = forwardRef(Dropdown);
const ForwardedDropdownItem = forwardRef(DropdownItem);
ForwardedDropdownItem.defaultProps = {};
ForwardedDropdown.defaultProps = {
    absolute: true,
    arrow: Assets.arrow.up,
    check: Assets.check.primary,
    delay: 200,
    overlay: true,
    safeArea: {},
};
DropdownOption.defaultProps = {
    check: Assets.check.primary,
};

export { ForwardedDropdownItem as DropdownItem, DropdownOption, ForwardedDropdown as default, withRootSiblings as withDropdown };
