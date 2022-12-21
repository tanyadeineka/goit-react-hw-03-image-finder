import axios from "axios";

axios.defaults.baseURL = `https://pixabay.com/api/`;

const KEY = `31491056-913106eba1c8b28fe3dc938e7`;

export const fetchImages = async (inputValue, pageNumber) => {
    const response = await axios.get(
      `/?q=${inputValue}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tags: image.tags,
        };
    })
}