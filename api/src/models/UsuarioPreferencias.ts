import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { PrefAcomodacao, PrefIdioma, PrefOrcamento, PrefTransporte } from '../enums/UsuarioPreferenciaEnums'
import Usuario from './Usuario'

@Table({
    tableName: 'UsuarioPreferencia',
    timestamps: false
})
export default class UsuarioPreferencia extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,     
        autoIncrement: true   
    })
    id!: number

    @Column({
        type: DataType.ENUM('pt', 'en', 'es', 'fr'),
        allowNull: false
    })
    idioma!: PrefIdioma 

    @Column({
        type: DataType.ENUM('carro', 'onibus', 'aviao', 'trem'), 
        allowNull: false
    })
    transporte!: PrefTransporte

    @Column({
        type: DataType.ENUM('hotel', 'apartamento', 'hostel', 'pousada'), // Exemplos de acomodação
        allowNull: false
    })
    acomodacao!: PrefAcomodacao

    @Column({
        type: DataType.ENUM('baixo', 'medio', 'alto'), // Exemplos de orcamento
        allowNull: false
    })
    orcamento!: PrefOrcamento

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    usuarioId!: number  

    @BelongsTo(() => Usuario)
    usuario: Usuario;
}
