import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Despesa from "./Despesa";

@Table({
    tableName: 'DespesaCategoria',
    timestamps: false
})
export default class DespesaCategoria extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,     
        autoIncrement: true   
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nome!: string;

    @HasMany(() => Despesa)
    despesas: Despesa[];
}