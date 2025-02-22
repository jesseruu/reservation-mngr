import { BelongsTo, Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'seats'})
export class SeatModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'seat_code', type: DataType.STRING })
    public seatCode!: string;

    @Column({ field: 'room_id', type: DataType.INTEGER })
    public roomId!: number;

    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt!: Date;

    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt!: Date;
}