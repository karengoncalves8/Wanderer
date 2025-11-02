import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import DespesaCategoria from "./DespesaCategoria";
import Gastos from "./Gastos";

@Table({
    tableName: 'Despesa',
    timestamps: false
})
export default class Despesa extends Model {

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

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    valor!: number;

    @ForeignKey(() => Gastos)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    gastosId!: number  

    @BelongsTo(() => Gastos)
    gastos: Gastos;

    @ForeignKey(() => DespesaCategoria)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    despesaCategoriaId!: number  

    @BelongsTo(() => DespesaCategoria)
    despesaCategoria: DespesaCategoria;
}