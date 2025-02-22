import { Reservation } from "../interfaces/Reservation";
import { ReservationModel } from "../models/ReservationModel";
import { RoomModel } from "../models/RoomModel";
import { SeatModel } from "../models/SeatModel";
import debugLib from "debug";
import { SeatService } from "./SeatService";
import { MovieModel } from "../models/MovieModel";

const debug = debugLib('api:ReservationService');

export class ReservationService {
    public static async getReservationsByUser(rquid: string, userId: string) {
        debug('<%s> Start get reservation by user', rquid);
        try {
            const reservations = await ReservationModel.findAll({
                attributes: ['startTime', 'userUuid', 'id', 'createdAt'],
                include: [
                    {
                        model: RoomModel,
                        include: [{ model: SeatModel, attributes: ['seatCode']}]
                    },
                    {
                        model: MovieModel,
                        attributes: ['name', 'duration', 'genres']
                    }
                ],
                where: {
                    userUuid: userId,
                },
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true
            });
            const groupedReservations = reservations.reduce((acc: { [key: string]: any }, reservation) => {
                const reservationId = reservation.id;
                if (!acc[reservationId]) {
                    acc[reservationId] = {
                        ...reservation,
                        room: {
                            ...reservation.room,
                            seats: []
                        }
                    };
                }
                acc[reservationId].room.seats.push(reservation.room.seats);
                return acc;
            }, {});

            const result = Object.values(groupedReservations);
            debug('<%s> Query successfull', rquid);
            return { status: 200, data: result }
        } catch (error) {
            debug(`<${rquid}> - Error rooms: ${error}`);
            throw error;
        }
    }

    public static async getReservationsByFilters(rquid: string, filterOptions: { userUuid?: string, movieId?: string, roomId?: string, startTime?: string }) {
        debug('<%s> Start get reservation by filter', rquid);
        const filters = Object.fromEntries(
            Object.entries(filterOptions).filter(([_key, v]) => v !== undefined),
        );
        try {
            const reservations = await ReservationModel.findAll({
                attributes: ['startTime', 'userUuid', 'id', 'createdAt'],
                include: [
                    {
                        model: RoomModel,
                        include: [{ model: SeatModel, attributes: ['seatCode']}]
                    },
                    {
                        model: MovieModel,
                        attributes: ['name', 'duration', 'genres']
                    }
                ],
                where: {
                    ...filters
                },
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true
            });
            const groupedReservations = reservations.reduce((acc: { [key: string]: any }, reservation) => {
                const reservationId = reservation.id;
                if (!acc[reservationId]) {
                    acc[reservationId] = {
                        ...reservation,
                        room: {
                            ...reservation.room,
                            seats: []
                        }
                    };
                }
                acc[reservationId].room.seats.push(reservation.room.seats);
                return acc;
            }, {});

            const result = Object.values(groupedReservations);
            debug('<%s> Query successfull', rquid);
            return { status: 200, data: result }
        } catch (error) {
            debug(`<${rquid}> - Error rooms: ${error}`);
            throw error;
        }
    }

    public static async createReservation(rquid: string, userId: string, body: Reservation) {
        debug('<%s> Start create reservation by user', rquid);
        const { seats, ...bodyInfo } = body;
        try {
            const reservation = await ReservationModel.findOne({
                where: {
                    userUuid: userId,
                    startTime: body.startTime,

                },
                raw: true
            });
            if (reservation) {
                debug('<%s> User already has a reservation', rquid);
                return { status: 403, data: 'User already has a reservation'}
            }

             const reservationCreated = await ReservationModel.create({
                ...bodyInfo,
                userUuid: userId
             }, {
                    fields: Object.keys({...bodyInfo, userUuid: userId }),
                    raw: true
            });

            const seatsTranformation = seats.map((seat) => {
                return {
                    seatCode: seat.seatCode,
                    roomId: body.roomId
                }
            });
            await SeatService.createSeats(rquid, seatsTranformation);
            debug('<%s> Reservation created', rquid);
            return { status: 200, data: reservationCreated }
        } catch (error) {
            debug(`<${rquid}> - Error creating reservation: ${error}`);
            throw error;
        }
    }

}