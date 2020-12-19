const axios = require('axios');

export const getMovies = async() => {
  const response = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=385f7099').then(response => {
    return response.data
  }).catch(error => console.log(error));
  return response;
}