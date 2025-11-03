import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import Acomodacao from '../models/Acomodacao';
import Atividade from '../models/Atividade';
import AtividadeCategoria from '../models/AtividadeCategoria';
import AtividadeLocal from '../models/AtividadeLocal';
import Avaliacao from '../models/Avaliacao';
import Despesa from '../models/Despesa';
import DespesaCategoria from '../models/DespesaCategoria';
import Gastos from '../models/Gastos';
import Lista from '../models/Lista';
import ListaItem from '../models/ListaItem';
import Passagem from '../models/Passagem';
import PassagemLocal from '../models/PassagemLocal';
import Usuario from '../models/Usuario';
import UsuarioPreferencia from '../models/UsuarioPreferencias';
import Viagem from '../models/Viagem';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT), 
  dialect: 'mysql',
  models: [Usuario, UsuarioPreferencia, Acomodacao, Atividade, Gastos, Passagem, PassagemLocal, Viagem, Lista, ListaItem, Avaliacao, AtividadeCategoria, AtividadeLocal, Despesa, DespesaCategoria],  
});

export default sequelize;