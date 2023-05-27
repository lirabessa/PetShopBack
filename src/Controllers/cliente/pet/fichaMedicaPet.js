const FichaMedicaPet = require('../../../Modelos/fichaMedicaPetModel');
const Clientes = require('../../../Modelos/clienteModel');


class FichaMedicaPetController {
  async create(req, res) {
    try {
      const idCliente = res.locals.jwtPayload._id;
      const cliente = await Clientes.findById(idCliente)
      const idPet = req.params.id;
      console.log("nomePet:", idPet);
      cliente.dependentes.forEach(pet =>{
        if(pet._id === idPet){
          pet.fichaMedica.push(req.body)
          console.log(pet)
        }
      })
      console.log(cliente.dependentes)

      // console.log(cliente.dependentes)

      //cliente.dependentes.fichaMedica.push(req.body);
      await cliente.save();
      return res.status(201).json({ message: "Pet", cliente });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "erro" });
    }
  }
}

module.exports = new FichaMedicaPetController();
