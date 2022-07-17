import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
    StyledSearchbar,
    SearchForm,
    SearchButton,
    SearchFormButtonLabel,
    SearchInput
} from './Searchbar.styled';
import { toast } from 'react-toastify';

class Searchbar extends Component {
    state = {
        searchWord: '',
        isDisabled: true,
    };

    handleChangeName = (e) => {
        const value = e.target.value;

        this.setState({
            searchWord: value.toLowerCase(),
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const { searchWord } = this.state;
        if (searchWord.trim() === '') {
            toast.warning('Tap some word for searching!');
            // alert('Tap text for searching');
            return;
        }
        // this.setState({ isDisabled: false });
        // console.log('isDisabled', this.state.isDisabled);
        onSubmit(searchWord);
        this.clearForm();
    };

    clearForm = () => {
        this.setState({ searchWord: '' });
    };

    render() {
        console.log('this.state.isDisabled', this.state.isDisabled);
        return (
            <StyledSearchbar>
                <SearchForm onSubmit={this.handleSubmit} >
                    <SearchButton type="submit">
                        <FcSearch />
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchButton>

                    <SearchInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        name='searchWord'
                        value={this.state.searchWord}
                        onChange={this.handleChangeName}
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </StyledSearchbar>
        );
    }
}

export default Searchbar;