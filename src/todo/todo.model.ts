import { Column, CreatedAt, Length, Model, Table } from 'sequelize-typescript';

@Table
export default class Todo extends Model<Todo> {
    @Column({})
    public title: string;

    @Length({ min: 3, max: 10 })
    @Column({})
    public text: string;

    @CreatedAt public createdAt: Date;
}
