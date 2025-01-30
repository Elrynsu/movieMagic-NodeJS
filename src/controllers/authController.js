import express from 'express';


const authController = express.Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});


export default authController;