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
            ...movieData, //Spread data;
        });
        
        return newId;
    },
    getAll() {
        return movies;
    }
};

export default movieService;