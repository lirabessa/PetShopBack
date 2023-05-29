const Clientes = require('../../../Modelos/clienteModel');
const Pet = require ('../../../Modelos/petModel')

class PetController {
    async create (req,res){
        try {
            const idCliente  = res.locals.jwtPayload._id
            const cliente = await Clientes.findById(idCliente)
            cliente.dependentes.push(req.body)
            await cliente.save()
            console.log(cliente);
            return res.status(201).json({message :"Pet", cliente})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "erro"})
        }
    }

    async find (req, res){
        try {    
            const idCliente  = res.locals.jwtPayload._id
            const cliente = await Clientes.findOne({_id: idCliente}).populate('foto').exec();  
            console.log(cliente);
            return res.status(302).json(cliente.dependentes)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Pet não encontrado :(" });
        }
    }

    async update(req, res){
        try{
            const {idCli, idPet, nomeDep, raca} = req.body;
            const usuario = await Clientes.findById(idCli)
            if(!usuario){
                throw "usuario não encontrado"
            }
            console.log('usuario', usuario)
            usuario.dependentes.forEach(pet => {
                if(pet._id == idPet){
                    if(nomeDep){
                        pet.nomeDep = nomeDep
                    }
                    if(raca){
                        pet.raca = raca
                    }
                }
            });

            await usuario.save()
            res.json(usuario)
        }catch(error){
            console.log(error)
            res.status(500).json(error);
        }
    }

    async delete (req,res){
        try {
            const idCliente  = res.locals.jwtPayload._id
            const idPet = req.params.id
            const cliente = await Clientes.findById(idCliente)
            const pets = cliente.dependentes.filter(pet=> pet._id != idPet)
            cliente.dependentes = pets
            await cliente.save()
            return res.json(pets)
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir o Pet :(" });
        }
    }
}

module.exports = new PetController();