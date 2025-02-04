import { Schema, model} from 'mongoose';

const castSchema = new Schema({
    name: {
        type: String,
        minLength: [5, 'Your name must be atleast 5 characters long.'],
        required: [true, 'Name field is required!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Name must be alphanumeric, digits and whitespaces only!']
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        minLength: [10, 'Your birth place must be atleast 10 characters long.'],
        required: [true, 'Birth place field is required!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Birth place must be alphanumeric, digits and whitespaces only!']
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
});

const Cast = model('Cast', castSchema);

export default Cast;

