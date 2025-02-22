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

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Error connecting to the database:', err));

export { sequelize };