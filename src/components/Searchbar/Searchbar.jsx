import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
    StyledSearchbar,
    SearchForm,
    SearchButton,
    SearchFormButtonLabel,
    SearchInput
} from './Searchbar.styled';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
    const [ searchWord, setSearchWord ] = useState('');
    // const [ isDisabled, setIsDisabled ] = useState(true);

    // const [ email, setEmail ] = useState(() => {
    //     return JSON.parse(window.localStorage.getItem('email')) ?? '';
    // });

    // useEffect(() => {
    //     window.localStorage.setItem('email', JSON.stringify(email));
    // }, [ email ]);

    // const handleChangeEmail = e => {
    //     const value = e.target.value;
    //     setEmail(value);
    // };


    const handleChange = e => {
        const value = e.target.value;

        setSearchWord(value.toLowerCase());
    };


    // const handleChange = e => {
    //     const { name, value } = e.target;

    //     switch (name) {
    //         case 'email':
    //             setEmail(value);
    //             break;

    //         case 'password':
    //             setPassword(value);
    //             break;

    //         default:
    //             return;
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchWord.trim() === '') {
            // setIsDisabled(true);
            toast.warning('Tap some word for searching!');
            return;
        }

        // setIsDisabled(false);
        onSubmit(searchWord);
        clearForm();
    };

    const clearForm = () => {
        // setIsDisabled(true);
        setSearchWord('');
    };

    return (
        <StyledSearchbar>
            <SearchForm onSubmit={handleSubmit} >
                <SearchButton type="submit">
                    <FcSearch />
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchButton>
                <SearchInput
                    type="text"
                    autocomplete="off"
                    autoFocus
                    name='searchWord'
                    value={searchWord}
                    onChange={handleChange}
                    placeholder="Search images and photos"
                />
                {/* <form onSubmit={handleSubmit} >
                    <button type='submit'></button>
                    <input
                        type="text"
                        autocomplete="off"
                        autoFocus
                        name='email'
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder="email"
                    />
                </form> */}

            </SearchForm>
        </StyledSearchbar>
    );
};

export default Searchbar;