const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


module.exports = () => {
    mongoose.connect(process.env.MONGODB_URI,
        {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('Mongo db Atlas connected...')
        })
        // Catching error in connection
        .catch(err => console.log(err.message));
    mongoose.connection.on('connected', () => {
        console.log("Mongoose connected to db ...");
    });

    mongoose.connection.on('error', (err) => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose is dsconnected...')
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose connection disconnected du to app termination...');
            process.exit(0);
        })
    });
}