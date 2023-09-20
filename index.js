const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./config');
const bodyParser = require("body-parser");
const routes = require('./routes');

const app = express();
const port = PORT;

mongoose.connect(MONGODB_URI)
    .then((res) => {
        console.log("👍[MongoDB]: MongoDB is connected");
    })
    .catch((err) => {
        console.log(`⚠️[MongoDB]: ${err.message}}`);
    });


app.use(cors());
app.use(bodyParser.urlencoded({ encoding: false }));
app.use(bodyParser.json());
app.use(routes);




app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


