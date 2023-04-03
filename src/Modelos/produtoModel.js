const mongoose = require ('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Produto = new Schema(
   {
    idProd: ObjectId,
    nomeProd: String,
    preco: String  
   } 
);

const Produtos = mongoose.model ('produtos', Produto)

module.exports = Produtos;