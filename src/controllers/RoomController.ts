import { Router, Request, Response } from "express";
import debugLib from "debug";
import { HttpUtils } from "../utilities/HttpUtils";
import { RoomService } from "../services/RoomService";
import { Rooms } from "../interfaces/Rooms";

const debug = debugLib('api:RoomController')
const RoomController = Router();

RoomController.get('/rooms/:roomName', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const { roomName } = req.params;
    const name = decodeURIComponent(roomName);
    debug('<%s> Start get room', rquid);
    try {
        const { status, data } = await RoomService.getRoom(rquid, name);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

RoomController.get('/rooms', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    debug('<%s> Start get rooms', rquid);
    try {
        const { status, data } = await RoomService.getRooms(rquid);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

RoomController.post('/rooms', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const body = req.body as Rooms;
    debug('<%s> Start create rooms', rquid);
    try {
        const { status, data } = await RoomService.createRoom(rquid, body);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

export { RoomController }