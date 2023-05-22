require('dotenv').config()
const jwt = require ("jsonwebtoken")


const JWT_SECRET = process.env.JWT_SECRET || "gersu"
const gerarToken = (usuario) => {
    const token = jwt.sign(usuario, JWT_SECRET)
    const decoded = jwt.verify(token, JWT_SECRET);
   
    return token
}

const UNAUTHORIZED_ERROR_MESSAGE = 'Usuario não possui autorização necessaria para está ação....'
const authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization;
   

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: UNAUTHORIZED_ERROR_MESSAGE });
    }

    try {
        const [, token] = authorization.split(" ")
    
        const decoded = jwt.verify(token, JWT_SECRET);
       
        res.locals.jwtPayload = decoded;
    } catch (error) {
        res.status(401).send({ error: UNAUTHORIZED_ERROR_MESSAGE });
    }

    next();
};

module.exports = {gerarToken, authenticate}