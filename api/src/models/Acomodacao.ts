import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import Avaliacao from "./Avaliacao";
import Viagem from "./Viagem";

@Table({
    tableName: 'Acomodacao',
    timestamps: false
})
export default class Acomodacao extends Model {
    
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
        type: DataType.FLOAT,
        allowNull: false
    })
    preco!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    tipo!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    localizacao!: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: true
    })
    gps_long!: number;

    @Column({
        type: DataType.DECIMAL,
        allowNull: true
    })
    gps_lat!: number;

    @Column({
        type: DataType.TIME,
        allowNull: false
    })
    check_in!: string;

    @Column({
        type: DataType.TIME,
        allowNull: false
    })
    check_out!: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    data_entrada!: Date;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    data_saida!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    dias!: number;

    @ForeignKey(() => Viagem)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    viagemId!: number;

    @BelongsTo(() => Viagem)
    viagem: Viagem;

    @HasOne(() => Avaliacao)
    avaliacao?: Avaliacao;
}
