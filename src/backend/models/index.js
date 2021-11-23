const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || 'Items',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'Items',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == "true"
    }
  });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Items = require("./item")(sequelize, Sequelize);

module.exports = db;