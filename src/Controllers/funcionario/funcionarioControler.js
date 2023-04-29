const Funcionarios = require ('../../Modelos/funcionarioModel')

class funcionarioController {
    async create (req, res){
        try {
            const criarFuncionario = await Funcionarios.create(req.body);
        return res.status(201).json({message: "Funcionario criado :)"});
        } catch (error) {
            res.status(500).json({message: "erro"})
        }
    }

    async findOne (req, res){
        try {
            const {id} =req.params;
            const readFuncionario = await Funcionarios.findById(id);
            return res.status(302).json({readFuncionario})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"}) 
        }
    }

    async find (req, res){

        try {
            const readFuncionarios = await Funcionarios.find();
            return res.status(302).json({readFuncionarios})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"}) 
        }   
    }

    async destroy (req , res){
        try {
            const {id} = req.params;
            const deletarFuncionario = await Funcionarios.findByIdAndDelete(id);
            return res.status(200).json({message:"Funcionario deletado :("})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"}) 
        }
    }

    async update (req , res){
        try {
            const id = req.params.id;
            const {nomeFunc, rua, bairro, cidade, estado,pais, cep , telefone, email, cpf } = req.body
            const updateFuncionario = await Funcionarios.findById (id);
            console.log(updateFuncionario);
            if (updateFuncionario){
                if (nomeFunc){
                    updateFuncionario.nomeFunc = nomeFunc
                }
                if(rua){
                    updateFuncionario.endereco.rua = rua
                }
                if(bairro){
                    updateFuncionario.endereco.bairro = bairro
                }
                if(cidade){
                    updateFuncionario.endereco.cidade = cidade
                }
                if(estado){
                    updateFuncionario.endereco.estado = estado
                }
                if(pais){
                    updateFuncionario.endereco.pais = pais
                }
                if(cep){
                    updateFuncionario.endereco.cep = cep
                }
                if(telefone){
                    updateFuncionario.telefone = telefone
                }
                if(email){
                    updateFuncionario.email = email
                }
                if(cpf){
                    updateFuncionario.cpf = cpf
                }
            
                await updateFuncionario.save()
                return res.status(200).json({message: "Funcionario atualizado", updateFuncionario})
            } 
        }catch (error) {
            console.log(error);
            res.status(404).json({message: "Não encontrado"}) 
        }
    }


}
module.exports = new funcionarioController();