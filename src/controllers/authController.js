import express from 'express';
import authService from '../services/authService.js';
import { getErrorMessage } from '../utils/errorUtils.js';


const authController = express.Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
    } catch(err) {
        console.log(getErrorMessage(err));
        
    }

    res.redirect('/auth/login');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');

});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        
        res.cookie('auth', token, {httpOnly: true});
        res.redirect('/');
    }catch(err) {
        console.log(err.message);
        res.redirect('/404');
    }

});

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})


export default authController;