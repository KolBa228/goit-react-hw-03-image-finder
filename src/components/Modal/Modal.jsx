import React from "react";
import './style.css';

export const Modal = ({ imageUrl, altText, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={imageUrl} alt={altText} />
      </div>
    </div>
  );
};