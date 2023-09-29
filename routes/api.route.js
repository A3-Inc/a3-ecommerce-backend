const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const User = require("../schema/user-schema");
const Product = require("../schema/product-schema");
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

router.get("/products", async (req, resp) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.brand) {
            query.brands = req.query.brand;
        }
        if (req.query.price) {
            // In the query string, the price is in the format of 0-100
            // we need to convert it to an array of [0, 100]
            const priceRange = req.query.price.split("-");
            query["price.amount"] = { $gte: priceRange[0], $lte: priceRange[1] };
        }

        const products = await Product.find(query);
        if (products) {
            resp.send(products);
        } else {
            console.log("No products found");
        }
    } catch (e) {
        console.log(e);
        resp.send("Something went wrong");
    }
});
module.exports = router;