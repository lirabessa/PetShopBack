const {Router} = require ('express');
const funcionarioController = require ('./Controllers/funcionario/funcionarioControler')
const clienteController = require ('./Controllers/cliente/clienteController');
const login = require('./Controllers/login/loginController');
const uploadController = require ('./Controllers/uploads/uploadsController')
const upload = require ('./config/multer')
const produtoController = require('./Controllers/produto/produtoController')


const routes = Router();

routes.get('/', (req,res) => {
    return res.status(200).json({message: "Servidor online"})
});

routes.post('/login', login)

routes.post('/funcionario' , funcionarioController.create )
routes.get('/funcionarios' , funcionarioController.find)
routes.get('/funcionario/:id' , funcionarioController.findOne)
routes.delete('/funcionario/:id' , funcionarioController.destroy)
routes.put ('/funcionario/:id' , funcionarioController.update)

routes.post('/cliente' , clienteController.create)
routes.get('/clientes' , clienteController.find)
routes.get('/cliente/:id' , clienteController.findOne)
routes.delete('/cliente/:id' , clienteController.destroy)
routes.put('/cliente/:id' , clienteController.update)

routes.post('/produto', produtoController.create)
routes.get('/produto' , produtoController.find)
routes.get('/produto/:id' , produtoController.findOne)
routes.delete('/produto/:id' , produtoController.destroy)
routes.put('/produto/:id' , produtoController.update)

routes.post('/uploads', upload.single("File"), uploadController.create)
routes.get('/uploads' , uploadController.findAll)
routes.delete('/uploads' , uploadController.remove)

module.exports = routes;