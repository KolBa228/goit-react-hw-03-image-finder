import React from "react";
import "./style.css";

export const ImageGalleryItem = ({ imageUrl, altText, onClick }) => {
  return (
    <li className="gallery-item">
      <img
        src={imageUrl}
        alt={altText}
        onClick={onClick}
        className="gallery-image"
      />
    </li>
  );
};
