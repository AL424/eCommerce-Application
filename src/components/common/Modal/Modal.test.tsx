import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
  it('should render the modal with a title, message, and images', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { getByText, getAllByAltText } = render(
      <Modal
        title="Modal Title"
        message="Modal Message"
        images={images}
        selectedImageIndex={0}
        onClick={() => {}}
      />
    );

    const titleElement = getByText('Modal Title');
    const messageElement = getByText('Modal Message');
    const imageElements = getAllByAltText(/Modal \d/);

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(imageElements).toHaveLength(images.length);
  });

  it('should render the modal without a title or message', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const { queryByText } = render(
      <Modal images={images} selectedImageIndex={0} onClick={() => {}} />
    );

    const titleElement = queryByText('Modal Title');
    const messageElement = queryByText('Modal Message');

    expect(titleElement).toBeNull();
    expect(messageElement).toBeNull();
  });

  it('should handle the close button click', () => {
    const onCloseClick = jest.fn();
    const { getByText } = render(
      <Modal
        title="Modal Title"
        message="Modal Message"
        images={['image1.jpg']}
        selectedImageIndex={0}
        onClick={onCloseClick}
      />
    );

    const closeButton = getByText('✕');
    fireEvent.click(closeButton);

    expect(onCloseClick).toHaveBeenCalled();
  });
});
