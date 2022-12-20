import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={css.ImageGalleryItem} id={image.id} onClick={onClick}>
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: propTypes.object.isRequired,
  onclick: propTypes.func.isRequired,
};