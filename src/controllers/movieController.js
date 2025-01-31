import express from 'express';
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';

const movieController = express.Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);
    
    res.render('search', { movies, filter });
})

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async(req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;

    await movieService.create(newMovie, userId);

    res.redirect('/');
})

movieController.get('/:movieId/details', async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieService.findMovie(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attachCast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.findMovie(movieId);
    const casts = await castService.getAll({exclude: movie.casts});

    res.render('movie/attachCast', { movie, casts });
});

movieController.post('/:movieId/attachCast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attachCast(movieId, castId);


    res.redirect(`/movies/${movieId}/details`);
})

export default movieController;