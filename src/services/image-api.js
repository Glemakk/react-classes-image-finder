import React from 'react';

function fetchImages(searchImage, page) {
    return (
        fetch(`https://pixabay.com/api/?q=${searchImage}&page=${page}&key=21790462-d81f7d941fc30814a1e9b910b&image_type=photo&orientation=horizontal&per_page=12`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Word ${searchImage} is not exist`),
                );
            })
    );
}
const api = { fetchImages };
export default api;