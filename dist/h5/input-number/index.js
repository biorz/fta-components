import './index.css';
import { View, Text, Input } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { px } from '../common';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

var lodash_tostring = toString;

// TODO: Check all types
// 实现两数相加并保留小数点后最短尾数
function addNum(num1, num2) {
    let sq1, sq2;
    try {
        sq1 = lodash_tostring(num1).split('.')[1].length;
    }
    catch (e) {
        sq1 = 0;
    }
    try {
        sq2 = lodash_tostring(num2).split('.')[1].length;
    }
    catch (e) {
        sq2 = 0;
    }
    const m = Math.pow(10, Math.max(sq1, sq2));
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
}
// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num) {
    if (num === '')
        return '0';
    const numStr = lodash_tostring(num);
    if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
        // 处理01变成1,并且不处理1.
        return lodash_tostring(parseFloat(num));
    }
    return lodash_tostring(num);
}
class InputNumber extends React.Component {
    constructor() {
        super(...arguments);
        this.handleValue = (value) => {
            const { max = 100, min = 0 } = this.props;
            let resultValue = value === '' ? min : value;
            // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
            if (resultValue > max) {
                resultValue = max;
                this.handleError({
                    type: 'OVER',
                    errorValue: resultValue,
                });
            }
            if (resultValue < min) {
                resultValue = min;
                this.handleError({
                    type: 'LOW',
                    errorValue: resultValue,
                });
            }
            if (resultValue && !Number(resultValue)) {
                resultValue = parseFloat(String(resultValue)) || min;
                this.handleError({
                    type: 'OVER',
                    errorValue: resultValue,
                });
            }
            resultValue = parseValue(String(resultValue));
            return resultValue;
        };
        this.handleInput = (e) => {
            const { value } = e.target;
            const { disabled } = this.props;
            if (disabled)
                return '';
            const newValue = this.handleValue(value);
            this.props.onChange(Number(newValue), e);
            return newValue;
        };
        this.handleBlur = (event) => this.props.onBlur && this.props.onBlur(event);
        this.handleError = (errorValue) => {
            if (!this.props.onErrorInput) {
                return;
            }
            this.props.onErrorInput(errorValue);
        };
    }
    handleClick(clickType, e) {
        const { disabled, value, min = 0, max = 100, step = 1 } = this.props;
        const lowThanMin = clickType === 'minus' && value <= min;
        const overThanMax = clickType === 'plus' && value >= max;
        if (lowThanMin || overThanMax || disabled) {
            const deltaValue = clickType === 'minus' ? -step : step;
            const errorValue = addNum(Number(value), deltaValue);
            if (disabled) {
                this.handleError({
                    type: 'DISABLED',
                    errorValue,
                });
            }
            else {
                this.handleError({
                    type: lowThanMin ? 'LOW' : 'OVER',
                    errorValue,
                });
            }
            return;
        }
        const deltaValue = clickType === 'minus' ? -step : step;
        let newValue = addNum(Number(value), deltaValue);
        newValue = Number(this.handleValue(newValue));
        this.props.onChange(newValue, e);
    }
    render() {
        const { customStyle, className, width, disabled, value, type, min = 0, max = 100, size, disabledInput, } = this.props;
        const inputStyle = width
            ? {
                width: px(width),
            }
            : {};
        const inputValue = Number(this.handleValue(value));
        const rootCls = classNames('fta-input-number', {
            'fta-input-number--lg': size === 'large',
        }, className);
        const minusBtnCls = classNames('fta-input-number__btn', {
            'fta-input-number--disabled': inputValue <= min || disabled,
        });
        const plusBtnCls = classNames('fta-input-number__btn', {
            'fta-input-number--disabled': inputValue >= max || disabled,
        });
        return (React.createElement(View, { className: rootCls, style: customStyle },
            React.createElement(Text, { className: minusBtnCls, onClick: this.handleClick.bind(this, 'minus') }, "-"),
            React.createElement(Input, { className: 'fta-input-number__input', style: inputStyle, type: type, value: String(inputValue), disabled: disabledInput || disabled, onInput: this.handleInput, onBlur: this.handleBlur }),
            React.createElement(Text, { className: plusBtnCls, onClick: this.handleClick.bind(this, 'plus') }, "+")));
    }
}
InputNumber.defaultProps = {
    customStyle: {},
    className: '',
    disabled: false,
    disabledInput: false,
    value: 1,
    type: 'number',
    width: 0,
    min: 0,
    max: 100,
    step: 1,
    size: 'normal',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { },
};
InputNumber.propTypes = {
    customStyle: PropTypes.object,
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['number', 'digit']),
    disabled: PropTypes.bool,
    width: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    size: PropTypes.oneOf(['normal', 'large']),
    disabledInput: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onErrorInput: PropTypes.func,
};

export { InputNumber as default };
