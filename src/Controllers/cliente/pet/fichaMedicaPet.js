const FichaMedicaPet = require('../../../Modelos/fichaMedicaPetModel');
const Clientes = require('../../../Modelos/clienteModel');

class FichaMedicaPetController {
  async create(req, res) {
    try {
      const idCliente = res.locals.jwtPayload._id;
      const cliente = await Clientes.findById(idCliente)
      const idPet = req.params.id;
      console.log("nomePet:", idPet);

      if (!cliente.dependentes.fichaMedica) {
        cliente.dependentes.fichaMedica = []; // Inicializar como um array vazio
      }

      cliente.dependentes.fichaMedica.push(req.body);
      await cliente.save();
      return res.status(201).json({ message: "Pet", cliente });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "erro" });
    }
  }
}

module.exports = new FichaMedicaPetController();
