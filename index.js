const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authenticate = require('./middleware/auth');
const { MONGODB_URI, PORT } = require('./config');


const app = express();

const port = PORT;


app.use(cors());

mongoose.connect(MONGODB_URI)
    .then((res) => {
        console.log("👍[MongoDB]: MongoDB is connected");
    })
    .catch((err) => {
        console.log(`⚠️[MongoDB]: ${err.message}}`);
    });

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.get('/api', authenticate, (req, res) => {
    res.send('Express + TypeScript Server Secured');
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});