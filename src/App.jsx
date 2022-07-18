import { useState } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import Button from './components/Button';
import Modal from './components/Modal/Modal';
import ImageAPI from './services/image-api';
import { useEffect } from 'react/cjs/react.development';
import FriendsUseMemo from './components/FriendsUseMemo';


const App = () => {
  const [ searchImage, setSearchImage ] = useState('');
  const [ image, setImage ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ showModal, setShowModal ] = useState(false);
  const [ largeImage, setLargeImage ] = useState('');
  const [ error, setError ] = useState(null);

  const handleSearchSubmit = image => {
    setSearchImage(image);
    setPage(1);
    setImage([]);
  };

  //// Для fetch можно просто проверить на поисковое слово. Если пустая строка, то return
  useEffect(() => {
    if (searchImage === '') {
      return;
    }

    setLoading(true);
    ImageAPI
      .fetchImages(searchImage, page)
      .then(image => setImage(prevState => [ ...prevState, ...image.hits ]))
      .catch(error => setError(error))
      .finally(() => setLoading(false));

    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: "smooth",
    // });
  }, [ page, searchImage ]);

  //// Если необходимо просто пропустить первый рендер можно просто использовать useRef
  // export default function SkipEffectOnFirstRender() {
  //   const [count, setCount] = useState(0);
  //   const isFirstRender = useRef(true);

  //   useEffect(() => {
  //     if (isFirstRender.current) {
  //       isFirstRender.current = false;
  //       return;
  //     }

  //     console.log(`Выполняется useEffect - ${Date.now()}`);
  //   });

  //   return (
  //     <div>
  //       <button onClick={() => setCount(c => c + 1)}>{count}</button>
  //       <p>
  //         <code style={styles.code}>useEffect</code> этого компонента не
  //         выполняется на первом рендере
  //       </p>
  //     </div>
  //   );
  // }


  const onLoadMore = () => {
    setPage(prevState => prevState + 1
    );
  };

  const modalShow = (data) => {
    setShowModal(true);
    setLargeImage(data);
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: "smooth",
    // });
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className='app'>
      {error && <h1>{error.message}</h1>}
      <Searchbar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      <ImageGallery images={image} onClick={modalShow} />
      {image.length > 1 && <Button page={page} onClick={onLoadMore} />}
      {showModal && <Modal onClose={hideModal} onOpen={largeImage} />}
      <ToastContainer position="top-center" autoClose={2000} />
      {/* <FriendsUseMemo /> */}
    </div>
  );
};

export default App;
// export default class oldApp extends Component {

//   state = {
//     searchImage: null,
//     image: [],
//     loading: false,
//     page: 1,
//     showModal: false,
//     largeImage: '',
//     error: null,
//   };

//   handleSearchSubmit = image => {
//     this.setState({ searchImage: image, page: 1, image: [] });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchImage !== this.state.searchImage ||
//       prevState.page !== this.state.page) {
//       this.setState({ loading: true });
//       ImageAPI
//         .fetchImages(this.state.searchImage, this.state.page)
//         .then(image => this.setState(prevState => ({ image: [ ...prevState.image, ...image.hits ] })))
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   onLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1
//     }));
//   };

//   modalShow = (data) => {
//     this.setState({ showModal: true, largeImage: data });
//   };

//   hideModal = () => {
//     this.setState({ showModal: false });
//   };
//   render() {
//     const { loading, image, page, showModal, largeImage, error } = this.state;

//     return (
//       <div className='app'>
//         {error && <h1>{error.message}</h1>}
//         <Searchbar onSubmit={this.handleSearchSubmit} />
//         {loading && <Loader />}
//         <ImageGallery images={image} onClick={this.modalShow} />
//         {image.length > 1 && <Button page={page} onClick={this.onLoadMore} />}
//         {showModal && <Modal onClose={this.hideModal} onOpen={largeImage} />}
//         <ToastContainer position="top-center" autoClose={2000} />
//       </div>
//     );
//   }
// }
