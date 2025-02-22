import express from "express";
import { sequelize } from "./src/database/dbConn";
import cors from "cors";
import config from "./config";

const app = express();
const port = config.apiPort;
const apiPath = config.apiPath;


const corsOptions = {
    origin: '*',
    credencials: true,
    optionsSuccessStatus: 200
}

app.use(express.json({ limit: '50mb' }));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, async () => {
    console.log(`Booking mngr listening at http://localhost:${port}`);
    await sequelize.sync({ force: true });
});

export { app };