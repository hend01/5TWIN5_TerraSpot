// FullScreenImageModal.js
import React from "react";
import ReactModal from "react-modal";
import "./FullScreenImageModal.css"

const FullScreenImageModal = ({ isOpen, onRequestClose, imageSrc }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image en plein écran"
      className="fullscreen-modal"
    >
      <img
        src={imageSrc}
        alt="en plein écran"
        className="fullscreen-image"
      />
      <button onClick={onRequestClose}>Fermer</button>
    </ReactModal>
  );
};

export default FullScreenImageModal;
