const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require("cors");
const path = require('path');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const cookie_parser = require('cookie-parser');
dotenv.config({ path: path.join(__dirname, '.env') });

const URL_MONGODB ="mongodb+srv://huybui:pCS921fgH36dL24J@mini-shop.shc9tfw.mongodb.net/mini-shop"


app.use(express.json());
app.use(cookie_parser());
app.use(cors());
app.options("*", cors());



app.use('/auth',authRouter);
app.use('/user',userRouter);

app.use((err, req, res ,next) => {
    console.log(err);
    const status = err.statusCode;
    const message = err.message;
    const data = err.data;
    res.status(status).json({
        message : message,
        data : data
    })
})


mongoose.connect(URL_MONGODB)
    .then( () =>{
        console.log("Connected to MongoDB successfully")
        app.listen(process.env.PORT, () =>{
            console.log('Connecting to server ' );
        });
    })
