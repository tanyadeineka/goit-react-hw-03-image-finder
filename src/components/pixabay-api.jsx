import axios from "axios";

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (inputValue, pageNumber) => {
    const response = await axios.get(
      `/?g=${inputValue}&page=${pageNumber}&key=31491056-913106eba1c8b28fe3dc938e7&image_type=photo&orientation=horizontal&per_page=12`
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