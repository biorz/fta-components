import './index.css';
import { View, Switch as Switch$1, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { inRN, Themes, isString } from '../common';

class Switch extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            checked: !!this.props.checked,
        };
        this.handleChange = (event) => {
            const { value, checked } = event.detail;
            const state = typeof value === 'undefined' ? checked : value;
            this.setState({ checked: state }, () => {
                var _a, _b;
                (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, state);
            });
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.checked === this.state.checked &&
            prevProps.checked !== this.props.checked &&
            this.state.checked !== this.props.checked) {
            // console.log('切换')
            const willChecked = !!this.props.checked;
            this.setState({
                checked: willChecked,
            }, () => {
                var _a, _b;
                // RN端逻辑修复
                (_b = (_a = this.$ref) === null || _a === void 0 ? void 0 : _a.onCheckedChange) === null || _b === void 0 ? void 0 : _b.call(_a, willChecked);
            });
        }
    }
    render() {
        const { customStyle, className, disabled, border, title, color, rnProps } = this.props;
        const rootCls = classNames('fta-switch', {
            'fta-switch--without-border': !border,
        }, className);
        const containerCls = classNames('fta-switch__container', {
            'fta-switch--disabled': disabled,
        });
        const swithStyle = inRN
            ? {
                backgroundColor: this.state.checked ? color : disabled ? '#ccc' : '#efefef',
            }
            : {};
        const extraProps = inRN
            ? {
                width: 52,
                height: 32,
            }
            : {};
        const switchClz = classNames('fta-switch__switch', disabled && 'switch--disabled');
        const switchElm = (React.createElement(View, { className: containerCls },
            disabled && React.createElement(View, { className: 'fta-switch__mask' }),
            React.createElement(Switch$1, Object.assign({ ref: (ref) => (this.$ref = ref), style: swithStyle, disabled: disabled, className: switchClz, checked: this.state.checked, color: inRN ? Themes.color.white : color, onChange: this.handleChange }, extraProps, (inRN ? rnProps : {})))));
        if (!title)
            return switchElm;
        return (React.createElement(View, { className: rootCls, style: customStyle },
            isString(title) ? React.createElement(Text, { className: 'fta-switch__title' }, title) : title,
            switchElm));
    }
}
Switch.defaultProps = {
    customStyle: {},
    className: '',
    title: '',
    color: Themes.color.brand,
    border: true,
    disabled: false,
    checked: false,
    rnProps: {},
};
Switch.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    title: PropTypes.string,
    color: PropTypes.string,
    checked: PropTypes.bool,
    border: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    rnProps: PropTypes.object,
};

export { Switch as default };
