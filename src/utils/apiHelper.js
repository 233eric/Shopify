import axios from 'axios';

export const getMovies = async (search) => {
  try {
    const response = await axios.get('http://www.omdbapi.com/?apikey=385f7099&', {
      params: {
        s: search
      }
    })
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}
