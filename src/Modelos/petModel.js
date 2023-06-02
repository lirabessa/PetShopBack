const mongoose = require ('mongoose');
const uploadModel = require('./uploadModel');
const FichaMedica = require('./fichaMedicaPetModel')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Pet = new Schema(
  {
    idPet: ObjectId,
    nomeDep: String,
    raca: String,
    foto:{
      ref: uploadModel,
      type:mongoose.Types.ObjectId
    },
    fichaMedica:[FichaMedica]
  }
);

module.exports = Pet

