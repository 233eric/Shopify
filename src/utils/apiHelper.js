const axios = require('axios');

export const getMovies = async (search) => {
  const response = await axios.get('http://www.omdbapi.com/?apikey=385f7099&', {
  params: {
    s: search
  }
}).then(response => {
    return response.data
  }).catch(error => console.log(error));
  return response;
}
