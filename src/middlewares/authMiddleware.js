import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;

export const authMiddleware = (req, res, next) => {
    //Get token
    const token = req.cookies['auth'];

    if(!token) {
        next();
    }

    //Validate the token
    try {
        const decodedToken = jwt.verify(token, SECRET);

        //Attach decoded token to request
        req.user = decodedToken;

        next();
    }catch(err) {
        
    }
    
}