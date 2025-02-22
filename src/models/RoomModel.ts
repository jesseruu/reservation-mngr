import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SeatModel } from './SeatModel';

@Table({tableName: 'rooms'})
export class RoomModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'name', type: DataType.STRING, unique: true })
    public name!: string;

    @Column({ field: 'seat_numbers', type: DataType.INTEGER })
    public seatNumbers!: number;

    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt!: Date;

    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt!: Date;

    @HasMany(() => SeatModel, {
        foreignKey: 'room_id',
        as: 'seats',
        sourceKey: 'id'
    })
    public seats!: SeatModel[];
}