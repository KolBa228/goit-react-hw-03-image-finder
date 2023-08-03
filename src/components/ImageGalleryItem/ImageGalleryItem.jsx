import React, { Component } from "react";
import "./style.css";

export class ImageGalleryItem extends Component {
  render() {
    const { imageUrl, altText, key } = this.props;

    return (
      <li key={key} className="gallery-item">
        <img src={imageUrl} alt={altText} />
      </li>
    );
  }
}
