import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { ViagemStatus } from "../enums/ViagemStatus";
import Acomodacao from "./Acomodacao";
import Gastos from "./Gastos";
import Passagem from "./Passagem";
import Usuario from "./Usuario";

@Table({
    tableName: 'Viagem',
    timestamps: false
})
export default class Viagem extends Model {
    
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,     
        autoIncrement: true   
    })
    id!: number

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    nome!: string

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    dataIda!: Date

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    dataVolta!: Date

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    duracao!: number

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    destino_cidade!: string 

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    destino_pais!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    status!: ViagemStatus

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    img_url?: string

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    usuario_id!: number

    @BelongsTo(() => Usuario)
    usuario: Usuario;

    @HasOne(() => Gastos)
    gastos: Gastos;

    @HasMany(() => Acomodacao)
    acomodacoes: Acomodacao[];

    @HasMany(() => Passagem)
    passagens: Passagem[];
}