import dotenv from 'dotenv';

dotenv.config();
export const config = {

    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT || '5000', 10),

    // Database
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://admin:admin@localhost:27017/main-db?authSource=admin',
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    JWT_REFRESH_TOKEN_EXPIRATION: process.env.JWT_REFRESH_TOKEN_EXPIRATION,

    // Security
    BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

    // cors
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

}