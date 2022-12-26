import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ smallImg, largeImg, alt, openModal }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => openModal(largeImg, alt)}
    >
      <img
        src={smallImg}
        alt={alt}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: propTypes.string.isRequired,
  largeImg: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  openModal: propTypes.func.isRequired,
};
