import { Seats } from "../interfaces/Seats";
import { SeatModel } from "../models/SeatModel";
import debugLib from "debug";

const debug = debugLib('api:SeatModel');

export class SeatService {
    public static async createSeats(rquid: string, body: { seatCode: string, roomId: number }[]) {
        try {
            console.log(body)
            const seatsCreated = await SeatModel.bulkCreate(body, {
                fields: ['seatCode', 'roomId']
            });
            console.log(seatsCreated);
            debug('<%s> Start seats created', rquid);
        } catch (error) {
            debug(`<${rquid}> - Error creating seats: ${error}`);
            throw error;
        }
    }
}