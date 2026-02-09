import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";
import Mybini from "./mybini_model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    port: dbConfig.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.mybini = Mybini(sequelize, Sequelize);

export default db;