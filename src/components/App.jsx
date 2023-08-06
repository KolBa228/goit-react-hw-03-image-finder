import React, { Component } from "react";
// import axios from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import { RotatingLines } from "react-loader-spinner";
import { fetchData } from "./Fetch/Fetch";
import { Modal } from "./Modal/Modal";

export class App extends Component {
  state = {
    images: [],
    q: "",
    page: 1,
    per_page: 12,
    isLoading: true,
    isInitialLoad: true,
    selectedImage: null,
  };

  handleSearch = (query) => {
  this.setState({ q: query, page: 1, images: []}, () => {
    this.fetchData();
  });
};


  openModal = (imageUrl) => {
    this.setState({ selectedImage: imageUrl });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  fetchData = async () => {
    const { q, page, per_page } = this.state;

    try {
      const hits = await fetchData(q, page, per_page);
      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchData();
    }
  }

  onloadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { images, isLoading } = this.state;
    const isLoadMoreVisible = !isLoading && images.length >= 12 && images.length % this.state.per_page === 0;

    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        {isLoading ? (
  <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
  />
) : (
  <ImageGallery images={images} openModal={this.openModal} />
)};

        {this.state.selectedImage && (
          <Modal
            imageUrl={this.state.selectedImage}
            altText="Large Image"
            onClose={this.closeModal}
          />
        )}
        {!isLoading && images.length !== 0 && (
          <Button onSearchMore={this.onloadMore} />
        )}
      </>
    );
  }
}
