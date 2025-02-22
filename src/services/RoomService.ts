import { Rooms } from "../interfaces/Rooms";
import { RoomModel } from "../models/RoomModel";
import debugLib from "debug";

const debug = debugLib('api:RoomService');

export class RoomService {
    public static async getRooms(rquid: string) {
        debug('<%s> Start to rooms from db', rquid);
        try {
            const rooms = await RoomModel.findAll({
                raw: true
            });
            debug('<%s> Query successfull', rquid);
            return { status: 200, data: rooms }
        } catch (error) {
            debug(`<${rquid}> - Error rooms: ${error}`);
            throw error;
        }
    }

    public static async getRoom(rquid: string, name: string) {
        debug('<%s> Start to rooms from db', rquid);
        try {
            const room = await RoomModel.findOne({
                where: {
                    name
                },
                raw: true
            });
            if (!room) {
                debug('<%s> No room found', rquid);
                return { status: 404, data: 'No room found' };
            }
            debug('<%s> Query successfull', rquid);
            return { status: 200, data: room }
        } catch (error) {
            debug(`<${rquid}> - Error rooms: ${error}`);
            throw error;
        }
    }

    public static async createRoom(rquid: string, body: Rooms) {
        debug('<%s> Start to rooms from db', rquid);
        try {
            const room = await RoomModel.findOne({
                where: {
                    name: body.name
                },
                raw: true
            });
            if (room) {
                debug('<%s> Room already exists', rquid);
                return { status: 403, data: 'Room already exists' };
            }

            const roomCreated = await RoomModel.create({
                ...body
            },
            {
                fields: Object.keys({...body }),
                raw: true
            });
            debug('<%s> Room created', rquid);
            return { status: 200, data: roomCreated }
        } catch (error) {
            debug(`<${rquid}> - Error created room: ${error}`);
            throw error;
        }
    }
}