import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ClassificationModel } from './ClassificationModel';

@Table({tableName: 'movies'})
export class MovieModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'title', type: DataType.STRING, unique: true })
    public name!: string;

    @Column({ field: 'release_date', type: DataType.INTEGER })
    public releaseDate!: number;

    @Column({ field: 'genres', type: DataType.ARRAY(DataType.STRING) })
    public genres!: string[];

    @Column({ field: 'duration', type: DataType.INTEGER })
    public duration!: number;

    @Column({ field: 'classification_id', type: DataType.INTEGER })
    public classificationId!: number;

    @Column({ field: 'description', type: DataType.TEXT })
    public description!: string;

    @Column({ field: 'image_url', type: DataType.TEXT, defaultValue: null })
    public imageUrl?: string;

    @Column({ field: 'created_at', type: DataType.DATE, defaultValue: DataType.NOW })
    public createdAt!: Date;

    @Column({ field: 'updated_at', type: DataType.DATE, defaultValue: null })
    public updatedAt!: Date;

    @BelongsTo(() => ClassificationModel, {
        as: 'classification',
        foreignKey: 'classification_id',
        targetKey: 'id',
    })
    public classification!: ClassificationModel;
}