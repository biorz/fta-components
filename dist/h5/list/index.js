import './index.css';
import { View, Image, Text } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { px, ConfigConsumer, useClassesWithCare, inRN, Assets } from '../common';

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

export { List, ListItem, List as default };
