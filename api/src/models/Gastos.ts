import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Despesa from "./Despesa";
import Viagem from "./Viagem";

@Table({
    tableName: 'Gastos',
    timestamps: false
})
export default class Gastos extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,     
        autoIncrement: true   
    })
    id!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    orcamento!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    total!: number;

    @ForeignKey(() => Viagem)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    viagemId!: number;

    @BelongsTo(() => Viagem)
    viagem: Viagem;

    @HasMany(() => Despesa)
    despesas: Despesa[];    
}