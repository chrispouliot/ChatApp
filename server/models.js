import bcrypt from 'bcrypt-nodejs'
import { dataTypes, db } from './databaseConfig'

// Message
export const Message = db.define('message', {
    // I'm going to have so many users
    userId: dataTypes.INTEGER,
    text: dataTypes.TEXT,
    pubId: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4
    }
})
// User
export const User = db.define('user', {
    username: {
        type: dataTypes.STRING,
        unique: true,
        notNull: true,
        validate: {
            len: {
                args: 4,
                msg: "Username must be atleast 4 characters in length"
            }
        }
    },
    password: {
        type: dataTypes.STRING,
        notNull: true,
        validate: {
            len: {
                args: 4,
                msg: "Password must be atleast 4 characters in length"
            }
        }
    },
    pubId: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4
    }
}, {
    instanceMethods: {
        setPassword: password => {
            this.password = bcrypt.hashSync(password)
        },
        validatePassword: password => {
            return bcrypt.compareSync(password, this.password)
        }
    }
})
