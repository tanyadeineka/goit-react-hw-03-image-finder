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
    showModal: false,
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

  handleFormSubmit = ({ query, page, images }) => {
    this.setState({
      images,
      query,
      page,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = (modalImg, modalAlt) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
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
            <Searchbar onSubmit={this.handleFormSubmit} />
            <ImageGallery
              images={this.state.images}
              openModal={this.toggleModal}
            />
            {this.state.totalHits / 12 >= this.state.page &&
              !this.state.isLoading && (
                <Button onClick={this.loadMore} />
              )}
            {this.state.isLoading && <Loader />}
          </React.Fragment>
        )}
        {this.state.showModal && (
          <Modal
            modalImg={this.state.modalImg}
            modalAlt={this.state.modalAlt}
            closeModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
