import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Atividade from "./Atividade";

@Table({
    tableName: 'AtividadeCategoria',
    timestamps: false
})
export default class AtividadeCategoria extends Model {
    
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

    @HasMany(() => Atividade)
    atividades: Atividade[];
}