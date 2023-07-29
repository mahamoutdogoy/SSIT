import {Sequelize} from "sequelize";

const db = new Sequelize('immat', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;