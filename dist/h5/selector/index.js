import './index.css';
import { View, Text, Image, Input, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import React, { createContext, forwardRef, useRef, useState, useEffect, useImperativeHandle, isValidElement, useMemo } from 'react';
import { useCareClass, isArray, useCareMode, px, isFunction } from '../common';

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

const Context = createContext({});
const Provider = Context.Provider;

/**
 * @component
 * 计数小红点
 */
function CountDot(props) {
    const rootClass = useCareClass.single('fta-selector-count');
    const textClass = useCareClass.single('fta-selector-count__text');
    return (React.createElement(View, { className: rootClass, style: props.theme ? { backgroundColor: props.theme } : void 0 },
        React.createElement(Text, { className: textClass }, props.children)));
}

/**
 * 双向链表
 */
class DoublyLinkedList {
    constructor(value, prev = null, next = []) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
    append(node) {
        this.next.push(node);
    }
    prepend(node) {
        this.prev = node;
    }
    resolvePath() {
        const path = [this.value];
        let current = this.prev;
        while (current !== null) {
            path.push(current.value);
            current = current.prev;
        }
        return path.reverse().slice(1);
    }
}

// export const UNCHECKED =
//   'data:image/png;base64,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'
// export const CHECKED =
//   'data:image/png;base64,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'
const CHECK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAAAAXNSR0IArs4c6QAAATxJREFUOE+tk70rxVEcxj+PlyR3VHb/h1vqpshbWUwWk3Q3/gGTLBZZLFIGg0HJpkxiNEmJBUVJihD16Oi4nXvdl37XPeM53/M5z3m+z1e0aKlFHP4Fsp2T9BLENAWy3Q1sAxPAqqSFzCDbncAeMBxteZTUmwlkux3YAaYSb9ckFUsg23lgGtiSdFLZBNuhdhOYSc4OgElJnz8g2x3ADdAHvAOjkg5TmO11YC7ZOwJGJL2VzI6vXQL9sfAVGJJ0HB9aARYTyClQ+O1YWddsF4B9oCteeAYGgzpgKYGchX1JT6niMrNtjwO7QPhqWCEjueTCBZCX9FDp4Z+u2Q6Gh4y0VRRfAwOSbqtNQ9X2254FNpLA3kXIVa2Rqpkj2/PAMnAPjEk6rzeXdQNpuwf4kPTVaLgzJbtpRY1UpOffmQVcErA+YwoAAAAASUVORK5CYII=';
const SEARCH = 'data:image/png;base64,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';

function Search(props) {
    const { placeholder, value, onChange } = props, extraProps = __rest(props, ["placeholder", "value", "onChange"]);
    return (React.createElement(View, { className: 'fta-selector-search' },
        React.createElement(Image, { src: SEARCH, className: 'fta-selector-search__icon' }),
        React.createElement(Input, Object.assign({ className: 'fta-selector-search__input', placeholder: placeholder, value: value, onInput: (evt) => onChange(evt.detail.value), 
            // @ts-ignore
            placeholderTextColor: '#C7C7C7' }, extraProps))));
}

const defaults = {
    // col
    columnClassNames: ['fta-selector-col-0', 'fta-selector-col-1', 'fta-selector-col-2'],
    unsetColumnClassName: 'fta-selector-col-2',
    // item
    itemClassNames: ['fta-selector-item-0', 'fta-selector-item-1', 'fta-selector-item-2'],
    itemActiveClassNames: [
        'fta-selector-item-0--active',
        'fta-selector-item-1--active',
        'fta-selector-item-2--active',
    ],
    itemTextClassNames: ['fta-selector-text-0', 'fta-selector-text-1', 'fta-selector-text-2'],
    itemTextActiveClassNames: [
        'fta-selector-text-0--active',
        'fta-selector-text-1--active',
        'fta-selector-text-2--active',
    ],
    unsetItemClassName: 'fta-selector-item-1',
    unsetItemActiveClassName: 'fta-selector-item-1--active',
    unsetItemTextClassName: 'fta-selector-text-1',
    unsetItemTextActiveClassName: 'fta-selector-text-1--active',
    initItemClassName: 'fta-selector-item',
    initItemActiveClassName: 'fta-selector-item--active',
    initItemTextClassName: 'fta-selector-text',
    initItemTextActiveClassName: 'fta-selector-text--active',
};
/** 获取默认列类名 */
const getDefaultColClass = (depth) => defaults.columnClassNames[depth - 1] || defaults.unsetColumnClassName;
/** 获取默认item类名 */
const getDefaultItemClass = (depth, careMode) => `${defaults.itemClassNames[depth - 1] || defaults.unsetItemClassName} ${defaults.initItemClassName} ${careMode ? defaults.initItemClassName + '--care' : ''}`;
/** 获取默认item激活类名 */
const getDefaultActiveItemClass = (depth) => `${defaults.itemActiveClassNames[depth - 1] || defaults.itemActiveClassNames} ${defaults.initItemActiveClassName}`;
/** 获取默认item text 类名 */
const getDefaultItemTextClass = (depth, careMode) => `${defaults.itemTextClassNames[depth - 1] || defaults.unsetItemTextClassName} ${defaults.initItemTextClassName} ${careMode ? defaults.initItemTextClassName + '--care' : ''}`;
/** 获取默认item text激活类名 */
const getDefaultActiveItemTextClass = (depth) => `${defaults.itemTextActiveClassNames[depth - 1] || defaults.itemTextActiveClassNames} ${defaults.initItemTextActiveClassName}`;

/**
 * @component
 * 选择展示Tag
 */ function Tag(props) {
    const { className, 
    // @ts-ignore
    style, customStyle, textClassName, textStyle, children, color, bgColor, onClick, onClose, closeIcon, } = props;
    const rootClass = classNames('fta-selector-tag', className);
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    const textClass = classNames('fta-selector-tag__text', textClassName);
    const literalStyle = Object.assign({}, textStyle);
    if (color) {
        literalStyle.color = color;
        rootStyle.borderColor = color;
    }
    if (bgColor) {
        rootStyle.backgroundColor = bgColor;
    }
    return (React.createElement(View, { className: rootClass, style: rootStyle, onClick: onClick },
        React.createElement(Text, { className: textClass, style: literalStyle }, children),
        closeIcon ? (React.createElement(Image, { src: closeIcon, onClick: onClose, className: 'fta-selector-tag-close' })) : (React.createElement(Text, { className: 'fta-selector-tag__close', style: color ? { color } : void 0, onClick: onClose }, "\u00D7"))));
}

const deepCopy = (record) => JSON.parse(JSON.stringify(record));
const formatCount = (record) => {
    const rest = __rest(record, ["parent", "total"]);
    const rect = Object.keys(rest).reduce((prev, cur) => {
        prev[cur] = rest[cur].total;
        return prev;
    }, {});
    return rect;
};
/**
 * 格式化每一级的选项
 */
const resolveOptions = (options, parent, enableCheckAll) => {
    if (enableCheckAll && parent) {
        return [parent].concat(options);
    }
    return options;
};
/** 是否是空对象 */
const isEmptyRecord = (record) => JSON.stringify(record) === '{}';
/**
 * @component
 */
function ScrollArea(props) {
    const { counts, showCount, className, style, options, itemHeight, fieldNames, multiple, activeIndex, seletedIndexes = [], 
    // limit,
    theme, suffixIcon, autoHeight, activeSuffixIcon, itemClassName, activeItemClassName, itemStyle, activeItemStyle, enableCheckAll, isDisabled, labelFormatter, onChange, onSelectDisabled, _index, _end, _parent, } = props;
    const depth = _index + 1;
    const careMode = useCareMode();
    const prevParentRef = useRef(_parent);
    // const [activeIndex, setActiveIndex] = useState(multiple && _end ? [] : 0)
    const builtInClass = getDefaultColClass(depth);
    const rootClass = classNames('fta-selector-scrollarea', builtInClass, className);
    const itemClass = getDefaultItemClass(depth, careMode);
    const itemActiveClass = getDefaultActiveItemClass(depth);
    const textClass = getDefaultItemTextClass(depth, careMode);
    const textActiveClass = getDefaultActiveItemTextClass(depth);
    const onSelect = (idx, disabled, option) => {
        if (disabled) {
            onSelectDisabled === null || onSelectDisabled === void 0 ? void 0 : onSelectDisabled(option);
        }
        else {
            onChange(idx, _index, multiple && _end && seletedIndexes.includes(idx));
        }
    };
    // 判断当前索引是否是激活状态
    const isActive = _end && multiple ? (i) => seletedIndexes.includes(i) : (i) => i === activeIndex;
    // TODO: 选择时滚动定位
    const scrollTop = autoHeight || multiple
        ? prevParentRef.current === _parent
            ? undefined
            : 0 + Math.random()
        : (activeIndex > 1 ? activeIndex - 1 : 0) * itemHeight;
    // console.log('scrollTop', scrollTop)
    const itemStaticClass = classNames(itemClass, itemClassName, autoHeight && `fta-selector-item--auto ${careMode ? 'fta-selector-item--auto--care' : ''}`);
    const textStaticClass = classNames(textClass, autoHeight && `fta-selector-text--auto ${careMode ? 'fta-selector-text--auto--care' : ''}`);
    const iconClass = useCareClass.single('fta-selector-suffix__icon');
    const resolveIndex = enableCheckAll ? (index) => index - 1 : (index) => index;
    useEffect(() => {
        prevParentRef.current = _parent;
    }, [_parent]);
    return (React.createElement(View, { className: rootClass, style: style },
        React.createElement(ScrollView
        // @ts-ignore
        , { 
            // @ts-ignore
            nestedScrollEnabled: true, scrollY: true, scrollWithAnimation: true, scrollTop: scrollTop, 
            // @ts-ignore
            showsVerticalScrollIndicator: false }, resolveOptions(options, _parent, enableCheckAll).map((opt, index) => {
            const i = resolveIndex(index);
            const active = isActive(i);
            const itemLabel = opt[fieldNames.label];
            const itemValue = opt[fieldNames.value];
            const disabled = isDisabled(itemLabel, itemValue, opt, _index + 1);
            const itemCls = classNames(itemStaticClass, active && itemActiveClass, active && activeItemClassName);
            // console.log('===opt==', opt, _parent)
            const [themeStyle, themeBgStyle] = theme && active ? [{ color: theme }, { backgroundColor: theme }] : [{}, {}];
            const heightStyle = autoHeight ? {} : { height: px(itemHeight), minHeight: 'auto' };
            const itemStyl = Object.assign(Object.assign(Object.assign({}, heightStyle), itemStyle), (active ? activeItemStyle : {}));
            return (React.createElement(View, { className: itemCls, style: itemStyl, key: `${itemValue}-${i}`, onClick: () => onSelect(i, disabled, opt) },
                React.createElement(Text, { className: classNames(textStaticClass, active && textActiveClass, disabled && 'fta-selector-text--disabled'), style: themeStyle }, labelFormatter(itemLabel, opt, i === -1, _index + 1)),
                React.createElement(View, null, _end ? ((active ? activeSuffixIcon : suffixIcon) || (React.createElement(View, { className: `fta-selector-suffix${active ? ' fta-selector-suffix--active' : ''}${careMode ? ' fta-selector-suffix--care' : ''}`, style: themeBgStyle },
                    React.createElement(Image, { className: iconClass, src: CHECK })))) : multiple && showCount && counts[i] ? (React.createElement(CountDot, { theme: theme }, counts[i])) : null)));
        }))));
}
ScrollArea.defaultProps = {
    activeIndex: 0,
    onChange() { },
    isDisabled: () => false,
    labelFormatter(label, _option, isfullCheck) {
        return (isfullCheck ? '全' : '') + label;
    },
};
/** 浅比较选择的值是否相等 */
const shallowCompare = (v1, v2) => {
    if (v1 === v2)
        return true;
    if (isArray(v1) && isArray(v2)) {
        return v1.length === v2.length && v1.every((v, i) => v === v2[i]);
    }
    return false;
};
/** 计算已选数量 */
const calcSelectedCounts = (leaf, depth, counterRef = { current: 0 }) => {
    const keys = Object.keys(leaf);
    if (depth === 1) {
        counterRef.current += keys.length;
    }
    else {
        keys.forEach((k) => {
            if (leaf[k]) {
                calcSelectedCounts(leaf[k], depth - 1, counterRef);
            }
        });
    }
    return counterRef.current;
};
/** 解析子项数量 */
const resolveCounts = (leaf, depth, counter = Object.keys(leaf).reduce((prev, cur) => {
    prev[cur] = {
        total: 0,
    };
    return prev;
}, { total: 0, parent: null }), _index = 0, parent = counter) => {
    const keys = Object.keys(leaf);
    if (depth === 1) {
        parent.total = keys.length;
        let p = parent;
        while ((p = p.parent)) {
            p.total += parent.total;
        }
    }
    else {
        keys.forEach((k) => {
            if (leaf[k]) {
                resolveCounts(leaf[k], depth - 1, counter, +k, (parent[k] = { total: 0, parent }));
            }
        });
    }
    return counter;
};
const emptyRecord = (record) => {
    Object.keys(record).forEach((key) => delete record[key]);
};
/**  获取即将被选中的树结构 */
const resolveWillSelected = (indexes, selected) => {
    const selectedCopy = deepCopy(selected);
    let current = selectedCopy;
    let tmp;
    for (const i of indexes) {
        if (i === -1) {
            // 如果是全选，清空所有选项
            emptyRecord(current);
        }
        else {
            // 单选清空全选
            delete current[-1];
        }
        const node = current[i];
        if (!node) {
            tmp = {};
            current[i] = tmp;
            current = tmp;
        }
        else {
            current = node;
        }
    }
    return selectedCopy;
};
/** 单选模式下，从索引处获得选项数组 */
const resolveOptsFromIndexes = (indexes, options, childrenKey) => {
    let tmpOpts = options;
    let lastSelectedOpts = null;
    const selectedOpts = indexes.reduce((prev, cur) => {
        const tmp = tmpOpts[cur];
        if (tmp) {
            const copy = Object.assign({}, tmp);
            copy.__parent__ = lastSelectedOpts;
            copy.__index__ = cur;
            lastSelectedOpts = copy;
            prev.push(tmp);
            tmpOpts = (tmp === null || tmp === void 0 ? void 0 : tmp[childrenKey]) || [];
        }
        return prev;
    }, []);
    return [selectedOpts, lastSelectedOpts];
};
/** 多选模式下，从索引处获得数组 */
const resolveOptsFromIndexLeaf = (leaf, options, depth, childrenKey, selectedOpts = [], lastSelectedOpts = [], parent = null) => {
    const keys = Object.keys(leaf).map(Number);
    keys.forEach((k) => {
        if (k === -1) {
            selectedOpts.push([parent]);
            lastSelectedOpts.push(parent);
        }
        else if (leaf[k]) {
            // shallow copy
            const option = options[k];
            // 如果option不存在，说明有全选的情况
            const opts = [option];
            selectedOpts.push(opts);
            const copy = Object.assign({}, option);
            copy.__parent__ = parent;
            copy.__index__ = k;
            if (depth === 1) {
                lastSelectedOpts.push(copy);
            }
            resolveOptsFromIndexLeaf(leaf[k], (option[childrenKey] || []), depth - 1, childrenKey, opts, lastSelectedOpts, copy);
        }
    });
    return [selectedOpts, lastSelectedOpts];
};
// function fillupList<T>(list: T[], depth: number, defaultValue: T) {
//   if (list.length === depth) return list
//   return list.concat(new Array(depth).fill(defaultValue)).slice(0, depth)
// }
const lookupLeaf = (value, options, depth, valueKey, childrenKey, linkedList = new DoublyLinkedList(0), result = []) => {
    if (value.length) {
        for (let i = 0; i < options.length; i++) {
            if (!value.length)
                break;
            const option = options[i];
            const optVal = option[valueKey];
            const nextLinkedList = new DoublyLinkedList(i, linkedList);
            linkedList.append(nextLinkedList);
            nextLinkedList.prev;
            const index = value.indexOf(optVal);
            // console.log(option.shortName, 'optVal')
            if (index > -1) {
                // 找到索引
                // console.log('找到索引', index, nextLinkedList.resolvePath(), depth)
                const path = nextLinkedList.resolvePath();
                value.splice(index, 1);
                // const fullPath = fillupList(path, depth, 1)
                // console.log('fullPath', fullPath, path)
                result.push(path);
                if (!value.length)
                    break;
            }
            else if (option[childrenKey] && depth > 0) {
                lookupLeaf(value, option[childrenKey], depth - 1, valueKey, childrenKey, nextLinkedList, result);
            }
        }
    }
    return result;
};
/** 补全默认选择结果 */
const fillResult = (result, 
// options: Option[],
depth, enableCheckAll) => {
    return result.map((list) => {
        const copy = list.slice();
        if (copy.length < depth) {
            let root;
            // 是补0还是补1
            for (let i = copy.length; i < depth; i++) {
                if (i - 1 > -1) {
                    const checkAll = enableCheckAll[i - 1];
                    if (root === void 0) {
                        root = checkAll;
                    }
                    else if (checkAll) {
                        root = true;
                    }
                    // 如果两个label相等的话就
                    copy.push(root ? -1 : 0);
                }
            }
        }
        return copy;
    });
};
const resolveSelectedFromValue = (value, options, depth, valueKey, childrenKey, enableCheckAll) => {
    const leaf = {};
    if (!isArray(value) && value != null) {
        value = [value];
    }
    if (isArray(value) && value.length) {
        const result = lookupLeaf(value.slice(), options, depth, valueKey, childrenKey);
        const filledResult = fillResult(result, depth, enableCheckAll);
        // console.log('filledResult==', filledResult)
        filledResult.forEach((path) => {
            path.reduce((prev, cur) => {
                return (prev[cur] = prev[cur] || {});
            }, leaf);
        });
        // console.log('leaffff', leaf)
        return [
            leaf,
            filledResult[0],
            // fillupList(result[0], depth, -1)
        ];
    }
    return [leaf, []];
};
/** 从已选项里面获取选项的索引 */
const resolveIndexesFromCheckedOption = (option) => {
    const indexes = [];
    let tmp = option;
    while (tmp) {
        indexes.unshift(tmp.__index__);
        tmp = tmp.__parent__;
    }
    return indexes;
};
/** 从leaf节点里面删除指定的路径 */
const removeIndexesFromLeaf = (indexes, leaf) => {
    const prevs = indexes.slice(0, -1);
    const end = indexes.slice(-1)[0];
    const endMap = prevs.reduce((prev, cur) => prev[cur] ||
        // ⚠️容错性
        {}, leaf);
    delete endMap[end];
    return leaf;
};
/** 遍历搜索 */
const traverseSearch = (options, hit, labelKey, childrenKey, keyword, needbreakRef = { current: false }, linkedList = new DoublyLinkedList(0), result = []) => {
    if (needbreakRef.current)
        return result;
    for (let i = 0; i < options.length; i++) {
        if (needbreakRef.current)
            break;
        const option = options[i];
        if (hit(keyword, option[labelKey], option)) {
            needbreakRef.current = true;
            result.push(...linkedList.resolvePath(), i);
            break;
        }
        const newLinkedList = new DoublyLinkedList(i);
        newLinkedList.prepend(linkedList);
        linkedList.append(newLinkedList);
        if (option[childrenKey]) {
            traverseSearch(option[childrenKey], hit, labelKey, childrenKey, keyword, needbreakRef, newLinkedList, result);
        }
    }
    return result;
};
const formatTagText = (option, labelKey, valueKey) => {
    let str = option[labelKey];
    const parent = option.__parent__;
    if (parent &&
        parent[valueKey] !== option[valueKey] &&
        // 如 北京/北京 格式成 北京
        str !== parent[labelKey]) {
        return parent[labelKey] + '/' + str;
    }
    return str;
};
const SelectorCore = forwardRef(function _SelectorCore(props, ref) {
    const { depth, options, itemHeight, fieldNames, showSearch, showResult, strictSearch, enableCheckAll, theme, placeholder, columnClassName, columnStyle, className, 
    // @ts-ignore
    style, limit, limitHint, multiple, autoHeight, customStyle, containerClassName, containerStyle, tagBgColor, tagColor, tagFormatter, emptyHint, onExceed, onChange, defaultValue: value = multiple ? [] : null } = props, extraProps = __rest(props, ["depth", "options", "itemHeight", "fieldNames", "showSearch", "showResult", "strictSearch", "enableCheckAll", "theme", "placeholder", "columnClassName", "columnStyle", "className", "style", "limit", "limitHint", "multiple", "autoHeight", "customStyle", "containerClassName", "containerStyle", "tagBgColor", "tagColor", "tagFormatter", "emptyHint", "onExceed", "onChange", "defaultValue"]);
    const prevValueRef = useRef(value);
    // 记录useEffect是否第一次触发
    // const firstRef = useRef(true)
    const _loops = useRef(new Array(depth).fill(0)).current;
    // 当前选择项是否是全选
    const checkAllRef = useRef(false);
    // const sortRef = useRef<Record<string, number>>({}).current
    const [showEmpty, setEmpty] = useState(false);
    const [activeIndexes, setActiveIndexes] = useState(_loops);
    const [selected, setSelected] = useState({});
    const [activeList, setActiveList] = useState([]);
    useEffect(() => {
        if (options.length && value != null) {
            const [leaf, indexes] = resolveSelectedFromValue(value, options, depth, fieldNames.value, fieldNames.children, enableCheckAll);
            // console.log('leaf', leaf, indexes)
            if (!(isEmptyRecord(leaf) && isEmptyRecord(selected))) {
                setSelected(leaf);
            }
            if (indexes === null || indexes === void 0 ? void 0 : indexes.length) {
                setActiveIndexes(indexes);
            }
        }
    }, [options]);
    useEffect(() => {
        if (shallowCompare(prevValueRef.current, value))
            return;
        prevValueRef.current = value;
        // 重新聚焦
    }, [value]);
    const rootClass = classNames('fta-selector', className);
    const rootStyle = Object.assign({}, style, customStyle);
    const containerClass = classNames('fta-selector-container', containerClassName);
    // 取消多个选中的节点
    const uncheckMultipleFromList = (optionList) => {
        if (!isArray(optionList))
            return;
        const selectedCopy = Object.assign({}, selected);
        optionList.forEach((option) => {
            const indexes = resolveIndexesFromCheckedOption(option);
            removeIndexesFromLeaf(indexes, selectedCopy);
        });
        setSelected(selectedCopy);
    };
    // 取消选中的节点
    const uncheck = (indexes) => {
        const selectedCopy = Object.assign({}, selected);
        removeIndexesFromLeaf(indexes, selectedCopy);
        setSelected(selectedCopy);
    };
    // 从选择的列表中取消选中节点
    const uncheckFromList = (option) => {
        const indexes = resolveIndexesFromCheckedOption(option);
        // console.log('==indexes==', indexes)
        uncheck(indexes);
    };
    const onSearch = (keyword) => {
        if (!keyword) {
            setEmpty(false);
            return;
        }
        const hit = isFunction(strictSearch)
            ? strictSearch
            : strictSearch === true
                ? (keyword, label) => keyword === label
                : (keyword, label) => String(label).indexOf(keyword) > -1;
        const result = traverseSearch(options, hit, fieldNames.label, fieldNames.children, keyword);
        if (result.length) {
            const indexes = result.concat(_loops).slice(0, depth);
            setActiveIndexes(indexes);
            setEmpty(false);
        }
        else {
            console.log('search result: null');
            setEmpty(true);
        }
    };
    const onSelectChange = (index, cursor, cancel) => {
        // 标记当前选择是否为全选
        checkAllRef.current = index === -1;
        const copy = activeIndexes.slice();
        // 多选模式
        if (multiple) {
            // 取消勾选
            if (cancel) {
                // 置为空指针
                copy[cursor] = null;
                // 将勾选项目从selectedIndexes移出
                uncheck(copy.slice(0, -1).concat([index]));
            }
            else {
                copy[cursor] = index;
                for (let i = cursor + 1; i < copy.length; i++) {
                    // TODO:
                    if (i + 1 === copy.length) {
                        copy[i] = null;
                    }
                    else {
                        copy[i] = 0;
                    }
                }
                // 成功勾选
                // 如果是最后一项， 加入此项，如果没有则创建索引数组
                if (depth === cursor + 1) {
                    // 判断是否超出🚫
                    const willChecked = resolveWillSelected(copy, selected);
                    // console.log('willSelected', copy, willChecked)
                    const counts = calcSelectedCounts(willChecked, depth);
                    if (counts > limit) {
                        return onExceed === null || onExceed === void 0 ? void 0 : onExceed();
                    }
                    else {
                        setSelected(willChecked);
                    }
                }
            }
        }
        else {
            // 单选模式，如果已经激活则直接return
            if (copy[cursor] === index)
                return;
            copy[cursor] = index;
            for (let i = cursor + 1; i < copy.length; i++) {
                copy[i] = 0;
            }
        }
        setActiveIndexes(copy);
    };
    useImperativeHandle(ref, () => ({
        reset() {
            setActiveIndexes(_loops);
            setSelected({});
            setActiveList([]);
        },
        uncheck(option) {
            if (isArray(option)) {
                uncheck(option);
            }
            else {
                uncheckFromList(option);
            }
        },
        uncheckMultiple: uncheckMultipleFromList,
    }));
    useEffect(() => {
        // 单选模式
        if (!multiple && activeIndexes.every((v) => v >= -1 && options.length)) {
            const [selectedOpts, lastSelectedOpt] = resolveOptsFromIndexes(activeIndexes, options, fieldNames.children);
            onChange === null || onChange === void 0 ? void 0 : onChange(selectedOpts, lastSelectedOpt);
        }
    }, [activeIndexes, options]);
    useEffect(() => {
        // 多选模式
        if (multiple && options.length) {
            const [selectedOpts, lastSelectedOpts] = resolveOptsFromIndexLeaf(selected, options, depth, fieldNames.children);
            // TODO: 这里的选项要排序，找出差异的项目，排在最后
            setActiveList(lastSelectedOpts);
            onChange === null || onChange === void 0 ? void 0 : onChange(selectedOpts, lastSelectedOpts);
        }
    }, [selected, options]);
    const counts = resolveCounts(selected, depth);
    let tmpOpts;
    let tmpIndexes;
    let tmpLeaf = selected;
    let tmpParent;
    // let tmpCount = 0
    // 解析每一列该展示的选项列表
    let tmpCounts = counts;
    let active;
    const resolveOpts = (cursor) => {
        var _a;
        // parentActive = activeIndexes[cursor - 2]
        active = activeIndexes[cursor - 1];
        const nexParent = cursor ? tmpOpts[active] || null : null;
        if (!(tmpParent && !nexParent)) {
            tmpParent = nexParent;
        }
        tmpOpts = cursor ? ((_a = tmpOpts[active]) === null || _a === void 0 ? void 0 : _a[fieldNames.children]) || [] : options;
        tmpLeaf = (cursor ? tmpLeaf[active] : tmpLeaf) || {};
        tmpIndexes = Object.keys(tmpLeaf).map(Number);
        tmpCounts = (cursor ? tmpCounts[active] : tmpCounts) || {};
    };
    const careMode = useCareMode();
    const _itemHeight = itemHeight * (careMode ? 1.3 : 1);
    return (React.createElement(Provider, { value: { itemHeight: _itemHeight } },
        React.createElement(View, { className: rootClass, style: rootStyle },
            showSearch ? (React.createElement(View, { className: 'fta-selector-search-wrap' },
                React.createElement(Search, { placeholder: placeholder, onChange: onSearch }))) : null,
            isValidElement(showResult) ? (showResult) : showResult && activeList.length ? (React.createElement(View, { className: 'fta-selector-result' },
                React.createElement(View, { className: 'fta-selector-result-container' },
                    limitHint ? React.createElement(Text, { className: 'fta-selector-result-limit' }, limitHint) : null,
                    React.createElement(ScrollView
                    // @ts-ignore
                    , { 
                        // @ts-ignore
                        nestedScrollEnabled: true, scrollX: true, scrollY: false, enableFlex: true, 
                        // @ts-ignore
                        showsHorizontalScrollIndicator: false, className: `fta-selector-result-wrap${limitHint ? '' : ' fta-selector-result-container'}` },
                        React.createElement(View, { className: 'fta-selector-result-tags' }, activeList.map((option, i) => (React.createElement(Tag, { key: option[fieldNames.value] + '__' + i, color: tagColor, bgColor: tagBgColor, onClose: () => uncheckFromList(option) }, tagFormatter(option, fieldNames.label, fieldNames.value))))))))) : null,
            React.createElement(View, { className: containerClass, style: containerStyle },
                emptyHint && showEmpty ? (React.createElement(View, { className: 'fta-selector-empty' },
                    React.createElement(Text, { className: 'fta-selector-empty__text' }, emptyHint))) : null,
                _loops.map((_, i) => {
                    const colClass = columnClassName === null || columnClassName === void 0 ? void 0 : columnClassName(i + 1);
                    const colStyle = columnStyle === null || columnStyle === void 0 ? void 0 : columnStyle(i + 1);
                    const activeIndex = activeIndexes[i];
                    resolveOpts(i);
                    return (
                    // @ts-ignore
                    React.createElement(ScrollArea, Object.assign({ key: i, activeIndex: activeIndex, seletedIndexes: tmpIndexes, fieldNames: fieldNames, itemHeight: _itemHeight, options: tmpOpts, className: colClass, theme: theme, style: colStyle, multiple: multiple, autoHeight: autoHeight, limit: limit, enableCheckAll: 
                        // 较为恶心的逻辑
                        tmpOpts.length === 1 &&
                            tmpOpts[0][fieldNames.label] === tmpParent[fieldNames.label] // 诸如北京等
                            ? false
                            : !tmpOpts.length && active === -1 // 其他省
                                ? true
                                : enableCheckAll[i - 1], counts: formatCount(tmpCounts) }, extraProps, { onChange: onSelectChange, 
                        // @private
                        _index: i, _end: i + 1 === _loops.length, _parent: tmpParent })));
                })))));
});
function useSelectorCore(initialProps, deps = []) {
    const ref = useRef(null);
    return [ref, useMemo(() => React.createElement(SelectorCore, Object.assign({}, initialProps, { ref: ref })), deps)];
}
const defaultProps = {
    depth: 3,
    limit: 3,
    itemHeight: 46,
    multiple: false,
    showSearch: false,
    showCount: true,
    autoHeight: true,
    options: [],
    enableCheckAll: [],
    placeholder: '搜索',
    emptyHint: '暂无搜索结果',
    tagFormatter: formatTagText,
    fieldNames: {
        label: 'label',
        value: 'value',
        children: 'children',
    },
};
SelectorCore.defaultProps = defaultProps;

export { SelectorCore, useSelectorCore };
