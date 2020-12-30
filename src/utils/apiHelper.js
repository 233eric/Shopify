import axios from 'axios';

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY

export const getMovies = async (search) => {
  try {
    const response = await axios.get('https://www.omdbapi.com/?apikey='+ OMDB_KEY , {
      params: {
        s: search
      }
    })
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}
