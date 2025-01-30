import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: String,
    password: String,
});

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