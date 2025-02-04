import { Schema, model, Types } from 'mongoose';

//Create schema
const movieSchema = new Schema({
    title: {
        type: String,
        minLength: [5, 'Your title must be atleast 5 characters long.'],
        required: [true, 'Title field is required!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Title must be alphanumeric, digits and whitespaces only!']
    },
    category: String,
    genre: {
        type: String,
        minLength: [5, 'Your genre must be atleast 5 characters long.'],
        required: [true, 'Genre field is required!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Genre must be alphanumeric, digits and whitespaces only!']
    },
    director: {
        type: String,
        minLength: [5, 'Your director must be atleast 5 characters long.'],
        required: [true, 'Director field is required!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Director must be alphanumeric, digits and whitespaces only!']
    },
    year: {
        type: Number,
        min: [1900, 'Year must be 1900 or higher!'],
        max: [2025, 'Year cannot exceed current year!']
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        minLength: 20,
        match: [/^[a-zA-Z 0-9]+$/, 'Description only allows aplphanumeric, digits and whitespaces.']

    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});


//Create model
const Movie = model('Movie', movieSchema);

//Export model
export default Movie;