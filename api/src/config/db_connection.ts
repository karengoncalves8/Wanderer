import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import Usuario from '../models/Usuario';
import UsuarioPreferencia from '../models/UsuarioPreferencias';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT), 
  dialect: 'postgres',
  models: [Usuario, UsuarioPreferencia],  
});

export default sequelize;