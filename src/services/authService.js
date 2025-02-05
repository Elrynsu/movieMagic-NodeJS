import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;

export default {
    async register(userData) {
        //check if password match rePassword
        if(userData.password !== userData.rePassword) {
            throw new Error('Password missmatch!');
        }

        const userCount = await User.userCountDocuments({email: userData.email});
        if(userCount > 0) {
            throw new Error('This email already exists');
        }

        return User.create(userData);
    },
    async login(email, password) {
        //Check if user exists 
        const user = await User.findOne({ email });
        if(!user) {
            throw new Error('Invalid email or password!');
        }

        //Check if password is correct 
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) {
            throw new Error('Invalid email or password!');
        }

        //Generate token
        const payload = {
            id: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, SECRET, {expiresIn: '2h'});

        //Return token
        return token;
    }
}