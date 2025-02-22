import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ReservationModel } from './ReservationModel';

@Table({tableName: 'users'})
export class UserModel extends Model {
    @Column({ field: 'id', type: DataType.UUIDV4, primaryKey: true })
    public readonly id!: string;

    @Column({ field: 'name', type: DataType.STRING })
    public name!: string;

    @Column({ field: 'email', type: DataType.STRING, unique: true })
    public email!: string;

    @Column({ field: 'created_at', type: DataType.DATE })
    public createdAt!: Date;

    @Column({ field: 'updated_at', type: DataType.DATE })
    public updatedAt!: Date;

    @HasMany(() => ReservationModel, {
        as: 'reservations',
        foreignKey: 'user_uuid',
        sourceKey: 'id'
    })
    public reservations!: ReservationModel[];
}