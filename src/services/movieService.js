//import movies from "../movies.js";
import Movie from "../models/Movie.js";

const movieService = {
    findMovie(movieId) {
        const result = movies.find(movie => movie.id === movieId);
    
        //TODO - logic if no movies found.
        
        return result;
    },
    create(movieData) {
        const result = Movie.create({
            ...movieData, //Spread data;,
            rating: Number(movieData.rating),
            year: Number(movieData.year)
        });

        return result;
  
    },
    getAll(filter = {}) {
        let result = Movie.find({}); 

        // if(filter.search) {
        //     result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()))
        // }

        // if(filter.genre) {
        //     result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
        // }

        // if(filter.year) {
        //     result = result.filter(movie => movie.year === filter.year);
        // }

        return result;
    }
};

export default movieService;