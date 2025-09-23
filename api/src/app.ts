import router from "./routes";
import sequelize from "./config/db_connection"; 
import { registerSwagger } from "./interfaces/swaggers/swagger";

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
registerSwagger(app)

const PORT = process.env.API_PORT || 5000;

sequelize.sync({ force: false }) 
  .then(async () => {
    console.log('Database synchronized');

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });