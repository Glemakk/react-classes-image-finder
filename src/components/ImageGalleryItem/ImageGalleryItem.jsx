import React from 'react';
import { Item, ItemImg } from './ImageGalleryItem.styled';

function ImageGalleryItem({ card, onClick }) {
    return (
        <>
            <Item className="gallery-item">
                <ItemImg src={card.webformatURL}
                    alt={card.tags}
                    id={card.id}
                    onClick={() => onClick(card)} />
            </Item>
        </>
    );
}

export default ImageGalleryItem;