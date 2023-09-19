const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authenticate = require('./middleware/auth');
const { MONGODB_URI, PORT } = require('./config');

const bodyParser = require("body-parser");

const app = express();

const port = PORT;


app.use(cors());
app.use(bodyParser.urlencoded({ encoding: false }));
app.use(bodyParser.json());

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

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('users', UserSchema)
app.post("/register", async (req, resp) => {
    try {
        const user = User.create(req.body);

        if (user) {
            resp.send(user);
            console.log("User reg");
        } else {
            console.log("User not registered");
        }

    } catch (e) {
        resp.send("Something went wrong");
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


