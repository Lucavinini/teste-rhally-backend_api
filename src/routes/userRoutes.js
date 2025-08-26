const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); 

//Rotas Públicas (acessíveis sem token)
// Rota para criar um novo usuário (cadastro)
router.post('/users', userController.createUser);

// Rota para login de usuário
router.post('/login', userController.login);


// Rotas Privadas (exigem token de autenticação)
// O middleware é adicionado como um "passo" no meio da requisição.
// Antes de chegar no controller, a requisição passará pelo authMiddleware.

// Rota para listar todos os usuários
router.get('/users', authMiddleware, userController.getAllUsers);

// Rota para atualizar um usuário existente pelo ID
router.put('/users/:id', authMiddleware, userController.updateUser);

// Rota para deletar um usuário pelo ID
router.delete('/users/:id', authMiddleware, userController.deleteUser);


module.exports = router;