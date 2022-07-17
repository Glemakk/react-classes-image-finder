import React from 'react';

const Button = ({ onClick, page }) => {
    if (page > 1) {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    }
    return (
        <button type='button' onClick={onClick}>Load more</button>
    );
};

export default Button;