const mongoose = require ('mongoose');
const uploadModel = require('./uploadModel');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Funcionario = new Schema(
    {
      idFunc: ObjectId,
      nomeFunc: String,
      endereco:{
        rua: String,
        bairro: String,
        cidade:String,
        estado:String,
        pais:String,
        cep: String
      },
      telefone:String,
      email:{
        type: String,
        required: [true, 'O campo email é obrigatório']
      },
      password:String,
      cpf: String,
      foto:{
        ref: uploadModel,
        type:mongoose.Types.ObjectId
      }
});

const Funcionarios = mongoose.model ('funcionario', Funcionario)

module.exports = Funcionarios

