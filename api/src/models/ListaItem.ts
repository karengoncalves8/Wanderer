import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import Lista from "./Lista";

@Table({
    tableName: 'ListaItem',
    timestamps: false
})
export default class ListaItem extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,     
        autoIncrement: true   
    })
    id!: number;

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    nome!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    status!: boolean;

    @ForeignKey(() => Lista)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    listaId!: number  

    @BelongsTo(() => Lista)
    lista: Lista;
}
