import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import Button from './components/Button';
import Modal from './components/Modal/Modal';
import ImageAPI from './services/image-api';

export default class App extends Component {
  state = {
    searchImage: null,
    image: [],
    loading: false,
    page: 1,
    showModal: false,
    largeImage: '',
    error: null,
  };

  handleSearchSubmit = image => {
    this.setState({ searchImage: image, page: 1, image: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchImage !== this.state.searchImage ||
      prevState.page !== this.state.page) {
      this.setState({ loading: true });
      ImageAPI
        .fetchImages(this.state.searchImage, this.state.page)
        .then(image => this.setState(prevState => ({ image: [ ...prevState.image, ...image.hits ] })))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  };

  modalShow = (data) => {
    this.setState({ showModal: true, largeImage: data });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { loading, image, page, showModal, largeImage, error } = this.state;

    return (
      <div className='app'>
        {error && <h1>{error.message}</h1>}
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {loading && <Loader />}
        <ImageGallery images={image} onClick={this.modalShow} />
        {image.length > 1 && <Button page={page} onClick={this.onLoadMore} />}
        {showModal && <Modal onClose={this.hideModal} onOpen={largeImage} />}
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }
}
