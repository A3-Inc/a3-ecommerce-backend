const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    details: {
        type : String,
        required : true
    },
    price : {
        amount : {
            type : Number,
            required : true
        },
        currency : {
            type : String,
            required : true
        }
    },
    category : {
        type : String,
        required : true
    },
    images : [
        {
            type : String,
            required : true
        }
    ],
}, {timestamps : true});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;