import { BelongsTo, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SeatModel } from './SeatModel';
import { ReservationModel } from './ReservationModel';
import { MovieModel } from './MovieModel';
import { GenreModel } from './GenreModel';

@Table({tableName: 'reserved_seats'})
export class ReservedSeatModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'movie_id', type: DataType.INTEGER })
    public movieId!: number;

    @Column({ field: 'genre_id', type: DataType.INTEGER })
    public genreId!: number;

    @BelongsTo(() => MovieModel, {
        foreignKey: 'movie_id',
        as: 'movies',
        targetKey: 'id'
    })
    public movies!: SeatModel;

    @BelongsTo(() => GenreModel, {
        foreignKey: 'genre_id',
        as: 'genres',
        targetKey: 'id'
    })
    public genres!: GenreModel;
}