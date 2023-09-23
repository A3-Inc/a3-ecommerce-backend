const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: [
            {
                type: String
            }
        ],
        address: {
            type: String
        },
        gst: {
            type: String
        }
    },
    website: {
        type: String
    },
    logo: {
        type: String
    },
    banner: {
        type: String
    },
    description: {
        type: String
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
}, { timestamps: true });

const Store = mongoose.model('stores', StoreSchema);

module.exports = Store;