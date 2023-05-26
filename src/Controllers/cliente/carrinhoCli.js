const Produtos = require ('../../Modelos/produtoModel')
const Clientes = require ('../../Modelos/clienteModel')

class CarrinhoController{
    async create (req, res){
        try {
            const idCliente = res.locals.jwtPayload._id
            const cliente = await Clientes.findById(idCliente)
            console.log(cliente );
            const idProd = req.params.id
            console.log(idProd, "id prod");
            const produto = await Produtos.findById(idProd)
            console.log(produto);
            cliente.produtos.push(produto._id)
            await cliente.save()
            return res.status(201).json({message :"prod", produto})
        } catch (error) {
            console.log(error);
            res.status(404).json({message: "Não encontrado produto"}) 
        }
    }
}

module.exports = new CarrinhoController();