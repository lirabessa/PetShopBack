const {Router} = require ('express');
const funcionarioController = require ('./Controllers/funcionario/funcionarioControler')
const clienteController = require ('./Controllers/cliente/clienteController');
const login = require('./Controllers/login/loginController');
const uploadController = require ('./Controllers/uploads/uploadsController')
const {upload, uploadDrive} = require ('./config/multer')
const produtoController = require('./Controllers/produto/produtoController');
const { authenticate } = require('./middleware');
const petController = require ('./Controllers/cliente/pet/petController')
const carrinhoController = require ('./Controllers/produto/carrinhoCli');
const fichaMedicaController = require('./Controllers/cliente/pet/fichaMedicaPet');

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
routes.get('/produtos' , produtoController.find)
routes.get('/produto/:id' , produtoController.findOne)
routes.delete('/produto/:id' , produtoController.destroy)
routes.put('/produto/:id' , produtoController.update)

routes.post('/uploads', upload.single("File"), uploadController.create)
routes.post('/drive',authenticate, uploadDrive.single("File"), uploadController.createDrive)
routes.get('/uploads' , uploadController.findAll)
routes.delete('/uploads' , uploadController.remove)

routes.post('/pet' , authenticate, petController.create)
routes.get('/pets', authenticate, petController.find)
routes.put('/pet', petController.update)
routes.delete('/pet/:id', authenticate, petController.delete)

routes.post('/carrinho/:id', authenticate, carrinhoController.create)
routes.delete('/carrinho/:id', authenticate, carrinhoController.delete)
routes.get('/carrinhos', authenticate, carrinhoController.find)

routes.post ('/fichaMedica/:id', authenticate , fichaMedicaController.create)

module.exports = routes;