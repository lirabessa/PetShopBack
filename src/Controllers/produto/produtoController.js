const Produtos = require ('../../Modelos/produtoModel')

class ProdutoController{
    async create (req, res){
        try {
            const criarProduto = await Produtos.create(req.body)
            return res.status(201).json({message: "Produto criado"})
        } catch (error) {
            res.status (500).json ({message: 'erro'})
        }
    }

    async findOne (req, res){
        try {
            const {id} = req.params
            const readProduto = await Produtos.findById(id)
            return res.status(302).json({readProduto})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"}) 
        }
    }

    async find (req,res){
        try {
            const readProdutos = await Produtos.find()
            return res.status(302).json({message: 'Não encontrado'})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"}) 
        }
    }

    async destroy(req, res){
        try {
            const {id}= req.params
            const excluirProduto = await Produtos.findByIdAndDelete(id)
            return res.status(200).json({message:"Produto deletado :("})
        } catch (error) {
            res.status(404).json({message: "Não encontrado"}) 
        }
    }

    async update(req,res){
        try {
            const {id} = req.params.id
            const {nomeProd, preco} = req.body
            const atualizarProduto = await Produtos.findById(id)
            if(atualizarProduto){
                if(nomeProd){
                    atualizarProduto.nomeProd = nomeProd
                }
                if(preco){
                    atualizarProduto.preco = preco
                }
                await atualizarProduto.save()
                return res.status(200).json({message:"Produto atualizado :("})
            }
        } catch (error) {
            res.status(404).json({message: "Não encontrado"}) 
        }
    }
}

module.exports = new ProdutoController()