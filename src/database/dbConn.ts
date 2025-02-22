import { Sequelize } from "sequelize-typescript";
import config from "../../config";
import path from "path";

const sequelize = new Sequelize({
    database: config.dbName,
    define: {
        schema: 'booking',
        timestamps: false,
    },
    logging: true,
    dialect: 'postgres',
    host: config.dbHost,
    models: [path.join(path.dirname(__filename), '../models')],
    password: config.dbPassword,
    username: config.dbUser,
});

export { sequelize };