import express from "express";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import routes from './routes.js';
import { authMiddleware } from "./middlewares/authMiddleware.js";
import showRatingHelper from "./helpers/ratingHelper.js";

const app = express();

//db configuration
try {
    const defaultUri = 'mongodb://localhost:27017/magicMovies';
    await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);

    console.log('DB connected successfully!');
} catch(err) {
    console.log('Couldn\'t connect to DB');
    console.error(err.message);
}

//handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,  //Option to tell -
        // -handlebars to treat MongoDB special objects like plain JS ones.
    },
    helpers: {
        showRating: showRatingHelper
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//express configuration
app.use('/static', express.static('src/public')); //Load the static files from folder Public.
app.use(express.urlencoded({ extended: false })); //Learn express to parse form data.
app.use(cookieParser()); //Learn express to store cookies with cookieParser.
app.use(authMiddleware);

app.use(routes); // All routes in routes file.

//Server start
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));