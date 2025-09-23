import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'Usuario',
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
        type: DataType.STRING(80),
        allowNull: false
    })
    idioma!: number

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

}