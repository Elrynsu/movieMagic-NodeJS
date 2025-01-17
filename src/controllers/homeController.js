import express from 'express';
import movies from '../movies.js'; // Temporary solution to simulate dynamic page with data

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;