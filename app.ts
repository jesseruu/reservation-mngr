import express from "express";
import { sequelize } from "./src/database/dbConn";
import cors from "cors";
import config from "./config";
import { MovieController } from "./src/controllers/MovieController";
import { UserController } from "./src/controllers/UserController";
import { RoomController } from "./src/controllers/RoomController";
import { ReservationController } from "./src/controllers/ReservationController";
import morgan from "morgan";

const app = express();
const port = config.apiPort;
const apiPath = config.apiPath;

const corsOptions = {
    origin: '*',
    credencials: true,
    optionsSuccessStatus: 200
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors(corsOptions));
app.use(morgan('combined', {
    skip: (_req, res) =>
        res.statusCode < 400
}));

app.get(apiPath, (_req, res) => {
    res.send('Hello World!');
});

app.use(apiPath, MovieController);
app.use(apiPath, UserController);
app.use(apiPath, RoomController );
app.use(apiPath, ReservationController);

(async () => {
    await sequelize.sync();
});

app.listen(port, () => {
    console.log(`Booking mngr listening at port ${port}`);
});

export default app;