const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title for the review'],
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, 'Please add some text'],
        trim: true,
        maxlength: 500
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please add a rating between 1 and 10']
    },
    // relationship between review and user
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
}, {
    timestamps: true
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;