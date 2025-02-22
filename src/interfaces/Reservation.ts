import { Seats } from "./Seats";

export interface Reservation {
    startTime: Date,
    movieId: number,
    roomId: number,
    seats: Seats[]
}