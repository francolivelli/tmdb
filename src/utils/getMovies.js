import axios from "axios";

async function getMovies() {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    {
      params: {
        api_key: "fbd5e795f2c301d012b62e7b9f1fdde7",
      },
    }
  );

  return data.results;
}

export default getMovies;
