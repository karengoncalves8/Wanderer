import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import AtividadeCategoria from "./AtividadeCategoria";
import AtividadeLocal from "./AtividadeLocal";
import Avaliacao from "./Avaliacao";
import Viagem from "./Viagem";

@Table({
    tableName: 'Atividade',
    timestamps: false
})
export default class Atividade extends Model {
    
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
        type: DataType.DATE,
        allowNull: false
    })
    data!: Date;

    @Column({
        type: DataType.TIME,
        allowNull: true
    })
    hora_inicio?: string;

    @Column({
        type: DataType.TIME,
        allowNull: true
    })
    hora_fim?: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    preco?: number;

    @ForeignKey(() => AtividadeCategoria)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    atividadeCategoriaId!: number;

    @BelongsTo(() => AtividadeCategoria)
    atividadeCategoria: AtividadeCategoria;

    @ForeignKey(() => Viagem)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    viagemId!: number;

    @BelongsTo(() => Viagem)
    viagem: Viagem;

    @HasOne(() => AtividadeLocal)
    atividadeLocal?: AtividadeLocal;

    @HasOne(() => Avaliacao)
    avaliacao?: Avaliacao;
}