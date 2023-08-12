import React, { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { RotatingLines } from "react-loader-spinner";
import { fetchData } from "../fetch/fetch";
import { Modal } from "./Modal/Modal";
// import axios from "axios";

export const App = () => {

  const [images, setImages] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  // const [per_page, setPer_page] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prevPage, setPrevPage] = useState(page);
  const [prevQ, setPrevQ] = useState(q);

  const handleSearch = (query) => {
    setQ(query);
    setPage(1);
    setImages([]);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    window.addEventListener("keydown", handleKeyDown);
  };

  const closeModal = () => {
    setSelectedImage(null);
    window.removeEventListener("keydown", handleKeyDown);
  };

  const onloadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const newImages = await fetchData(q, page, per_page);
        setImages((prevImages) => [...prevImages, ...newImages]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (isInitialLoad) {
      fetchDataAsync();
      setIsInitialLoad(false);
    } else if (prevPage !== page || prevQ !== q) {
      fetchDataAsync();
      setPrevPage(page);
      setPrevQ(q);
    }
  }, [isInitialLoad, prevPage, prevQ, q, page,]);

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {isLoading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {selectedImage && (
        <Modal
          imageUrl={selectedImage}
          altText="Large Image"
          onClose={closeModal}
        />
      )}
      {!isLoading && images.length !== 0 && (
        <Button onSearchMore={onloadMore} />
      )}
    </>
  );
};
