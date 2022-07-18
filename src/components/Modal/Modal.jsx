import { useEffect } from 'react';
import { Overlay, ModalWrapper } from './Modal.styled';

const Modal = ({ onClose, onOpen }) => {


    useEffect(() => {
        const onImagesClick = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', onImagesClick);
        return () => {
            window.removeEventListener('keydown', onImagesClick);
        };

    }, [ onClose ]);


    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };
    return (
        <Overlay onClick={handleBackdropClick}>
            <ModalWrapper>
                <img
                    src={onOpen.largeImageURL}
                    alt={onOpen.tags}
                />
            </ModalWrapper>
        </Overlay>
    );
};

export default Modal;