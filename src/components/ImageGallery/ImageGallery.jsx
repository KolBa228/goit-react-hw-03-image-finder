import React from "react";
import "./style.css";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"; 

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="gallery">
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          altText={image.tags}
          onClick={() => openModal(image.largeImageURL)}
        />
      ))}
    </ul>
  );
};
