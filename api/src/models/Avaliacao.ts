import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Acomodacao from "./Acomodacao";
import Atividade from "./Atividade";

@Table({
    tableName: 'Avaliacao',
    timestamps: false
})
export default class Avaliacao extends Model {

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
    nota!: number;

    @Column({
        type: DataType.STRING(120),
        allowNull: false
    })
    comentario!: string;

    @ForeignKey(() => Acomodacao)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    acomodacaoId?: number;

    @BelongsTo(() => Acomodacao)
    acomodacao?: Acomodacao;    

    @ForeignKey(() => Atividade)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    atividadeId?: number;

    @BelongsTo(() => Atividade)
    atividade?: Atividade;
}