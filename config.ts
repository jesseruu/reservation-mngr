
import dotenv from "dotenv";
dotenv.config();

export default {
    dbName: process.env.DB_NAME || 'postgres',
    dbPassword: process.env.DB_PASSWORD || '',
    dbUser: process.env.DB_USER || '',
    dbHost: process.env.DB_HOST || 'localhost',
    apiPath: process.env.API_PATH || '',
    apiPort: process.env.API_PORT || '',
    secretKey: process.env.JWT_SECRET || '',
    compression: process.env.COMPRESSION || '',
    filterConfig: {
        defaultLimit: process.env.LIMIT || 10,
        defaultOffset: process.env.OFFSET || 0
    },

}