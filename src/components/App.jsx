import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImages } from "./pixabay-api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    currentSearch: '',
    pageNumber: 1,
    images: [],
    totalHits: null,
    isLoading: false,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (this.state.currentSearch !== prevState.currentSearch || this.state.pageNumber !== prevState.pageNumber) {
        this.setState({ isLoading: true });
        const response = await fetchImages(this.state.currentSearch, this.state.pageNumber);
        
        this.setState({
          images: response,
          isLoading: false,
          currentSearch: this.currentSearch,
          pageNumber: this.pageNumber,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = event => {
    const inputForSearch = event.target.elements.inputForSearch;
    this.setState({
      images: [],
      currentSearch: inputForSearch.value,
      pageNumber: 1,
    });
  };

  handleClickMore = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1,
    });
  };

  handleModalToggle = () => {
    this.setState(prevState =>({
      modalOpen: !prevState.modalOpen,
      modalImg: '',
      modalAlt: '',
    }));
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              images={this.state.images}
              onImageClick={this.handleModalToggle}
            />
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </React.Fragment>
        )}
        {this.state.modalOpen && (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            onCloseModal={this.handleModalToggle}
          />
        )}
      </div>
    );
  }
}
