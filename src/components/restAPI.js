import axios from 'axios';

const PP = 12;
const KEY = `31355844-a483d10f60d89145c2ddc6122`;

const API = async (currentPage = 1, query = '') => {
  return await axios.get(
    `https://pixabay.com/api/?page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PP}&q=${query}`
  );
  // setCollection(response.data.hits);
};

export default API;
