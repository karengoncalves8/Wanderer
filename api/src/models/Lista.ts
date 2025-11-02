import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import ListaItem from "./ListaItem";
import Viagem from "./Viagem";

@Table({
    tableName: 'Lista',
    timestamps: false
})
export default class Lista extends Model {
    
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
    titulo!: string;

    @ForeignKey(() => Viagem)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    viagemId!: number  

    @BelongsTo(() => Viagem)
    viagem: Viagem;

    @HasMany(() => ListaItem)
    listaItems: ListaItem[];    
}
