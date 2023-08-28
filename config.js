import dotenv from 'dotenv';
dotenv.config();

const config = {
    db : {
        dialect: 'mariadb',
        host: process.env.I_DB_HOST,
        port: parseInt(process.env.I_DB_PORT, 10),
        username: process.env.I_DB_USER,
        password: process.env.I_DB_PASS,
        database: process.env.I_DB_NAME,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    server : {
        port: process.env.I_SERVER_PORT,
    }
}

export default config;