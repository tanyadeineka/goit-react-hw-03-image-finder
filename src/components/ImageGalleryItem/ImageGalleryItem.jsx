import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onImageClick, tags, largeImageURL }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      id={image.id}
      onClick={() => onImageClick(largeImageURL, tags)}
    >
      <img
        src={image.webformatURL}
        alt={image.tags}
        name={image.largeImageURL}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: propTypes.object.isRequired,
  onImageClick: propTypes.func.isRequired,
};
