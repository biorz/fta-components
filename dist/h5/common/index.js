import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
export { default as classNames } from 'classnames';
import Taro, { getSystemInfoSync } from '@tarojs/taro';

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

const defaultContext = {
    careMode: false,
    platform: 'ymm',
    debugger: true,
    toggle() { },
};
const Context = createContext(defaultContext);
Context.displayName = 'GlobalConfigContext';
/**
 * 全局配置生产者
 * @example
 * function Page(): JSX.Element {
 *  return (
 *   <ConfigProvider platform='ymm' careMode={false}>
 *     <View>
 *       <Text>FTA View based APP</Text>
 *     </View>
 *   </ConfigProvider>
 *  )
 * }
 */
function ConfigProvider(props) {
    const { children } = props, extraProps = __rest(props, ["children"]);
    const [state, setState] = useState(extraProps);
    extraProps.toggle = (key, value) => setState(Object.assign(Object.assign({}, state), { [key]: value }));
    return React.createElement(Context.Provider, { value: state }, children);
}
ConfigProvider.defaultProps = defaultContext;
ConfigProvider.context = Context;
/**
 * 为组件注入ConfigProvider
 * @param Component
 * @param careMode
 * @returns
 */
function withCare(Component, careMode) {
    return (props) => (React.createElement(ConfigProvider, { careMode: careMode },
        React.createElement(Component, Object.assign({}, props))));
}
/**
 * 关怀模式Hook，返回当前是否处于关怀模式
 */
function useCareMode() {
    return useConfig('careMode');
}
function useConfig(key) {
    const ctx = useContext(Context);
    if (key)
        return ctx[key];
    return ctx;
}
function useCareComponent(NormalComponent, CareModeComponent, props) {
    const careMode = useConfig('careMode');
    const DynamicComponent = careMode ? CareModeComponent : NormalComponent;
    return props ? React.createElement(DynamicComponent, Object.assign({}, props)) : DynamicComponent;
}
/**
 * 全局配置消费者
 */
const ConfigConsumer = Context.Consumer;

const isString$1 = (s) => typeof s === 'string' && s.length > 0;
/**
 * 关怀模式 - 一个组件接收多个类名
 *
 * @param careClazz  - className 数组
 * @param suffix  - 关怀模式className 后缀
 */
const useCareClass = (careClazz, suffix = '--care') => {
    const careMode = useConfig('careMode');
    return classNames(careMode ? careClazz.map((v) => (isString$1(v) ? `${v} ${v}${suffix}` : '')) : careClazz);
};
/**
 * 关怀模式 - 一个组件接收多个类名，关怀模式后缀固定为`--care`
 *
 * @param careClazz  - className 数组
 */
useCareClass.single = (...careClazz) => {
    const careMode = useConfig('careMode');
    return classNames(careMode ? careClazz.map((v) => (isString$1(v) ? `${v} ${v}--care` : '')) : careClazz);
};
/**
 * 关怀模式 - 多个组件接收多个类名，执行结果返回数组，解构赋值。，关怀模式后缀固定为`--care`
 *
 * @param careClazzes - className 二维数组
 * @returns
 */
const useCareClasses = (...careClazzes) => {
    const careMode = useConfig('careMode');
    return careClazzes.map((careClazz) => classNames(careMode ? careClazz.map((v) => (isString$1(v) ? `${v} ${v}--care` : '')) : careClazz));
};
/**
 * 关怀模式 - 多个组件接收单个类名，执行结果返回数组，解构赋值。关怀模式后缀固定为`--care`
 *
 * @param careClazz className数组
 */
useCareClasses.single = (...careClazz) => {
    const careMode = useConfig('careMode');
    return careMode ? careClazz.map((v) => (isString$1(v) ? `${v} ${v}--care` : '')) : careClazz;
};
/**
 * 关怀模式 - 接收需要关怀模式的类名数组和不需要接入关怀模式的类名数组
 *
 * @param careClazz 需要接入关怀模式的类名数组
 * @param nonCareClasszz 不需要接入关怀模式的类名数组，可选
 * @param suffix  关怀模式类名后缀，默认`--care`
 */
const useCarelessClass = (careClazz, nonCareClasszz, suffix = '--care') => {
    const careMode = useConfig('careMode');
    return classNames(...(nonCareClasszz !== null && nonCareClasszz !== void 0 ? nonCareClasszz : []).concat(careMode ? careClazz.map((v) => (isString$1(v) ? `${v} ${v}${suffix}` : '')) : careClazz));
};
/**
 * 关怀模式 - 判断当前是否是关怀模式，一个组件接收多个类名，返回相应的类名
 *
 * 建议配合`Mobx`、`Redux`或`ConfigConsumer`使用
 *
 * @param careMode 是否是关怀模式
 * @param careClazz className 数组
 * @param suffix 关怀模式后缀
 */
const useClassWithCare = (careMode, careClazz, suffix = '--care') => {
    return classNames(careMode ? careClazz.map((v) => (isString$1(v) ? `${v} ${v}${suffix}` : '')) : careClazz);
};
/**
 * 关怀模式 - 判断当前是否是关怀模式，一个组件接收一个类名，返回相应的类名
 *
 * @param careMode 是否是关怀模式
 * @param careClass className
 * @param suffix 关怀模式后缀，默认`--care`
 */
useClassWithCare.single = (careMode, careClass, suffix = '--care') => {
    return careMode ? (isString$1(careMode) ? `${careClass} ${careClass}${suffix}` : '') : careClass;
};
/**
 * 关怀模式 - 判断当前是否是关怀模式，多个组件接收多个类名，返回相应的类名
 *
 * 建议配合`Mobx`、`Redux`或`ConfigConsumer`使用
 *
 * @param careMode 是否是关怀模式
 * @param careClazz className 二维数组
 */
const useClassesWithCare = (careMode, ...careClazzes) => {
    return careClazzes.map((careClazz) => classNames(careMode ? careClazz.map((v) => (isString$1(v) ? `${v} ${v}--care` : '')) : careClazz));
};
/**
 * 关怀模式 - 判断当前是否是关怀模式，一个组件接收一个类名，返回相应的类名
 *
 * @param careMode 是否是关怀模式
 * @param careClazz className数组
 */
useClassesWithCare.single = (careMode, ...careClazz) => {
    return careClazz.map((v) => (careMode ? (isString$1(v) ? `${v} ${v}--care` : '') : v));
};

const outOfRN = process.env.TARO_ENV !== 'rn';
const getTransformStyle = outOfRN
    ? (offset) => ({
        transform: `translate(${offset[0]}px, ${offset[1]}px)`,
    })
    : (offset) => ({
        transform: [
            {
                translateX: offset[0],
            },
            {
                translateY: offset[1],
            },
        ],
    });
const getNativeEvent = outOfRN ? (evt) => evt : (evt) => evt.nativeEvent;
/**
 * Debug面板，生产环境不显示
 */
const Debugger = (props) => {
    if (!props.force && !['dev', 'development'].includes(process.env.NODE_ENV))
        return null;
    const [offset, setOffset] = useState([0, 0]);
    const start = useRef([0, 0]).current;
    const prev = useRef([0, 0]).current;
    const rootClass = useCareClass.single('fta-debugger');
    const { toggle, careMode } = useConfig();
    const onTouchStart = (evt) => {
        const { changedTouches } = evt;
        prev[0] = offset[0];
        prev[1] = offset[1];
        start[0] = changedTouches[0].pageX;
        start[1] = changedTouches[0].pageY;
    };
    const onTouchMove = (evt) => {
        // alert(evt.stopPropagation)
        // evt.stopPropagation?.()
        // console.log('evt', evt.nativeEvent)
        const { changedTouches } = getNativeEvent(evt);
        const { pageX, pageY } = changedTouches[0];
        const [x1, y1] = start;
        const [x, y] = prev;
        setOffset([pageX - x1 + x, pageY - y1 + y]);
    };
    // const onTouchEnd = (evt: ITouchEvent) => {
    // start[0] = 0
    // start[1] = 0
    // prev[0] = offset[0]
    // prev[1] = offset[1]
    // const {touches} = evt
    // setOffset([touches[0].clientX, touches[0].clientY])
    // alert('触摸停止')
    // }
    return (React.createElement(View, { catchMove: true, 
        // @ts-ignore
        style: getTransformStyle(offset), className: rootClass, onClick: () => toggle('careMode', !careMode), onTouchStart: onTouchStart, onTouchMove: onTouchMove },
        React.createElement(Text, { className: 'fta-debugger__text' }, careMode ? '关怀' : '标准')));
};

const isObject = (val) => Object.prototype.toString.call(val).slice(8, -1) === 'Object';
/**
 * 深度合并对象
 */
function deepMerge(source, target) {
    if (isObject(target)) {
        Object.entries(target).forEach(([key, val]) => {
            if (isObject(val)) {
                deepMerge(source[key], val);
            }
            else {
                source[key] = val;
            }
        });
    }
    return source;
}

const Assets = {
    // 关闭
    close: {
        default: 'https://image.ymm56.com/ymmfile/operation-biz/a5e1c2a8-e59e-4bb8-9a59-c8092d058258.png',
        circle: 'https://image.ymm56.com/ymmfile/operation-biz/1e270684-078d-49c8-9e69-23fbe607404a.png',
        circleFull: 'https://imagecdn.ymm56.com/ymmfile/static/resource/c4aa5762-5aad-40c8-9fab-9912569aec6c.png',
        circleBlack: 'https://imagecdn.ymm56.com/ymmfile/static/resource/957bbc97-e1f9-40b5-8173-15283538291e.png',
    },
    // 箭头
    arrow: {
        true: 'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
        right: 'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
        down: 'https://image.ymm56.com/ymmfile/operation-biz/27653ee0-6dc6-446a-a60c-38c322e280cc.png',
        up: 'https://image.ymm56.com/ymmfile/operation-biz/4193cb2e-863f-471f-b3bf-80f49c22069a.png',
        left: 'http://image.ymm56.com/boss/2018/1212/1544598761',
        grey: 'https://imagecdn.ymm56.com/ymmfile/static/resource/a7fa220a-80f0-422f-b447-118052752d07.png',
    },
    // 信息提示
    tip: {
        success: 'https://imagecdn.ymm56.com/ymmfile/static/resource/a826715a-5d51-4bb9-8cd3-a2f75c03d1b7.png',
        error: 'https://imagecdn.ymm56.com/ymmfile/static/resource/9c1dd2fc-40be-4363-ad7c-1038efba8f23.png',
        waiting: 'https://imagecdn.ymm56.com/ymmfile/static/resource/f99ecdf5-66d2-4e59-9b20-425affff0f68.png',
        warning: 'https://image.ymm56.com/ymmfile/operation-biz/ef9aa9a9-710f-40a6-922b-ac044ae168fb.png',
        info: 'https://image.ymm56.com/ymmfile/operation-biz/62398c75-bcc3-40c0-be5e-db16031c0fc5.png',
    },
    // 空白页&错误页面
    empty: {
        default: 'https://image.ymm56.com/ymmfile/operation-biz/4469e30e-fe6b-4673-952c-c6a2d92ddc7b.png',
        error: 'https://image.ymm56.com/ymmfile/operation-biz/49c712cb-69cc-4e80-9ca8-d752605c403e.png',
    },
    // 对号
    check: {
        default: 'https://imagecdn.ymm56.com/ymmfile/static/resource/f1b19e18-3105-4951-8e95-f0de00b221d2.png',
        primary: 'https://imagecdn.ymm56.com/ymmfile/common-operation/d5c09873-f788-4fe8-8d46-669fb5bbce91.png',
    },
    // 加载中
    loading: {
        default: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
        blue: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
    },
    // 相机📷
    camera: {
        default: 'https://image.ymm56.com/ymmfile/operation-biz/2361a262-9f06-420b-9514-0d12e3a26d12.png',
        blue: 'https://image.ymm56.com/ymmfile/operation-biz/218ba18d-5ab4-4a83-92bb-731802693ad8.png',
    },
    // 小图标
    icon: {
        question: 'https://imagecdn.ymm56.com/ymmfile/static/resource/f9c00240-d826-44a4-89be-39f8284c3243.png',
        warning: 'https://imagecdn.ymm56.com/ymmfile/static/resource/54eca927-239b-48f4-ab28-fa4b65da6c5f.png',
        waiting: 'https://imagecdn.ymm56.com/ymmfile/static/resource/38e7d189-35ef-45e9-840c-7b39ae88c2dd.png',
        triangle: 'https://imagecdn.ymm56.com/ymmfile/static/resource/83e4d14b-b386-4f9a-a320-dbd5e243b7a8.png',
    },
    // 搜索图标
    search: {
        default: 'https://imagecdn.ymm56.com/ymmfile/static/resource/51a99429-1d69-4faa-a15a-50b4ef461f75.png',
        grey: 'https://imagecdn.ymm56.com/ymmfile/static/resource/dcb5f526-9e59-4789-a98e-69270c6cb38f.png',
    },
};
const mergeAssets = (newAssets) => {
    deepMerge(Assets, newAssets);
};

const Themes = {
    color: {
        brand: '#fa871e',
        white: '#fff',
    },
};
const mergeThemes = (newThemes) => {
    deepMerge(Themes, newThemes);
};

/** 当前是否是开发环境 */
const inDev = process.env.NODE_ENV === 'development';
/** 当前运行的容器 */
const TARO_ENV = process.env.TARO_ENV;
/** 是否运行在RN */
const inRN = TARO_ENV === 'rn';
/** 是否运行在H5 */
const inWeb = TARO_ENV === 'h5' || TARO_ENV === 'mw';
/** 是否运行在微前端 @since 1.0.3-beta.4 */
const inMw = TARO_ENV === 'mw';
/** 是否运行在微信小程序 */
const inWeapp = TARO_ENV === 'weapp';
/** 是否运行在阿里小程序 */
const inAlipay = TARO_ENV === 'alipay';
/** 系统相关信息 */
const systemInfo = getSystemInfoSync();
/** 像素比 */
const deviceRatio$1 = systemInfo.windowWidth / 720;
/** 统一尺寸后缀 */
const px = inRN ? (size) => size : (size) => size && `${size}px`;
/** 自动缩放  */
const autoFix = (size) => size * deviceRatio$1;
/** 自动缩放  */
const scale = (size) => px(autoFix(size));
/** 当前是否是苹果系统 */
const inIOS = systemInfo.platform === 'ios';
/** 当前是否处于iPhone环境 native和web */
const inIPhone = systemInfo.system === 'iOS' ||
    systemInfo.brand === 'iPhone' ||
    systemInfo.model === 'iPhone' ||
    inIOS;
/** 当前是否是iPhone刘海屏 */
const inNotch = inIPhone && (systemInfo.screenHeight >= 780 || systemInfo.screenWidth >= 780);
/** 当前是否是安卓系统 */
const inAndroid = systemInfo.platform === 'android';

const createAutoIncrement = (outset = 1) => {
    let id = outset;
    return () => id++;
};

/** 中间态适配器 */
const callbackAdaptor = (callback) => (rect) => callback(Array.isArray(rect) ? rect[0] : rect);
/**
 *  统一多端Taro.createSelectorQuery方法
 * @param selector 选择器
 * @param callback 选取之后的回调
 */
function PolyCreateSelectorQuery(selector, callback) {
    var _a;
    const cb = callbackAdaptor(callback);
    const query = (_a = Taro.createSelectorQuery) === null || _a === void 0 ? void 0 : _a.call(Taro);
    if (!query)
        return;
    const el = query.select(selector);
    el.boundingClientRect(cb);
    query.exec(cb);
}

function delay(delayTime = 25) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, delayTime);
    });
}

const ENV = Taro.getEnv();
let scrollTop = 0;
function handleTouchScroll(flag) {
    if (ENV !== Taro.ENV_TYPE.WEB) {
        return;
    }
    if (flag) {
        scrollTop = document.documentElement.scrollTop;
        // 使body脱离文档流
        document.body.classList.add('at-frozen');
        // 把脱离文档流的body拉上去！否则页面会回到顶部！
        document.body.style.top = `${-scrollTop}px`;
    }
    else {
        document.body.style.top = '';
        document.body.classList.remove('at-frozen');
        document.documentElement.scrollTop = scrollTop;
    }
}

function objectToString(style) {
    if (style && typeof style === 'object') {
        let styleStr = '';
        Object.keys(style).forEach((key) => {
            const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            styleStr += `${lowerCaseKey}:${style[key]};`;
        });
        return styleStr;
    }
    else if (style && typeof style === 'string') {
        return style;
    }
    return '';
}

/**
 * 合并 style
 * @param {Object|String} style1
 * @param {Object|String} style2
 * @returns {String}
 */
function mergeStyle(...styles) {
    const _styles = styles.reduce((pre, cur) => pre.concat(cur), []);
    if (_styles.some((style) => typeof style == 'string')) {
        return _styles.reduce((pre, cur) => pre + objectToString(cur), '');
    }
    return _styles.reduce((pre, cur) => Object.assign(pre, cur), {});
}

const defaultDesignWidth = 750;
const deviceRatio = {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
};
function pxTransform(size, designWidth = defaultDesignWidth) {
    if (!size)
        return '';
    return size / deviceRatio[designWidth];
}

function transformIfPx(size) {
    if (!/px$/.test(String(size)))
        return size;
    size = Number(String(size).replace(/px$/, ''));
    return pxTransform(size);
}

/**
 * 第一次不执行，之后的改变才执行函数回调
 */
const useAfterwards = (fn, deps) => {
    const ref = useRef(false);
    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
        }
        else {
            fn === null || fn === void 0 ? void 0 : fn();
        }
    }, deps);
};

/**
 * 加强版的setState，适用于object类型
 */
function useEnhancedState(initialState) {
    const [state, setState] = useState(initialState);
    function setEnhancedState(record, val) {
        if (typeof record === 'string') {
            // FIXME: 异步拿最新的状态
            setState((prevState) => (Object.assign(Object.assign({}, prevState), { [record]: val })));
        }
        else {
            setState((prevState) => (Object.assign(Object.assign({}, prevState), record)));
        }
    }
    // Bug fixed
    return [state, useCallback(setEnhancedState, [state])];
}

function useMeasure() {
    const ref = useRef();
    const measure = () => Promise.resolve().then(() => {
        var _a, _b;
        return ((_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) !== null && _b !== void 0 ? _b : {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            bottom: 0,
            top: 0,
            right: 0,
            left: 0,
        });
    });
    return [{ ref }, measure];
}

/**
 * 判断dom是否挂载
 */
const useMount = () => {
    const mountRef = useRef(false);
    useEffect(() => {
        mountRef.current = true;
    }, []);
    return () => mountRef.current;
};

const noob = {};
const noop = () => { };
const no = () => false;
const isUndef = (val) => typeof val === 'undefined';
const isString = (val) => typeof val === 'string';
const isNumber = (val) => typeof val === 'number';
const isBoolean = (val) => typeof val === 'boolean';
const isFunction = (val) => typeof val === 'function';
const isArray = Array.isArray;
const extend = Object.assign;
const upperCase = (val) => val[0].toUpperCase() + val.slice(1);
const log = inDev ? console.log : noob;

export { Assets, ConfigConsumer, ConfigProvider, Debugger, TARO_ENV, Themes, autoFix, createAutoIncrement, PolyCreateSelectorQuery as createSelectorQuery, deepMerge, delay, deviceRatio$1 as deviceRatio, extend, handleTouchScroll, inAlipay, inAndroid, inDev, inIOS, inIPhone, inMw, inNotch, inRN, inWeapp, inWeb, isArray, isBoolean, isFunction, isNumber, isObject, isString, isUndef, log, mergeAssets, mergeStyle, mergeThemes, no, noob, noop, objectToString, px, pxTransform, scale, systemInfo, transformIfPx, upperCase, useAfterwards, useCareClass, useCareClasses, useCareComponent, useCareMode, useCarelessClass, useClassWithCare, useClassesWithCare, useConfig, useEnhancedState, useMeasure, useMount, withCare };
