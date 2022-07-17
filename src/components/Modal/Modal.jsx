import React, { Component } from 'react';
import { Overlay, ModalWrapper } from './Modal.styled';

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onImagesClick);
    }

    onImagesClick = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onImagesClick);
    }

    handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    };
    render() {
        return (
            <Overlay onClick={this.handleBackdropClick}>
                <ModalWrapper>
                    <img
                        src={this.props.onOpen.largeImageURL}
                        alt={this.props.onOpen.tags}
                    />
                </ModalWrapper>
            </Overlay>
        );
    }
}