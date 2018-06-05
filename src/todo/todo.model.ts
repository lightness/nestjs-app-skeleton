import { Table, Column, Model, Length } from 'sequelize-typescript';

@Table
export default class Todo extends Model<Todo> {
    @Column({})
    title: string;

    @Length({ min: 3, max: 10 })
    @Column({})
    text: string;
}
