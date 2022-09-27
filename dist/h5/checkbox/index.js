import './index.css';
import { View, Image, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { isUndef, Assets } from '../common';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(idx) {
        const { selectedList, options } = this.props;
        const option = options[idx];
        const { disabled, value } = option;
        if (disabled)
            return;
        const selectedSet = new Set(selectedList);
        if (!selectedSet.has(value)) {
            selectedSet.add(value);
        }
        else {
            selectedSet.delete(value);
        }
        this.props.onChange([...selectedSet]);
    }
    render() {
        const { customStyle, 
        // @ts-ignore
        style, className, options, selectedList, icon, disabledIcon, selectedIcon, selectedDidsabledIcon, type, } = this.props;
        const rootCls = classNames('fta-checkbox', `fta-checkbox--${type}`, className);
        return (React.createElement(View, { className: rootCls, style: Object.assign(Object.assign({}, style), customStyle) }, options.map((option, idx) => {
            let presentIcon;
            const { value, disabled, label, desc } = option;
            const selected = selectedList.includes(value);
            if (selected) {
                presentIcon = disabled ? selectedDidsabledIcon : selectedIcon;
            }
            else {
                presentIcon = disabled ? disabledIcon : icon;
            }
            const optionCls = classNames('fta-checkbox__option', `fta-checkbox__option--${type}`, {
                'fta-checkbox__option--disabled': disabled,
                'fta-checkbox__option--selected': selected,
            });
            const iconCntCls = classNames('fta-checkbox__icon-cnt', `fta-checkbox__icon-cnt--${type}`, {
                'fta-checkbox__icon-cnt--selected': selected,
                'fta-checkbox__icon-cnt--disabled': disabled,
            });
            const titleClz = classNames('fta-checkbox__title', selected && 'fta-checkbox__title--selected', disabled && 'fta-checkbox__title--disabled');
            const descClz = classNames('fta-checkbox__desc', selected && 'fta-checkbox__desc--selected', disabled && 'fta-checkbox__desc--disabled');
            return (React.createElement(View, { className: optionCls, key: value, onClick: () => this.handleClick(idx) },
                isUndef(presentIcon) ? (React.createElement(View, { className: iconCntCls },
                    React.createElement(Image, { className: 'fta-checkbox-icon', src: Assets.check.default }))) : (presentIcon),
                React.createElement(View, { className: 'fta-checkbox-content' },
                    React.createElement(Text, { className: titleClz }, label),
                    desc && React.createElement(Text, { className: descClz }, desc))));
        })));
    }
}
Checkbox.defaultProps = {
    customStyle: {},
    className: '',
    options: [],
    selectedList: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { },
    type: 'left',
};
Checkbox.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    options: PropTypes.array,
    selectedList: PropTypes.array,
    onChange: PropTypes.func,
};

export { Checkbox as default };
