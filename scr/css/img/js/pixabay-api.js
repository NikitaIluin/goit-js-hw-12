import axios from 'axios';

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=42977219-0f6c9f9217f976d8651793c3a&q=${query}&image_type=photo&per_page=15&page=${page}&orientation=horizontal&safesearch=true`);
    
    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }

    return response.data.hits;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch images. Please try again later.');
  }
}
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
  // Send a GET request (default method)
axios('/user/12345');
