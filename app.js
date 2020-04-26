const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Initialize DB
require('./initDB')();

app.all('/test', (req, res) => {
    // console.log(req.query);
    // console.log(req.query.name);
    // res.send(req.query);
    // console.log(req.params);
    // res.send(req.params);
    console.log(req.body);
    res.send(req.body);
})

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

// 404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, "Pagen not found"))
})

//Error hndler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });;
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});