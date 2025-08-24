const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define a rota para criar um usuário.
// Quando uma requisição POST chegar em '/users', ela chamará a função 'createUser'.
router.post('/users', userController.createUser);

module.exports = router;