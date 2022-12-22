import axios from "axios";

axios.defaults.baseURL = `https://pixabay.com/api/`;

const KEY = `31491056-913106eba1c8b28fe3dc938e7`;

export const fetchImages = async (query, page) => {
    const response = await axios.get(
      `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
  return response.data;
}