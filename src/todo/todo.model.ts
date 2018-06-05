import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class Todo extends Model<Todo> {
    @Column({})
    title: string;

    @Column({})
    text: string;
}
