import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email adress is required!'],
        lowercase: true, //Sanitizer -- NOT VALIDATOR
        match: [/\@[a-zA-Z]+.[a-zA-Z]+$/, 'Your email type is incorrect!'],
        minLength: [10, 'Email must be atleast 10 characters long']
    },
    password: {
        type: String,
        match: /^\w+$/,
        minLength: [6, 'Password must be atleast 6 characters long!'],
        trim: true, //Sanitizer -- for formatting data in the DB.
    },
});

/* //Virtual property example ( does not get saved to DB )

userSchema.virtual('rePassword)
    .set(function(rePassword) {
        this._rePassword = rePassword;
        if(this.password !== _rePassword) {
        throw new Error('Password missmatch!')};
    });
*/

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch(error) {
        next(error);
    }
});

const User = model('User', userSchema);

export default User;