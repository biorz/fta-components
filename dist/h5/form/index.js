import './index.css';
import { View, Text, Input, ScrollView, Image } from '@tarojs/components';
import classNames from 'classnames';
import React, { Component, cloneElement, createContext, useContext, forwardRef, useState, useRef, useEffect, useImperativeHandle, Fragment, isValidElement } from 'react';
import { inRN, createSelectorQuery, isString, Assets, useEnhancedState, inDev, isUndef, isArray } from '../common';
import PropTypes from 'prop-types';

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

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === 'undefined') {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var i = 0;
  var len = args.length;

  if (typeof template === 'function') {
    return template.apply(null, args);
  }

  if (typeof template === 'string') {
    var str = template.replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;
      }
    });
    return str;
  }

  return template;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'date' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors || []);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}

var AsyncValidationError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(AsyncValidationError, _Error);

  function AsyncValidationError(errors, fields) {
    var _this;

    _this = _Error.call(this, 'Async Validation Error') || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }

  return AsyncValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function isErrorObj(obj) {
  return !!(obj && obj.message !== undefined);
}

function getValue(value, path) {
  var v = value;

  for (var i = 0; i < path.length; i++) {
    if (v == undefined) {
      return v;
    }

    v = v[path[i]];
  }

  return v;
}

function complementError(rule, source) {
  return function (oe) {
    var fieldValue;

    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }

    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      fieldValue: fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

var required$1 = function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

var whitespace = function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};

// https://github.com/kevva/url-regex/blob/master/index.js
var urlReg;
var getUrlRegex = (function () {
  if (urlReg) {
    return urlReg;
  }

  var word = '[a-fA-F\\d:]';

  var b = function b(options) {
    return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : '';
  };

  var v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';
  var v6seg = '[a-fA-F\\d]{1,4}';
  var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim(); // Pre-compile only the exact regexes because adding a global flag make regexes stateful

  var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
  var v4exact = new RegExp("^" + v4 + "$");
  var v6exact = new RegExp("^" + v6 + "$");

  var ip = function ip(options) {
    return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", 'g');
  };

  ip.v4 = function (options) {
    return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), 'g');
  };

  ip.v6 = function (options) {
    return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), 'g');
  };

  var protocol = "(?:(?:[a-z]+:)?//)";
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var ipv4 = ip.v4().source;
  var ipv6 = ip.v6().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
  urlReg = new RegExp("(?:^" + regex + "$)", 'i');
  return urlReg;
});

/* eslint max-len:0 */

var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function' && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    return typeof value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === 'string' && value.length <= 2048 && !!value.match(getUrlRegex());
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern$2.hex);
  }
};

var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required$1(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};

var range = function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};

var ENUM$1 = 'enum';

var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];

  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(', ')));
  }
};

var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};

var rules = {
  required: required$1,
  whitespace: whitespace,
  type: type$1,
  range: range,
  "enum": enumerable$1,
  pattern: pattern$1
};

var string = function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
};

var method = function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var number = function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var _boolean = function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var regexp = function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var integer = function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var floatFn = function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var array = function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if ((value === undefined || value === null) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (value !== undefined && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var object = function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var ENUM = 'enum';

var enumerable = function enumerable(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var pattern = function pattern(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var date = function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field); // console.log('validate on %s value', value);

  if (validate) {
    if (isEmptyValue(value, 'date') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'date')) {
      var dateObject;

      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
};

var required = function required(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
};

var type = function type(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var any = function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
};

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable,
  pattern: pattern,
  date: date,
  url: type,
  hex: type,
  email: type,
  required: required,
  any: any
};

function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

var Schema = /*#__PURE__*/function () {
  // ========================= Static =========================
  // ======================== Instance ========================
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }

  var _proto = Schema.prototype;

  _proto.define = function define(rules) {
    var _this = this;

    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    Object.keys(rules).forEach(function (name) {
      var item = rules[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };

  _proto.messages = function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  };

  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }

      return Promise.resolve(source);
    }

    function complete(results) {
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        } // Fill validator. Skip if nothing need to validate


        rule.validator = _this2.getValidationMethod(rule);

        if (!rule.validator) {
          return;
        }

        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullField(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errorList = Array.isArray(e) ? e : [e];

        if (!options.suppressWarning && errorList.length) {
          Schema.warning('async-validator:', errorList);
        }

        if (errorList.length && rule.message !== undefined) {
          errorList = [].concat(rule.message);
        } // Fill error info


        var filledErrors = errorList.map(complementError(rule, source));

        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }

        if (!deep) {
          doIt(filledErrors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message !== undefined) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }

            return doIt(filledErrors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            Object.keys(data.value).map(function (key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }

          fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function (field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema(paredFieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data.value, cb, data.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error); // rethrow to report error

          if (!options.suppressValidatorError) {
            setTimeout(function () {
              throw error;
            }, 0);
          }

          cb(error.message);
        }

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === 'function' ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    }, source);
  };

  _proto.getType = function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  };

  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || undefined;
  };

  return Schema;
}();

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;

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

const context = createContext({
    rules: {},
    __root__: false,
    _showModal() { },
    store: {
        __named__: [],
        __anonymous__: [],
    },
});
// const itemContext = createContext<>
/** 获取form表单基础配置 */
function useFormConfig() {
    const config = useContext(context);
    return config;
}
const { Provider: FormProvider, Consumer: FormConsumer } = context;

function FullScreen(props) {
    const { className, customStyle, children, onClick } = props;
    const rootClass = classNames('fta-form-full-screen', className);
    return (React.createElement(View, { className: rootClass, style: customStyle, onClick: onClick }, children));
}

const ScrollIntoView = (props) => (React.createElement(View, { id: props.id }, props.children));

const nullTimer = null;
const Captcha = forwardRef((props, ref) => {
    const { style, className, textClassName, textStyle, format, duration, text, onClick } = props;
    const [dura, setDura] = useState(duration + 1);
    const timerRef = useRef(nullTimer);
    const rootClass = classNames('fta-form-captcha', className);
    const textClass = classNames('fta-form-captcha__text', textClassName);
    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = nullTimer;
        }
    };
    const countdown = () => {
        resetTimer();
        setDura(duration);
        timerRef.current = setInterval(() => {
            setDura((val) => val - 1);
        }, 1000);
    };
    const onCountdown = () => __awaiter(void 0, void 0, void 0, function* () {
        if (dura && timerRef.current)
            return;
        // setDura(duration! - 1)
        if ((yield onClick()) !== false) {
            countdown();
        }
    });
    useEffect(() => resetTimer, []);
    useEffect(() => {
        if (!dura) {
            resetTimer();
            setDura(duration + 1);
        }
    }, [dura]);
    useImperativeHandle(ref, () => ({
        countdown,
        reset() {
            if (timerRef.current) {
                resetTimer();
                setDura(duration + 1);
            }
        },
    }));
    return (React.createElement(View, { className: rootClass, style: style, onClick: onCountdown },
        React.createElement(Text, { className: textClass, style: textStyle }, dura && timerRef.current ? format(dura) : text)));
});
Captcha.defaultProps = {
    duration: 60,
    text: '获取验证码',
    format: (dura) => `${dura}s`,
    onClick: () => { },
};

/** 是否未设置校验规则 */
const isEmptyRules = (rules) => !rules || !rules.length;
/** 生成唯一的key */
const uniqueId = (() => {
    let count = 0;
    return (prefix = '') => `${prefix}${++count}`;
})();
/** 解析函数类型的子组件 */
const parseChildren = (children, props) => (typeof children === 'function' ? children(props) : children);
/** 删除对象指定属性 */
const omit = (target, omitProps = []) => {
    omitProps.forEach((key) => delete target[key]);
    return target;
};

/**
 *  20220802 新增倒计时hook
 */
const justifyContentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    between: 'space-between',
};
/**
 * 校验优先级
 */
const validatePriority = {
    Higher: 0,
    High: 1,
    Normal: 2,
    Low: 3,
    Lower: 4,
};
/**
 * 校验状态
 */
const validateStatus = {
    unset: -1,
    error: 0,
    success: 1,
    validating: 2,
};
/** 是否校验出错 */
const inError = (status) => validateStatus.error === status;
/**
 * @component
 */
function Form(props, ref) {
    const { children, title, titleAlign, customStyle, className, labelStyle, labelClassName, contentClassName, contentStyle, readonly, align, rules, onMount, onDestroy, suspendOnFirstError, 
    // @ts-ignore
    style, placeholderTextColor, labelTextClassName, labelTextStyle, appearance, } = props;
    const [nodeId, scrollIntoView] = useState();
    const [visible, toggleVisible] = useState(false);
    const exampleRef = useRef();
    const _showModal = (example) => {
        exampleRef.current = example;
        toggleVisible(true);
    };
    const store = useRef({
        __named__: [],
        __anonymous__: [],
    }).current;
    const rootClass = classNames('fta-form', className);
    const refMethods = {
        validate(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                const { __anonymous__, __named__ } = store;
                // 获取所有的FormItemMethods
                const itemRefs = __named__.concat(__anonymous__);
                // 根据优先级排序
                itemRefs.sort((a, b) => a.current.priority - b.current.priority);
                const erroredPropMsgPairs = [];
                const erroredAnonymousPairs = [];
                let valid = true;
                for (const item of itemRefs) {
                    const { current: ref } = item;
                    const errMsg = yield ref.validateAsync();
                    if (errMsg != null) {
                        valid = false;
                        if (ref.prop) {
                            erroredPropMsgPairs.push([errMsg, ref.prop, item]);
                        }
                        else {
                            erroredAnonymousPairs.push([errMsg, item]);
                        }
                        // 校验出错，停止校验
                        if (suspendOnFirstError) {
                            callback === null || callback === void 0 ? void 0 : callback(valid, erroredPropMsgPairs, erroredAnonymousPairs);
                            return valid;
                        }
                    }
                }
                callback === null || callback === void 0 ? void 0 : callback(valid, erroredPropMsgPairs, erroredAnonymousPairs);
                return valid;
            });
        },
        highlight(prop, message, scrollIntoView) {
            const ref = refMethods.obtain(prop);
            ref === null || ref === void 0 ? void 0 : ref.current.highlight(message, scrollIntoView);
        },
        obtain(prop) {
            return store.__named__.find((ref) => ref.current.prop === prop);
        },
        clearValidate(props) {
            if (isUndef(props)) {
                const { __named__, __anonymous__ } = store;
                __named__.concat(__anonymous__).forEach((ref) => ref.current.clearValidate());
            }
            if (!isArray(props)) {
                props = [props];
            }
            props.forEach((prop) => {
                const ref = refMethods.obtain(prop);
                ref === null || ref === void 0 ? void 0 : ref.current.clearValidate();
            });
        },
        // TODO:
        resetFields() { },
        // TODO:
        validateField(_props, _callback) {
            return Promise.resolve();
        },
        // TODO:
        submit() { },
    };
    useImperativeHandle(ref, () => refMethods);
    useEffect(() => {
        !inRN && nodeId && setTimeout(scrollIntoView, 50);
    }, [nodeId]);
    return (React.createElement(FormProvider, { value: {
            appearance,
            rules,
            align,
            labelClassName,
            labelStyle,
            contentClassName,
            contentStyle,
            readonly,
            onMount,
            onDestroy,
            scrollIntoView,
            placeholderTextColor,
            labelTextClassName,
            labelTextStyle,
            /** @private */
            store,
            /** @private */
            _showModal,
            /** @private */
            __root__: true,
        } },
        React.createElement(ScrollView, { scrollY: true, scrollWithAnimation: true, scrollX: false, className: rootClass, scrollIntoView: nodeId, 
            // onScroll={onScroll}
            style: Object.assign(Object.assign({}, style), customStyle) },
            React.createElement(Title, { align: titleAlign }, title),
            children),
        visible ? (React.createElement(FullScreen, { className: 'fta-form-modal', onClick: () => toggleVisible(false) },
            React.createElement(Text, { className: 'fta-form-modal__text' }, "\u70B9\u51FB\u4EFB\u610F\u533A\u57DF\u5173\u95ED"),
            isString(exampleRef.current) ? (React.createElement(Image, { src: exampleRef.current, mode: 'aspectFit', className: 'fta-form-modal__image' })) : (exampleRef.current))) : null));
}
// FIXME: iOS RN 中 tooltip 图标溢出父容器
// const rnLabelClz = inRN ? 'fta-form-item-label--hack' : null
const initialFormItemState = {
    status: validateStatus.unset,
    message: null,
};
/**
 * @component
 */
function FormItem(props, ref) {
    const { label, value, required, prop, children, render, errorTip, 
    // @ts-ignore
    style, validatePriority, align, readonly, rules, onMount, onDestroy, onItemClick, appearance,
    /* exclude props */
    // prop,
    // value,
    // required,
    // rules,
    // onMount,
    // onDestroy,
    // validatePriority,
    /* unused props */
    // tooltip,
    // tooltipIcon,
    // onLabelClick,
    // onClick,
    // labelClassName,
    // labelStyle,
    // contentClassName,
    // contentStyle,
    // placeholder,
    // arrow,
    // className,
    // customStyle,
     } = props;
    const _children = render || children;
    const scrollRef = useRef();
    const ctx = useFormConfig();
    const model = { ctx };
    const Appearance = appearance || ctx.appearance;
    const formItemId = useRef(inRN ? void 0 : prop ? `fta-form-item-${prop}` : uniqueId('fta-form-item-')).current;
    const [state, setState] = useEnhancedState(initialFormItemState);
    const refMethods = {
        prop: prop,
        priority: validatePriority,
        getRules: (_rules) => _rules || rules || (prop && ctx.rules[prop]) || [],
        getValue() {
            if (value == null && prop && model) {
                return model[prop];
            }
            return value;
        },
        scrollIntoView() {
            var _a, _b;
            inRN ? (_b = (_a = scrollRef.current).scrollIntoView) === null || _b === void 0 ? void 0 : _b.call(_a) : ctx.scrollIntoView(formItemId);
        },
        highlight(message, scrollIntoView = true) {
            setState({
                status: validateStatus.error,
                message: message || errorTip,
            });
            scrollIntoView && setTimeout(methodsRef.current.scrollIntoView, 200);
        },
        validate(callback, rules) {
            rules = refMethods.getRules(rules);
            if (isEmptyRules(rules) && isUndef(required)) {
                callback();
                return;
            }
            setState('status', validateStatus.validating);
            const key = prop || 'value';
            const descriptor = {
                [key]: rules,
            };
            const model = {
                [key]: refMethods.getValue(),
            };
            const validator = new Schema(descriptor);
            validator.validate(model, { firstFields: true }, (errors) => {
                var _a;
                const status = errors ? validateStatus.error : validateStatus.success;
                const message = ((_a = errors === null || errors === void 0 ? void 0 : errors[0]) === null || _a === void 0 ? void 0 : _a.message) || null;
                setState({ status, message });
                callback(message);
            });
        },
        validateAsync() {
            return new Promise((resolve) => refMethods.validate((message) => resolve(message)));
        },
        clearValidate() {
            setState(initialFormItemState);
        },
    };
    const methodsRef = useRef(refMethods);
    const errored = inError(state.status);
    // 保证能取到最新的refMethods
    useEffect(() => {
        methodsRef.current = refMethods;
    });
    /**
     * 监听FormItem的生命周期
     */
    useEffect(() => {
        var _a;
        if (inDev && !ctx.__root__) {
            console.log(`[FTA View Warning]: FormItem ${label ? label : prop ? prop : ''} 没有被Form包裹，请检查`);
        }
        // collect dep
        const key = prop ? '__named__' : '__anonymous__';
        ctx.store[key].push(methodsRef);
        (_a = ctx.onMount) === null || _a === void 0 ? void 0 : _a.call(ctx, methodsRef);
        onMount === null || onMount === void 0 ? void 0 : onMount(methodsRef);
        return () => {
            var _a;
            // remove dep
            const i = ctx.store[key].indexOf(methodsRef);
            if (i > -1)
                ctx.store[key].splice(i, 1);
            (_a = ctx.onDestroy) === null || _a === void 0 ? void 0 : _a.call(ctx, methodsRef);
            onDestroy === null || onDestroy === void 0 ? void 0 : onDestroy(methodsRef);
        };
    }, []);
    useImperativeHandle(ref, () => refMethods);
    const _align = align || ctx.align;
    // 是否标记为只读
    const _readonly = readonly === false ? false : readonly || ctx.readonly;
    const getParsedChildren = () => parseChildren(_children, omit(Object.assign(Object.assign({}, props), { align: _align, readonly: _readonly, error: errored, errorTip: state.message, itemRef: methodsRef }), [
        // 删除一些常用的属性，提升性能
        'className',
        'customStyle',
        'onClick',
        'onMount',
        'onDestroy',
        'inputProps',
        'render',
        'children',
    ]));
    if (isUndef(label)) {
        return (React.createElement(ScrollIntoView, { ref: inRN ? scrollRef : void 0, id: formItemId },
            React.createElement(View, { onClick: onItemClick }, getParsedChildren())));
    }
    return (React.createElement(ScrollIntoView, { ref: inRN ? scrollRef : void 0, id: formItemId },
        React.createElement(Appearance, Object.assign({}, omit(Object.assign(Object.assign({}, props), { error: errored, errorTip: state.message, itemRef: methodsRef }), [
            'prop',
            // 'value',
            // 'required',
            'rules',
            'onMount',
            'onDestroy',
            'validatePriority',
        ])), getParsedChildren())));
}
/** FormItem UI容器 */
function FormItemAppearance(props) {
    const ctx = useFormConfig();
    const { label, className, customStyle, tooltip, tooltipIcon, itemRef, children, render, 
    // prop,
    value, format, required, 
    // rules,
    // onMount,
    // onDestroy,
    // validatePriority,
    readonly, placeholder, arrow, 
    // @ts-ignore
    style, error, errorTip, align, onLabelClick, onClick, onItemClick, labelClassName, labelStyle, contentClassName, contentStyle, inputRef, inputProps, placeholderTextColor, 
    // hackColor,
    suffix, labelTextStyle, labelTextClassName, _nativeRef, } = props;
    const _inputRef = useRef();
    const _children = render || children;
    const _align = align || ctx.align;
    // TODO: 是否标记为只读
    const _readonly = readonly === false ? false : readonly || ctx.readonly;
    const readonlyFn = (fn) => (_readonly ? void 0 : fn);
    const rootClass = classNames('fta-form-item', className);
    const rootStyle = Object.assign(Object.assign({}, style), customStyle);
    const _labelClassName = classNames('fta-form-item-label', 
    // tooltip && rnLabelClz,
    ctx.labelClassName, labelClassName);
    const _contentClassName = classNames('fta-form-item-content', ctx.contentClassName, contentClassName, error && 'fta-form-item-content--error');
    const _labelStyle = Object.assign(Object.assign({}, ctx.labelStyle), labelStyle);
    const _contentStyle = Object.assign(Object.assign(Object.assign({}, (_align ? { justifyContent: justifyContentMap[_align] } : {})), ctx.contentStyle), contentStyle);
    const _labelTextClass = classNames('fta-form-item-label__text', ctx.labelTextClassName, labelTextClassName);
    const _labelTextStyle = Object.assign(Object.assign({}, ctx.labelTextStyle), labelTextStyle);
    // WARNING: 必须先执行onLabelClick事件（DONE!）
    const _onLabelCick = () => {
        if ((onLabelClick === null || onLabelClick === void 0 ? void 0 : onLabelClick()) !== false && tooltip) {
            ctx._showModal(tooltip);
        }
    };
    const _onContentClick = () => {
        var _a, _b;
        if ((onClick === null || onClick === void 0 ? void 0 : onClick()) !== false) {
            inRN && ((_b = (_a = _inputRef.current) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a));
        }
    };
    const labelHoverClass = !_readonly && (tooltip || onLabelClick) ? 'fta-form-item-content--hover' : void 0;
    const contentHoverClass = _readonly ? void 0 : 'fta-form-item-content--hover';
    const placeholderColor = placeholderTextColor || ctx.placeholderTextColor;
    const _value = (itemRef === null || itemRef === void 0 ? void 0 : itemRef.current.getValue()) || value;
    const _formatValue = format ? format(_value) : _value;
    const alignStyle = {
        textAlign: _align === 'between' ? 'left' : _align || 'right',
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(View, { className: rootClass, style: rootStyle, onClick: readonlyFn(onItemClick) },
            React.createElement(View, { className: _labelClassName, style: _labelStyle, onClick: readonlyFn(_onLabelCick), hoverClass: labelHoverClass, 
                // @ts-ignore
                hoverClassName: labelHoverClass },
                required && !_readonly ? React.createElement(Text, { className: 'fta-form-item-label__required' }, "*") : null,
                React.createElement(Text, { className: _labelTextClass, style: _labelTextStyle }, label),
                tooltip && !_readonly ? React.createElement(ToolTip, { tooltipIcon: tooltipIcon }) : null),
            React.createElement(View, { style: _contentStyle, className: _contentClassName, onClick: readonlyFn(_onContentClick), 
                //@ts-ignore
                hoverClassName: contentHoverClass, hoverClass: contentHoverClass },
                _children == null ? (_readonly || (arrow && arrow !== 'arrow') ? (
                // 加入placeholder
                (_formatValue == null || !String(_formatValue).length) &&
                    placeholder &&
                    !_readonly ? (React.createElement(Placeholder, { style: alignStyle }, placeholder)) : (React.createElement(Text, { style: alignStyle, className: 'fta-form-item-content__text' }, _formatValue))) : (React.createElement(Fragment, null,
                    React.createElement(BuiltinInput
                    // @ts-ignore
                    , Object.assign({ 
                        // @ts-ignore
                        ref: inputRef, _nativeRef: (ref) => {
                            _inputRef.current = ref;
                            // 暴露出ref引用
                            if (_nativeRef) {
                                _nativeRef.current = ref;
                            }
                        }, placeholder: placeholder, style: alignStyle, value: _value, 
                        // @ts-ignore
                        placeholderTextColor: placeholderColor }, inputProps))))) : isString(_children) ? (!_children.length && placeholder && !_readonly ? (React.createElement(Placeholder, { style: alignStyle }, placeholder)) : (React.createElement(Text, { style: alignStyle, className: 'fta-form-item-content__text' }, _children))) : (_children)
            // isUndef(_children) ? (
            //   placeholder && !_readonly ? (
            //     <Placeholder>{placeholder}</Placeholder>
            //   ) : null
            // ) :
            ,
                isString(suffix) ? (React.createElement(Text, { className: 'fta-form-item-content__suffix' }, suffix)) : (suffix),
                arrow && !_readonly ? isValidElement(arrow) ? arrow : React.createElement(Arrow, null) : null)),
        React.createElement(View, null, error && errorTip ? (React.createElement(View, { className: 'fta-form-item-error' },
            React.createElement(View, { className: 'fta-form-item-error-wrap' },
                React.createElement(ErrorIcon, null),
                " ",
                React.createElement(Text, { className: 'fta-form-item-error__text' }, errorTip)))) : null)));
}
/** 标题 */
function Title(props) {
    const { children: title, align: titleAlign } = props;
    return title ? (React.createElement(View, { className: 'fta-form-title', style: { textAlign: titleAlign } }, isString(title) ? (React.createElement(Text, { className: 'fta-form-title__text', style: { textAlign: titleAlign } }, title)) : (title))) : null;
}
/** 提示图标 */
function ToolTip(props) {
    const { tooltipIcon } = props;
    return isString(tooltipIcon) ? (React.createElement(Image, { className: 'fta-form-item-tooltip', src: tooltipIcon })) : (tooltipIcon);
}
/** 内置输入框 */
const BuiltinInput = forwardRef(function _BuiltinInput(props, ref) {
    const { className, style, placeholderClass, value } = props, extraProps = __rest(props, ["className", "style", "placeholderClass", "value"]);
    const isEmpty = value == null || (isString(value) && !value.length);
    const rootClass = classNames('fta-form-item-input', 'fta-form-item-content__text', isEmpty && 'fta-form-item-input--empty', inRN || 'fta-form-item-input--nrn', className);
    const placeClass = classNames('fta-form-item-placeholder', placeholderClass);
    return (React.createElement(Input
    // @ts-ignore
    , Object.assign({ 
        // @ts-ignore
        numberOfLines: 1, className: rootClass, style: style, placeholderClass: placeClass, value: value, ref: ref }, extraProps)));
});
/** rn input hack,遮挡住第二行 */
// function HackView(props: { color?: string }): JSX.Element | null {
//   if (inRN) {
//     return (
//       <View
//         style={props.color ? { backgroundColor: props.color } : void 0}
//         className='fta-form-item-input-hack'
//         // @ts-ignore
//         pointerEvents='none'
//       />
//     )
//   }
//   return null
// }
/** 占位文本 */
function Placeholder(props) {
    const { children, style } = props;
    return isString(children) ? (React.createElement(Text, { style: style, className: 'fta-form-item-placeholder' }, children)) : children;
}
/** 箭头 */
function Arrow() {
    return React.createElement(Image, { className: 'fta-form-item-arrow', src: Assets.arrow.grey });
}
/** 错误图标 */
function ErrorIcon() {
    return React.createElement(Image, { className: 'fta-form-item-error-icon', src: Assets.icon.warning });
}
/** 间隔 */
function Gap() {
    return React.createElement(View, { className: 'fta-form-item-gap' });
}
// TODO:单选框组件
// function Radio(props: FormRadioProps) {
//   const { value, style, customStyle, className } = props
// }
/** 重新上传Tip */
function Tip(props) {
    const { onClick, button, title, className, customStyle, 
    // @ts-ignore
    style, } = props;
    const rootClass = classNames('fta-form-tip', className);
    const rootStyle = Object.assign(Object.assign({}, style), { customStyle });
    return (React.createElement(View, { className: rootClass, style: rootStyle },
        React.createElement(View, { className: 'fta-form-tip-content' },
            React.createElement(Image, { className: 'fta-form-tip__image', src: Assets.tip.info }),
            isString(title) ? React.createElement(Text, { className: 'fta-form-tip__text' }, title) : title),
        React.createElement(TouchableOpacity, { className: 'fta-form-tip__button', onClick: onClick },
            React.createElement(Text, { className: 'fta-form-tip__button__text' }, button))));
}
Tip.defaultProps = {
    button: '重新上传',
    title: '如需更新证件信息，请重新上传',
};
const tooltipDefaultProps = {
    tooltipIcon: Assets.icon.question,
};
const formDefaultProps = {
    placeholderTextColor: '#cccccc',
    rules: {},
    model: {},
    titleAlign: 'left',
    appearance: FormItemAppearance,
};
const formItemDefaultProps = {
    placeholderTextColor: '#cccccc',
    validatePriority: validatePriority.Normal,
    onClick() { },
};
ToolTip.defaultProps = tooltipDefaultProps;
const ForwardForm = forwardRef(Form);
const FowardFormItem = forwardRef(FormItem);
ForwardForm.defaultProps = formDefaultProps;
FowardFormItem.defaultProps = formItemDefaultProps;
FormItemAppearance.defaultProps = {
    errorTip: '信息填写错误',
};
/** Extend Form */
ForwardForm.Item = FowardFormItem;
ForwardForm.Captcha = Captcha;
ForwardForm.ItemView = FormItemAppearance;
ForwardForm.Input = BuiltinInput;
ForwardForm.Gap = Gap;
ForwardForm.Tip = Tip;
ForwardForm.ValidatePriority = validatePriority;
ForwardForm.ValidateStatus = validateStatus;
ForwardForm.AsyncValidator = Schema;

export { FowardFormItem as FormItem, ForwardForm as default };
