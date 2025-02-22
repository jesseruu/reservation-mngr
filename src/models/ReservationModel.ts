import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { GenreModel } from './GenreModel';
import { ClassificationModel } from './ClassificationModel';
import { MovieModel } from './MovieModel';
import { RoomModel } from './RoomModel';

@Table({tableName: 'reservations'})
export class ReservationModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'start_time', type: DataType.DATE })
    public startTime!: Date;

    @Column({ field: 'movie_id', type: DataType.INTEGER })
    public movie_id!: number;

    @Column({ field: 'room_id', type: DataType.DATE })
    public room_id!: number;

    @Column({ field: 'user_uuid', type: DataType.UUIDV4 })
    public userUuid!: string;

    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt!: Date;

    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt!: Date;

    @BelongsTo(() => MovieModel, {
        as: 'movie',
        foreignKey: 'movie_id',
        targetKey: 'id',
    })
    public movie!: MovieModel;

    @BelongsTo(() => RoomModel, {
        as: 'room',
        foreignKey: 'room_id',
        targetKey: 'id',
    })
    public room!: RoomModel;
}