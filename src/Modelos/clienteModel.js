const mongoose = require ('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Pet = new Schema(
  {
    idPet: ObjectId,
    nomeDep: String,
    raca: String
  }
);

const Cliente = new Schema(
    {
  idCli: ObjectId,
  nomeCli: String,
  endereço:{
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
  dependentes: [Pet]
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