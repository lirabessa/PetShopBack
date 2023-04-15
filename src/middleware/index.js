require('dotenv').config()
const jwt = require ("jsonwebtoken")


const gerarToken = (usuario) => {
    const JWT_SECRET = process.env.JWT_SECRET || "gersu"
    const token = jwt.sign(usuario, JWT_SECRET)
    return token
}

module.exports = {gerarToken}