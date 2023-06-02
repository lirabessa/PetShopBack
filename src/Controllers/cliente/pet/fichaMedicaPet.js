const FichaMedicaPet = require ('../../../Modelos/fichaMedicaPetModel');
const Clientes = require('../../../Modelos/clienteModel');


class FichaMedicaPetController {
  async create(req, res) {
    try {
      const idCliente = res.locals.jwtPayload._id;
      const cliente = await Clientes.findById(idCliente)
      console.log(idCliente);
      const idPet = req.params.id;
      const pet = await cliente.dependentes.filter(pet => pet._id == idPet)[0]
      const ficha = req.body
      pet.fichaMedica.push(ficha)
      console.log("antes:", cliente);   
      await cliente.save();
      return res.status(201).json({ message: "Pet", pet });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "erro" });
    }
  }

  async find (req, res){
    try {
      const idCliente  = res.locals.jwtPayload._id
      const cliente = await Clientes.findById(idCliente)
      const idPet = req.params.id;
      const pet = await cliente.dependentes.filter(pet => pet._id == idPet)[0]
      return res.status(302).json(pet.fichaMedica)
    } catch (error) {
      res.status(500).json({ message: "ficha medica não encontrado :(" });
    }
  }
}

module.exports = new FichaMedicaPetController();
