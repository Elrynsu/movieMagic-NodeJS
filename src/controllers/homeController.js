import express from 'express';
import movieService from '../services/movieService.js';


const router = express.Router();

router.get('/', async (req, res) => {
    //Second solution to use .lean() to convert Documents to objects.
    const movies = await movieService.getAll();

    //First solution
    // //Convert documents to plain objects
    // const plainMovies = movies.map(m => m.toObject());
    
    //Third solution, set in handlebars allowProtoPropertiesByDefault runtimeOption
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;