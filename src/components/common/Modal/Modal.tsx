import React from 'react';
import './Modal.scss';

interface ModalProps {
  title?: string;
  message?: string;
  imageUrl?: string;
  onClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, imageUrl, onClick }) => {
  return (
    <div className="modal" onClick={onClick}>
      <div className="overlay"></div>
      <div className="modal-window">
        <h3 className="modal-window__title">{title}</h3>
        {imageUrl && <img src={imageUrl} alt="Modal" />}
        <p className="modal-window__message">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
