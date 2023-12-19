import axios from 'axios';

const apiKey = '41309813-4a4658e94f736c087d2f96994';

axios.defaults.baseURL = 'https://pixabay.com/api';

export function fetchSearch(query, page) {
  return axios
    .get(
      `/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`
    )
    .then(response => {
      return response.data;
    });
}
