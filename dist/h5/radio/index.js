import './index.css';
import { View, Image, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { isUndef, Assets } from '../common';

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(idx) {
        const option = this.props.options[idx];
        const { disabled, value } = option;
        if (disabled)
            return;
        this.props.onClick(value);
    }
    render() {
        const { customStyle, 
        // @ts-ignore
        style, className, options, icon, disabledIcon, selectedIcon, selectedDidsabledIcon, type, value, } = this.props;
        const rootCls = classNames('fta-radio', `fta-radio--${type}`, className);
        return (React.createElement(View, { className: rootCls, style: Object.assign(Object.assign({}, style), customStyle) }, options.map((option, idx) => {
            let presentIcon;
            const { disabled, label, desc } = option;
            const selected = value === option.value;
            if (selected) {
                presentIcon = disabled ? selectedDidsabledIcon : selectedIcon;
            }
            else {
                presentIcon = disabled ? disabledIcon : icon;
            }
            const optionCls = classNames('fta-radio__option', `fta-radio__option--${type}`, {
                'fta-radio__option--disabled': disabled,
                'fta-radio__option--selected': selected,
            });
            const iconCntCls = classNames('fta-radio__icon-cnt', `fta-radio__icon-cnt--${type}`, {
                'fta-radio__icon-cnt--selected': selected,
                'fta-radio__icon-cnt--disabled': disabled,
            });
            const titleClz = classNames('fta-radio__title', selected && 'fta-radio__title--selected', disabled && 'fta-radio__title--disabled');
            const descClz = classNames('fta-radio__desc', selected && 'fta-radio__desc--selected', disabled && 'fta-radio__desc--disabled');
            return (React.createElement(View, { className: optionCls, key: idx, onClick: () => this.handleClick(idx) },
                isUndef(presentIcon) ? (React.createElement(View, { className: iconCntCls },
                    React.createElement(Image, { className: 'fta-radio-icon', src: Assets.check.default }))) : (presentIcon),
                React.createElement(View, { className: 'fta-radio-content' },
                    React.createElement(Text, { className: titleClz }, label),
                    desc && React.createElement(Text, { className: descClz }, desc))));
        })));
    }
}
function SimpleRadio(props) {
    const { active, disabled, icon, disabledIcon, selectedIcon, selectedDidsabledIcon, controlled, onChange, children, } = props;
    const [_active, setActive] = useState(active);
    const checked = controlled ? active : _active;
    const onClick = () => {
        if (disabled)
            return;
        if (!controlled) {
            setActive(!checked);
        }
        onChange(!checked);
    };
    let presentIcon;
    if (checked) {
        presentIcon = disabled ? selectedDidsabledIcon || selectedIcon : selectedIcon;
    }
    else {
        presentIcon = disabled ? disabledIcon || icon : icon;
    }
    const rootClass = classNames('fta-radio-simple-container', disabled &&
        (presentIcon === icon || presentIcon === selectedIcon) &&
        'fta-radio-simple-container--disabled');
    return (React.createElement(View, { className: rootClass, onClick: onClick },
        presentIcon,
        children));
    // return <View className='fta-radio-simple' />
}
const simpleRadioImage = React.createElement(Image, { className: 'fta-radio-simple-image', src: Assets.check.default });
SimpleRadio.defaultProps = {
    icon: React.createElement(View, { className: 'fta-radio-simple fta-radio-simple--normal' }),
    selectedIcon: (React.createElement(View, { className: 'fta-radio-simple fta-radio-simple--selected' }, simpleRadioImage)),
    onChange() { },
};
Radio.defaultProps = {
    customStyle: {},
    className: '',
    options: [],
    value: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick: () => { },
    type: 'left',
};
Radio.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    options: PropTypes.array,
    onClick: PropTypes.func,
};
Radio.Simple = SimpleRadio;

export { Radio as default };
