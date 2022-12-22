import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImages } from "./pixabay-api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: null,
    isLoading: false,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (
        this.state.query !== prevState.query ||
        this.state.page !== prevState.page
      ) {
        this.setState({ isLoading: true });

        const data = await fetchImages(this.state.query, this.state.page);
        const { hits, totalHits } = data;

        this.setState({
          images: [...this.state.images, ...hits],
          totalHits,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = ({ query, page, images }) => {
    this.setState({
      images,
      query,
      page,
    });
  };

  handleClickMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModalToggle = (modalImg, modalAlt) => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      modalImg,
      modalAlt,
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
            {this.state.totalHits / 12 >= this.state.page &&
              !this.state.isLoading && <Button onClick={this.handleClickMore} />}
            {this.state.isLoading && <Loader />}
          </React.Fragment>
        )}
        {this.state.modalOpen && (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            closeModal={this.handleModalToggle}
          />
        )}
      </div>
    );
  }
}
