const express = require('express');


const app = express();
const routes = require("./api-routes")

/* Middlewares */
// middleware that json parses the req.body
app.use(express.json());

/* routes */

app.use('/api', routes);// all routes starting with /api/*

app.get('/', (req, res) => {
    res.send('hello world');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

