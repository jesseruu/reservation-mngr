import { Router, Request, Response } from "express";
import debugLib from "debug";
import { HttpUtils } from "../utilities/HttpUtils";
import { ReservationService } from "../services/ReservationService";
import { Reservation } from "../interfaces/Reservation";

const debug = debugLib('api:ReservationController')
const ReservationController = Router();

ReservationController.get('/movies/:movieId/rooms/:roomId/reservations', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const { date } = req.query as any;
    const { movieId,  roomId } = req.params;
    debug('<%s> Start get rooms', rquid);
    const startTime = decodeURIComponent(date);
    try {
        const { status, data } = await ReservationService.getReservationsByFilters(rquid, { startTime, movieId, roomId });
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

ReservationController.get('/users/:userId/reservations', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    debug('<%s> Start get reservations', rquid);
    const { userId } = req.params;
    try {
        const { status, data } = await ReservationService.getReservationsByFilters(rquid, { userUuid: userId });
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});


ReservationController.post('/users/:userId/reservations', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    debug('<%s> Start get rooms', rquid);
    const body = req.body as Reservation;
    const { userId } = req.params;
    try {
        const { status, data } = await ReservationService.createReservation(rquid, userId, body);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

ReservationController.get('/reservations', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    debug('<%s> Start to get reservations', rquid);
    try {
        const { status, data } = await ReservationService.getReservationsByFilters(rquid, { });
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});



export { ReservationController }