const mongoose = require ('mongoose');
const uploadModel = require('./uploadModel');
const Pet = require ('./petModel')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cliente = new Schema(
{
  idCli: ObjectId,
  nomeCli: String,
  endereco:{
    rua:String,
    bairro: String,
    cidade:String,
    estado:String,
    pais:String,
    cep: String
  },
  telefone:String,
  email:String,
  password: String,
  cpf: String,
  dependentes: [Pet],
  foto:{
    ref: uploadModel,
    type:mongoose.Types.ObjectId
  }
});


// cliente.pre("save", async function(next){
//   if(!this.isModified("password")){
//     next()
//   }
//   const salt = await bcrypt.grnSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

const Clientes = mongoose.model ('cliente', Cliente)

module.exports = Clientes