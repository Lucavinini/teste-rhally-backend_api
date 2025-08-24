const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define a rota para criar um usuário.
// Quando uma requisição POST chegar em '/users', ela chamará a função 'createUser'.
router.post('/users', userController.createUser);

// Rota para listar todos os usuários
router.get('/users', userController.getAllUsers);

// Rota para atualizar um usuário existente pelo ID
router.put('/users/:id', userController.updateUser);

// Rota para deletar com base no ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;