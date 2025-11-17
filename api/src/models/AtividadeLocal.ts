
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Atividade from "./Atividade";

@Table({
    tableName: 'AtividadeLocal',
    timestamps: false
})
export default class AtividadeLocal extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,     
        autoIncrement: true   
    })
    id!: number;

    @Column({
        type: DataType.STRING(150),
        allowNull: true
    })
    localizacao?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    lat?: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    long?: number;

    @ForeignKey(() => Atividade)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    atividadeId!: number;

    @BelongsTo(() => Atividade)
    atividade: Atividade;

}