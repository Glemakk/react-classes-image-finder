import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

function ImageGallery({ images, onClick }) {
    return (
        <List >
            {images && images.map(img => (
                <ImageGalleryItem key={img.id} card={img} onClick={onClick} />
            ))}
        </List>
    );
};

export default ImageGallery;