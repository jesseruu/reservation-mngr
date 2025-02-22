import { BelongsTo, Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { GenreModel } from './GenreModel';
import { ClassificationModel } from './ClassificationModel';

@Table({tableName: 'movies'})
export class MovieModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'title', type: DataType.STRING })
    public name!: string;

    @Column({ field: 'duration', type: DataType.INTEGER })
    public duration!: number;

    @Column({ field: 'genre_id', type: DataType.DATE })
    public genreId!: number;

    @Column({ field: 'classification_id', type: DataType.DATE })
    public classificationId!: number;

    @Column({ field: 'description', type: DataType.TEXT })
    public description!: string;

    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt!: Date;

    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt!: Date;

    @BelongsTo(() => GenreModel, {
        as: 'genre',
        foreignKey: 'genre_id',
        targetKey: 'id',
    })
    public genre!: GenreModel;

    @BelongsTo(() => ClassificationModel, {
        as: 'classification',
        foreignKey: 'classification_id',
        targetKey: 'id',
    })
    public classification!: ClassificationModel;
}