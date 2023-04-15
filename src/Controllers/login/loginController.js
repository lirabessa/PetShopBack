const Cliente = require ('../../Modelos/clienteModel')
const Funcionarios = require('../../Modelos/funcionarioModel')
const {gerarToken} = require('../../middleware/index')

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const usuario = await Cliente.findOne({email,password})
        const funcionario = await Funcionarios.findOne({email,password})

        if(usuario){
            const token = gerarToken(usuario.toJSON())
            console.log(token);
            return res.status(200).json({token,tipo:"Cliente"}) //se eu precisar colocar o nome ou alguma info no front eu tenho que colocar aqui
        }else if (funcionario){
            const token = gerarToken(funcionario.toJSON())
            console.log(token);
            return res.status(200).json({token, tipo:"Funcionario"})
        }
        else{
            return res.status(401).json({message: "email ou senha errada"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports = login