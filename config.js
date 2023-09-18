const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT;

module.exports = {
    MONGODB_URI,
    PORT,
    SERVICE_ACCOUNT
}