const express = require("express");
const router = express.Router();

const apiRoute = require("./api.route");

router.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
router.use("/api/v1", apiRoute);


module.exports = router;