const mongoose = require ('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FichaMedica = new Schema(
    {
        idFicha: ObjectId,
        doenca: String,
        tratamento: String,
        custo: String,
        data: Date

    }
)

module.exports = FichaMedica