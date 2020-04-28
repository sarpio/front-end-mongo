const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// Initialize DB
require('./initDB')();
// Replaced by CORS
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PATCH, DELETE, OPTIONS"
//     );
//     next();
//   });

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
app.use('/suppliers', ProductRoute);

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