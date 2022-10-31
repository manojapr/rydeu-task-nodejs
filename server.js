import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT;
import router from './router/auth-router';
import mongoose from 'mongoose';


app.use(express.json());
app.use('/api',router);

mongoose.connect(process.env.MONGO_BASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> app.listen(PORT))
.then(()=> console.log(`Mongoose Engaged and App is listening on ${PORT}`))
.catch(()=> console.log("Error engaging DB"));
