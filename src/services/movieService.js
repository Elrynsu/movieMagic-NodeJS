import movies from "../movies.js";

const movieService = {
    findMovie(movieId) {
        const result = movies.find(movie => movie.id === movieId);
    
        //TODO - logic if no movies found.
        
        return result;
    }
};

export default movieService;