const express = require('express');
const routes = require("./api-routes");

// db related
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

/* Middlewares */
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());


/* DB setup */
// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect(
    'mongodb://localhost/resthub', 
    { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


/* routes */
app.use('/api', routes);// all routes starting with /api/*

app.get('/', (req, res) => {
    res.send('hello world');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

