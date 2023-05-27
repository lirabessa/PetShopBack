const Produtos = require ('../../Modelos/produtoModel')
const Clientes = require ('../../Modelos/clienteModel')
const Carrinho  = require ('../../Modelos/carrinhoModel')
class CarrinhoController{
    async create (req, res){
        try {
            const idCliente = res.locals.jwtPayload._id
            const cliente = await Clientes.findById(idCliente)
            console.log(cliente);
            const idProd = req.params.id
            console.log(idProd, "id prod");
            const produto = await Produtos.findById(idProd)
            const carrinho = {
                idProd: produto._id
            }
            console.log(produto);
            cliente.produtos.push(carrinho)
            await cliente.save()
            return res.status(201).json({message :"prod", produto})
        } catch (error) {
            console.log(error);
            res.status(404).json({message: "Não encontrado produto"}) 
        }
    }

    async delete (req,res){
        try {
            const idCliente  = res.locals.jwtPayload._id
            const idProd = req.params.id
            const cliente = await Clientes.findById(idCliente)
            const prods = cliente.produtos.filter(prod=> prod._id != idProd)
            cliente.produtos = prods
            await cliente.save()
            return res.json(prods)
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir o Produto :(" });
        }
    }

    async find (req, res){
        try {    
            const idCliente  = res.locals.jwtPayload._id
            const cliente = await Clientes.findById(idCliente).populate('produtos').exec(); 
            return res.status(302).json(cliente.produtos)
        } catch (error) {
            res.status(500).json({ message: "Produto não encontrado :(" });
        }
    }
}

module.exports = new CarrinhoController();