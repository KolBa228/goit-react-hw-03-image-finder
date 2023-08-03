import React, { Component } from "react";
import axios from "axios";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import { RotatingLines } from "react-loader-spinner";

export class App extends Component {
  state = {
    images: [],
    q: "",
    page: 1,
    per_page: 12,
    isLoading: true,
  };

  handleSearch = (query) => {
    this.setState({ q: query, page: 1 }, () => {
      this.fetchData();
    });
  };

  onloadMore = () => {
    this.setState(
      (prevState) => ({
        // page: prevState.page + 1,
        per_page: prevState.per_page + 12,
      }),
      () => {
        this.fetchData();
      }
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.q}&page=${this.state.page}&key=37828594-2a1dcba166f42d48673b13374&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}`
      )
      .then((response) => {
        const data = response.data;
        this.setState({
          images: data.hits,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({
          isLoading: false,
        });
      });
  };

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
              />
            ))}
          </ImageGallery>
        )}
        {!isLoading && images.length !== 0 && (
          <Button onSearchMore={this.onloadMore} />
        )}
      </React.Fragment>
    );
  }
}
