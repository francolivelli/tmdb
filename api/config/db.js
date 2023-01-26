const Sequelize = require("sequelize");
const envs = require("../config/envs");

const db = new Sequelize(envs.DB_HOST, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
