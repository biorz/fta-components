import './index.css';
import { View, Image } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Assets } from '../common';

class Curtain extends React.Component {
    onClose(e) {
        var _a;
        (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
        this.props.onClose(e);
    }
    _stopPropagation(e) {
        var _a;
        (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e);
    }
    render() {
        const { className, customStyle, isOpened, closeBtnPosition } = this.props;
        const curtainClass = classNames({
            'fta-curtain': true,
            'fta-curtain--closed': !isOpened,
        }, className);
        const btnCloseClass = classNames({
            'fta-curtain__btn-close': true,
            [`fta-curtain__btn-close--${closeBtnPosition}`]: closeBtnPosition,
        });
        return (React.createElement(View, { className: curtainClass, style: customStyle, onClick: this._stopPropagation },
            React.createElement(View, { className: 'fta-curtain__container' },
                React.createElement(View, { className: 'fta-curtain__body' },
                    this.props.children,
                    React.createElement(Image, { src: Assets.close.circle, className: btnCloseClass, onClick: this.onClose.bind(this) })))));
    }
}
Curtain.defaultProps = {
    customStyle: {},
    className: '',
    isOpened: false,
    closeBtnPosition: 'bottom',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => { },
};
Curtain.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    isOpened: PropTypes.bool,
    closeBtnPosition: PropTypes.string,
    onClose: PropTypes.func,
};

export { Curtain as default };
