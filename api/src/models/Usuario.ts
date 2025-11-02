import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import UsuarioPreferencia from './UsuarioPreferencias'
import Viagem from './Viagem'
    
@Table({
    tableName: 'Usuario',
    timestamps: false
})
export default class Usuario extends Model {

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
        type: DataType.STRING(80),
        allowNull: false
    })
    email!: string

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    senha!: string

    @Column({
        type: DataType.DATEONLY(),
        allowNull: false
    })
    dataNascimento!: Date

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    cidade!: string

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    pais!: string

    @HasOne(() => UsuarioPreferencia)
    preferencias: UsuarioPreferencia;

    @HasMany(() => Viagem)
    viagens: Viagem[];
}