import React from 'react';
import Slider, { Settings } from 'react-slick';
import './Modal.scss';

interface ModalProps {
  title?: string;
  message?: string;
  // imageUrl?: string;
  images?: string[];
  selectedImageIndex?: number;
  onClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  images,
  selectedImageIndex,
  onClick
}) => {
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedImageIndex || 0 // начальный индекс для слайдера
  };
  return (
    <div className="modal">
      <div className="overlay" onClick={onClick}></div>
      <div className="modal-window">
        <button className="closeButton" onClick={onClick}>
          ✕
        </button>
        <h3 className="modal-window__title">{title}</h3>
        {/* {imageUrl && <img src={imageUrl} alt="Modal" />} */}
        {images && (
          <Slider {...sliderSettings}>
            {images?.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Modal ${index}`} />
              </div>
            ))}
          </Slider>
        )}
        <p className="modal-window__message">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
