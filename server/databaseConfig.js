import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const host = process.env.PG_HOST
const databaseName = process.env.PG_NAME
const password = process.env.PG_PASSWORD
const user = process.env.PG_USER

export const db = new Sequelize(databaseName, user, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    },

    pool: {
        max: 5,
        min: 0,
        idle: 5
    }
})

export const dataTypes = Sequelize.DataTypes