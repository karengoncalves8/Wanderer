import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ClassePassagem } from "../enums/ClassePassagem";
import PassagemLocal from "./PassagemLocal";
import Viagem from "./Viagem";

@Table({
    tableName: 'Passagem',
    timestamps: false
})
export default class Passagem extends Model {
    
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
    companhia!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    classe!: ClassePassagem;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    preco!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    duracao!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    numero!: number;

    @Column({
        type: DataType.BLOB('long'),
        allowNull: true
    })
    arquivo_pdf?: Buffer;

    @ForeignKey(() => Viagem)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    viagemId!: number  

    @BelongsTo(() => Viagem)
    viagem: Viagem;

    @HasMany(() => PassagemLocal)
    passagemLocais: PassagemLocal[];
}
