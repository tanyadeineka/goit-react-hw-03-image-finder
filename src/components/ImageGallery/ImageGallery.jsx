import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => (
    <ul className={css.ImageGallery}>
      {images.map((image, index) => (
        <ImageGalleryItem onClick={onImageClick} image={image} key={index} />
      ))}
    </ul>
);

ImageGalleryItem.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    })
  ),
  onImageClick: propTypes.func.isRequired,
};
