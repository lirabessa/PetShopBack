const mongoose = require('mongoose');

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

async function startDB(){
    await mongoose.connect(`mongodb+srv://Lirabessa11:abcd0102@meubanquinho.qppkdbq.mongodb.net/PetShop`);
}

module.exports = startDB;