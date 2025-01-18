import movies from "../movies.js";
import { v4 as uuid } from 'uuid'

const movieService = {
    findMovie(movieId) {
        const result = movies.find(movie => movie.id === movieId);
    
        //TODO - logic if no movies found.
        
        return result;
    },
    create(movieData) {
        const newId = uuid();

        movies.push({
            id: newId,
            ...movieData, //Spread data;,
            rating: Number(movieData.rating)
        });
        
        return newId;
    },
    getAll(filter = {}) {
        let result = movies;

        if(filter.search) {
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()))
        }

        if(filter.genre) {
            result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
        }

        if(filter.year) {
            result = result.filter(movie => movie.year === filter.year);
        }

        return result;
    }
};

export default movieService;