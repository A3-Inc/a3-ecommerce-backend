const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const User = require("../schema/user-schema");
router.get('/api', authenticate, (req, res) => {
    res.send('Express + TypeScript Server Secured');
});

router.post("/register", async (req, resp) => {
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

module.exports = router;