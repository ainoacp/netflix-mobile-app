import { BASE_URL, API_KEY } from '@env';

const apiKey = process.env.API_KEY;
const baseUrl = process.env.BASE_URL;

const requests = {
    fetchTopRated:`${baseUrl}/movie/top_rated?api_key=${apiKey}&language=es-ES`,
    fetchTrendingMovies: `${baseUrl}/trending/movie/day?api_key=${apiKey}&language=ES`,
    fetchTrendingTv: `${baseUrl}/trending/tv/day?api_key=${apiKey}&language=ES`
}

export default requests