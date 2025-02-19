import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;

export const authMiddleware = (req, res, next) => {
    //Get token
    const token = req.cookies['auth'];

    if(!token) {
        return next();
    }

    //Validate the token
    try {
        const decodedToken = jwt.verify(token, SECRET);

        //Attach decoded token to request
        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    }catch(err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
    
}