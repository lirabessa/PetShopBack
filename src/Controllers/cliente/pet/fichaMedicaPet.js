const FichaMedicaPet = require ('../../../Modelos/fichaMedicaPetModel');
const Clientes = require('../../../Modelos/clienteModel');


class FichaMedicaPetController {
  async create(req, res) {
    try {
      const idCliente = req.params.idCliente ||res.app.locals.jwtPayload._id;
      const cliente = await Clientes.findById(idCliente)
      const idPet = req.params.id;
      const pet = await cliente.dependentes.filter(pet => pet._id == idPet)[0]
      const ficha = req.body
      pet.fichaMedica.push(ficha)
      // ordena por data
      pet.fichaMedica = pet.fichaMedica.sort(function(a,b){
        return new Date(b.data) - new Date(a.data);
      });
      await cliente.save();
      return res.status(201).json({ message: "Pet", pet });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "erro" });
    }
  }

  async find (req, res){
    try {
      const idCliente = req.params.idCliente ||res.app.locals.jwtPayload._id;
      const idPet = req.params.id;
      const cliente = await Clientes.findById(idCliente)
      const pet = cliente.dependentes.filter(pet => pet._id == idPet)[0]
      // ordena por datas
      const fichas = pet.fichaMedica.sort(function(a,b){
        return new Date(b.data) - new Date(a.data);
      });
      return res.status(200).json(fichas)
    } catch (error) {
      res.status(500).json({ message: "ficha medica não encontrado :(" });
    }
  }

  async delete (req, res) {
    try {
      const idFicha = req.params.id
      // apenas uma busca no banco de dados buscando cliente que tem pet com a ficha medica do id
      const cliente = await Clientes.findOne({'dependentes.fichaMedica._id': idFicha}).populate('dependentes');
      // filtra pet da ficha medica
      const pet = cliente.dependentes.find(pet => {
        return pet.fichaMedica.some(ficha => ficha._id.toString() === idFicha)
      })
      // exclui ficha medica
      pet.fichaMedica = pet.fichaMedica.filter(ficha => ficha._id.toString() !== idFicha)
      await cliente.save()
      // ordena por datas
      const fichas = pet.fichaMedica.sort(function(a,b){
        return new Date(b.data) - new Date(a.data);
      });
      return res.status(200).json(fichas)
    } catch (error) {
      return res.status(500).json({message: 'error', error})
    }
  }
}

module.exports = new FichaMedicaPetController();
