import express from "express";
import mongoose from 'mongoose'
import cors from 'cors';

import { PORT, mongoDBURL } from "./config.js";
import { Issue } from "./models/issueModel.js";
import issuesRoute from './routes/issuesRoute.js';

const app = express();

// middleware for passing request body
app.use(express.json());
// Option 1: Allow all Origins with default cors(*)
app.use(cors());
// // Option 2: Allow Custom Origins (*)
// app.use(
//     cors({
//         origin: 'localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['content-type'],
//     });
// );

app.get('/', (req, res) => { // create app root route
    console.log(req)
    return res.status(234).send('Welcome to the MERN stack.');
});

app.use('/issues', issuesRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
            app.listen(PORT, () => {
                console.log(`BServer is listening to port: ${PORT}`);
            })    
    })
    .catch((error) => {
        console.log(error);
    });

