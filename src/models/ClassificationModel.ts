import { AutoIncrement, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({tableName: 'classifications'})
export class ClassificationModel extends Model {
    @Column({ field: 'id', type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    public readonly id!: string;

    @Column({ field: 'name', type: DataType.STRING })
    public name!: string;

    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt!: Date;

    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt!: Date;
}