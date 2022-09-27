import './index.css';
import { Text, View, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import React, { createContext, Component, isValidElement, Fragment, cloneElement } from 'react';
import { ConfigConsumer, useClassWithCare } from '../common';

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

const TabContext = createContext({
    disabled: false,
    activeIndex: 0,
});

/**
 * 克隆子节点（数组）
 */
function cloneChidren(nodeList, index) {
    let tabCursor = 0;
    return nodeList.map((el, i) => {
        // 如果不是合法的element就不做处理，直接返回
        if (!isValidElement(el) || el.type !== Tab)
            return React.createElement(Fragment, { key: i }, el);
        return cloneElement(el, {
            active: index === tabCursor,
            key: 'fta_tab_' + tabCursor,
            index: tabCursor++,
        });
    });
}
const isString = (val) => typeof val === 'string';
const isPrimitive = (val) => ['number', 'string', 'boolean'].includes(typeof val);
/**
 * @component
 * Tabs 包裹层
 */
class Tabs extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            _activeIndex: this.props.activeIndex || 0,
        };
        this._onChange = (i, val) => {
            var _a, _b;
            this.setState({ _activeIndex: i });
            (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, i, val);
        };
    }
    get activeIndex() {
        return this.props.controls ? this.props.activeIndex : this.state._activeIndex;
    }
    render() {
        const _a = this.props, { className, style, children, scrollable, options, controls } = _a, props = __rest(_a, ["className", "style", "children", "scrollable", "options", "controls"]);
        const activeIndex = this.activeIndex;
        const { vertical } = this.props;
        let clonedChildren;
        if (Array.isArray(options)) {
            clonedChildren = options.map((item, i) => {
                // 文本直接返回
                if (isPrimitive(item))
                    return (React.createElement(Tab, { active: i === activeIndex, key: i, index: i, value: item, className: classNames(this.props.tabClassName) }, item + ''));
                // 解析对象形式
                const { label, labelClassName, labelStyle, className, style } = item, props = __rest(item, ["label", "labelClassName", "labelStyle", "className", "style"]);
                return (React.createElement(Tab, Object.assign({ className: classNames(className, this.props.tabClassName), style: style, active: i === activeIndex, key: i, index: i }, props), isString(label) ? (React.createElement(Text, { style: labelStyle, className: labelClassName }, label)) : (label)));
            });
        }
        else {
            // 克隆子节点，注入相关props
            clonedChildren = Array.isArray(children) ? cloneChidren(children, activeIndex) : children;
        }
        const rootClass = classNames('fta-tabs', vertical && 'fta-tabs--vertical', className);
        const RootView = scrollable ? ScrollView : View;
        const scrollProps = {
            [`scroll${vertical ? 'Y' : 'X'}`]: true,
        };
        return (React.createElement(TabContext.Provider, { value: controls ? props : Object.assign(Object.assign({}, props), { onChange: this._onChange }) },
            React.createElement(RootView, Object.assign({ className: rootClass, style: style }, props, scrollProps), clonedChildren)));
    }
}
Tabs.defaultProps = {
    activeIndex: 0,
    onChange: null,
    disabled: false,
    scrollable: false,
    vertical: false,
    options: null,
    controls: true,
};
/**
 * @component
 * 单个Tab项
 */
class Tab extends Component {
    render() {
        const { className, style, disabled, active, children, index, value, dot } = this.props;
        return (React.createElement(ConfigConsumer, null, ({ careMode }) => (React.createElement(TabContext.Consumer, null, (context) => {
            // console.log(context.tabClassName, ' context.tabClassName')
            const isDisabled = disabled || context.disabled;
            const rootClass = classNames('fta-tab', context.vertical && 'fta-tab--vertical', context.tabClassName, className, isDisabled
                ? 'fta-tab--disabled'
                : active &&
                    classNames(useClassWithCare(careMode, ['fta-tab--active']), context.activeClassName), isDisabled && context.disabledClassName);
            const rootStyle = Object.assign(Object.assign(Object.assign({}, context.tabStyle), style), (active && context.activeStyle));
            const textStyle = Object.assign(Object.assign({}, context.textStyle), (active && context.activeTextStyle));
            return (React.createElement(View, { className: rootClass, style: rootStyle, onClick: () => { var _a; return isDisabled || ((_a = context.onChange) === null || _a === void 0 ? void 0 : _a.call(context, index, value)); } },
                isString(children) ? (React.createElement(Text, { style: textStyle, className: classNames(context.textClassName, useClassWithCare(careMode, ['fta-tab__text']), isDisabled
                        ? 'fta-tab--disabled__text'
                        : active
                            ? classNames('fta-tab--active__text', context.activeTextClassName)
                            : null) }, children)) : (children),
                dot ? (isValidElement(dot) ? (dot) : (React.createElement(View, { className: classNames('fta-tab__dot', context.dotClassName), style: context.dotStyle }))) : null,
                active ? (React.createElement(View, { className: classNames('fta-tab__line', context.lineClassName), style: context.lineStyle })) : null));
        }))));
    }
}
Tab.defaultProps = {
    active: false,
    disabled: false,
};
// Tab.displayName = 'FTA-tab'
Tabs.Tab = Tab;

export { Tab, Tabs as default };
