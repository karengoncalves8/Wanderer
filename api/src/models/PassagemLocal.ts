
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Passagem from "./Passagem";

@Table({
    tableName: 'PassagemLocal',
    timestamps: false
})
export default class PassagemLocal extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,     
        autoIncrement: true   
    })
    id!: number;

    @Column({
        type: DataType.ENUM('partida', 'chegada'),
        allowNull: false
    })
    tipo!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    data!: Date;

    @Column({
        type: DataType.STRING(80),
        allowNull: true
    })
    localizacao?: string;

    @Column({
        type: DataType.STRING(6),
        allowNull: false
    })
    iata!: string;

    @ForeignKey(() => Passagem)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    passagemId!: number;

    @BelongsTo(() => Passagem)
    passagem: Passagem;

}