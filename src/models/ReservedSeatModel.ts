import { BelongsTo, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SeatModel } from './SeatModel';
import { ReservationModel } from './ReservationModel';

@Table({tableName: 'reserved_seats'})
export class ReservedSeatModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'reservation_id', type: DataType.INTEGER })
    public reservationId!: number;

    @Column({ field: 'seat_id', type: DataType.INTEGER })
    public seatId!: number;

    @BelongsTo(() => SeatModel, {
        foreignKey: 'seat_id',
        as: 'seats',
        targetKey: 'id'
    })
    public seat!: SeatModel[];

    @BelongsTo(() => ReservationModel, {
        foreignKey: 'reservation_id',
        as: 'reservations',
        targetKey: 'id'
    })
    public reservation!: SeatModel[];
}