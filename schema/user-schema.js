const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    profilePicture: {
        type: String,
    },
    address: [
        {
            addressLine1: {
                type: String,
            },
            addressLine2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            type: {
                type: String,
                enum: ["home", "office"],
                default: "home",
            },
        },
    ],
    contact: [
        {
            type: String,
        },
    ],
});

const User = mongoose.model("users", UserSchema);

module.exports = User;