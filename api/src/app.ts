import dotenv from 'dotenv';
import sequelize from "./config/db_connection";
import { conn_mongo } from "./config/mongo_connection";
import { registerSwagger } from "./interfaces/swaggers/swagger";
import router from "./routes";
import runSeed from './seeds/seed';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

// More permissive CORS for mobile apps
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
registerSwagger(app)

const PORT = process.env.API_PORT || 5000;

conn_mongo()

sequelize.sync({ force: false }) 
  .then(async () => {
    console.log('Database synchronized');

    await runSeed();
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Server accessible at http://0.0.0.0:${PORT}`);
      console.log(`Local network: http://${process.env.IP_ADDRESS}:${PORT}`);
    });

  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });