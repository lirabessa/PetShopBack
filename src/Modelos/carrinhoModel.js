const mongoose = require ('mongoose');
const Produtos = require ('./produtoModel')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Carrinho = new Schema(
    {
        idProd:{
            type:mongoose.Types.ObjectId,
            ref:Produtos
        }
    }
)

module.exports = Carrinho