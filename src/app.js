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
// const { MongoClient } = require("mongodb");
// const username = encodeURIComponent("huybui");
// const password = encodeURIComponent("Huy123@");
// const cluster = "<clusterName>";
// const authSource = "<authSource>";
// const authMechanism = "<authMechanism>";
// let uri =
//   `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("<dbName>");
//     const ratings = database.collection("<collName>");
//     const cursor = ratings.find();
//     await cursor.forEach(doc => console.dir(doc));
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);