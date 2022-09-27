import './index.css';
import { View, ScrollView, Text, Button } from '@tarojs/components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { isString, handleTouchScroll, inWeb } from '../common';

class ModalAction extends React.Component {
    render() {
        const rootClass = classNames('fta-modal__footer', {
            'fta-modal__footer--simple': this.props.isSimple,
        }, this.props.className);
        const rootStyle = Object.assign(Object.assign({}, this.props.style), this.props.customStyle);
        return (React.createElement(View, { className: rootClass, style: rootStyle },
            React.createElement(View, { className: 'fta-modal__action' }, this.props.children)));
    }
}
ModalAction.defaultProps = {
    isSimple: false,
};
ModalAction.propTypes = {
    isSimple: PropTypes.bool,
};

class ModalContent extends React.Component {
    render() {
        const { withTitle, className, style, customStyle, children } = this.props;
        const rootClass = classNames('fta-modal__content', withTitle || 'fta-modal__content--no-title', className);
        const rootStyle = Object.assign(Object.assign({}, style), customStyle);
        return (React.createElement(ScrollView, { scrollY: true, 
            // @ts-ignore
            alwaysBounceVertical: false, className: rootClass, style: rootStyle }, children));
    }
}
ModalContent.defaultProps = {
    withTitle: true,
};

class ModalHeader extends React.Component {
    render() {
        const { className, 
        // @ts-ignore
        style, customStyle, children, } = this.props;
        const rootClass = classNames('fta-modal__header', className);
        return (React.createElement(View, { className: rootClass, style: style }, isString(children) ? (React.createElement(Text, { style: customStyle, className: 'fta-modal__header-text' }, children)) : (children)));
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOverlay = () => {
            if (this.props.closeOnClickOverlay) {
                this.setState({
                    _isOpened: false,
                }, this.handleClose);
            }
        };
        this.handleClose = (event) => {
            if (typeof this.props.onClose === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.props.onClose(event);
            }
        };
        this.handleCancel = (event) => {
            if (typeof this.props.onCancel === 'function') {
                this.props.onCancel(event);
            }
        };
        this.handleConfirm = (event) => {
            if (typeof this.props.onConfirm === 'function') {
                this.props.onConfirm(event);
            }
        };
        this.handleTouchMove = (e) => {
            e.stopPropagation();
        };
        const { isOpened } = props;
        this.state = {
            _isOpened: isOpened,
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isOpened } = nextProps;
        if (this.props.isOpened !== isOpened) {
            handleTouchScroll(isOpened);
        }
        if (isOpened !== this.state._isOpened) {
            this.setState({
                _isOpened: isOpened,
            });
        }
    }
    render() {
        const { _isOpened } = this.state;
        const { title, content, cancelText, confirmText, containerClassName, containerStyle, overlayClassName, overlayStyle, contentAlign, contentClassName, contentStyle, } = this.props;
        const rootClass = classNames('fta-modal', {
            'fta-modal--active': _isOpened,
        }, this.props.className);
        const containerClz = classNames('fta-modal__container', containerClassName);
        const overlay = (React.createElement(View, { onClick: this.handleClickOverlay, style: overlayStyle, className: classNames('fta-modal__overlay', overlayClassName) }));
        if (title || content) {
            const isRenderAction = cancelText || confirmText;
            return (React.createElement(View, { className: rootClass },
                overlay,
                React.createElement(View, { className: containerClz, style: containerStyle },
                    title && React.createElement(ModalHeader, null, title),
                    content && (React.createElement(ModalContent, { withTitle: !!title, className: contentClassName, style: contentStyle },
                        React.createElement(View, { className: classNames('content-simple', `content-simple--${contentAlign}`) }, inWeb ? (React.createElement(Text, { className: 'content-simple__text', 
                            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                            // @ts-ignore
                            dangerouslySetInnerHTML: {
                                __html: content.replace(/\n/g, '<br/>'),
                            } })) : (React.createElement(Text, { className: 'content-simple__text' }, content))))),
                    isRenderAction && (React.createElement(ModalAction, { isSimple: true },
                        cancelText && (React.createElement(Button, { onClick: this.handleCancel, className: 'fta-modal__action__button fta-modal__action__button--cancel' }, cancelText)),
                        confirmText && (React.createElement(Button, { onClick: this.handleConfirm, className: 'fta-modal__action__button fta-modal__action__button--confirm' }, confirmText)))))));
        }
        return (React.createElement(View, { onTouchMove: this.handleTouchMove, className: rootClass },
            overlay,
            React.createElement(View, { className: containerClz, style: containerStyle }, this.props.children)));
    }
}
Modal.defaultProps = {
    isOpened: false,
    closeOnClickOverlay: false,
    contentAlign: 'center',
};
Modal.propTypes = {
    title: PropTypes.string,
    isOpened: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    content: PropTypes.string,
    closeOnClickOverlay: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
};

export { Modal, ModalAction, ModalContent, ModalHeader, Modal as default };
