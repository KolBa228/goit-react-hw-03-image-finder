import React, { Component } from "react";
import axios from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
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
    this.setState({ q: query, page: 1 }, () => {
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

//   fetchData = async () => {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?q=${this.state.q}&page=${this.state.page}&key=37828594-2a1dcba166f42d48673b13374&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}`
//     );
//     const data = response.data;
//     this.setState({
//       images: data.hits,
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   } finally {
//     this.setState({
//       isLoading: false,
//     });
//   }
// };


  render() {
    const { images, isLoading } = this.state;

    return (
      <React.Fragment>
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
          <ImageGallery>
            {images.map((image) => (
              <ImageGalleryItem
                key={image.id}
                imageUrl={image.webformatURL}
                altText={image.tags}
                onClick={() => this.openModal(image.largeImageURL)}
              />
            ))}
          </ImageGallery>
        )}
        {this.selectedImage && (
          <Modal
            imageUrl={this.selectedImage}
            altText="Large Image"
            onClose={this.closeModal}
          />
        )}
        {!isLoading && images.length !== 0 && (
          <Button onSearchMore={this.onloadMore} />
        )}
      </React.Fragment>
    );
  }
}
