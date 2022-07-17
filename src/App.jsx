import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import Button from './components/Button';
import Modal from './components/Modal/Modal';

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
      fetch(`https://pixabay.com/api/?q=${this.state.searchImage}&page=${this.state.page}&key=21790462-d81f7d941fc30814a1e9b910b&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`Word ${this.state.searchImage} is not exist`),
          );
        })
        .then(image => this.setState(prevState => ({ image: [ ...prevState.image, ...image.hits ] })))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(`https://pixabay.com/api/?q=${this.state.searchImage}&page=1&key=21790462-d81f7d941fc30814a1e9b910b&image_type=photo&orientation=horizontal&per_page=12`)
  //     .then(res => res.json()).then(image => this.setState({ image })).finally(() => this.setState({ loading: false }));
  // }

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
    const { loading, image, page, showModal, largeImage, error, searchImage } = this.state;

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
