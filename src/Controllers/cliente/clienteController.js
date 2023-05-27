const Cliente = require ('../../Modelos/clienteModel')

class clienteController {
    async create (req, res){

        try {
        const criarCliente = await Cliente.create(req.body);
        return res.status(201).json({message:"Cliente criado :)", criarCliente});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "erro"})
        }
    }

    async find (req, res){

        try {
            const readCliente = await Cliente.find().populate('produtos').exec();
            return res.status(302).json({readCliente})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"})
        }
    }

    async findOne (req, res){

        try {
            const{id} = req.params
            const readCliente = await Cliente.findOne({_id: id}).populate('produtos foto').exec(); 
            return res.status(302).json({readCliente})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"})
        }
    }

    async destroy (req, res){

        try {
            const{id} = req.params
            const deletarCliente = await Cliente.findByIdAndDelete (id);
            return res.status(200).json({message: "Cliente deletado :("})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"})
        }
    }

    async update (req, res){

        try {
            const id = req.params.id
            const {nomeCli, rua, bairro, cidade, estado,pais, cep , telefone, email, cpf } = req.body       
            const atualizarCliente = await Cliente.findById (id);

            if (atualizarCliente){
                if (nomeCli){
                    atualizarCliente.nomeCli = nomeCli
                }
                if(rua){
                    atualizarCliente.endereco.rua = rua
                }
                if(bairro){
                    atualizarCliente.endereco.bairro = bairro
                }
                if(cidade){
                    atualizarCliente.endereco.cidade = cidade
                }
                if(estado){
                    atualizarCliente.endereco.estado = estado
                }
                if(pais){
                    atualizarCliente.endereco.pais = pais
                }
                if(cep){
                    atualizarCliente.endereco.cep = cep
                }
                if(telefone){
                    atualizarCliente.telefone = telefone
                }
                if(email){
                    atualizarCliente.email = email
                }
                if(cpf){
                    atualizarCliente.cpf = cpf
                }
                
                await atualizarCliente.save()
                return res.status(200).json({message: "Cliente Atualizado" , atualizarCliente})
                
            }
        } catch (error) {
            res.status(404).json({message: "Não encontrado"})
        }
    }

}
module.exports = new clienteController();