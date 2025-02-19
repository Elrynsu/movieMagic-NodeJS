import Movie from "../models/Movie.js";

const movieService = {
    findMovie(movieId) {
        const result = Movie.findById(movieId).populate('casts');
    
        //TODO - logic if no movies found.
        
        return result;
    },
    create(movieData, creatorId) {
        const result = Movie.create({
            ...movieData, //Spread data;,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId
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
    },
    async attachCast(movieId, castId) {

        const movie = await Movie.findById(movieId);
        movie.casts.push(castId);
        await movie.save();

        return movie;
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    }

};

export default movieService;