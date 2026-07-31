const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

module.exports = {
    PORT: process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
};
