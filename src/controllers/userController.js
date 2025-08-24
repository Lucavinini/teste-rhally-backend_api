const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');   

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const novoUsuario = await User.create({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error(error);
    if (error.message.includes('e-mail já está em uso')) {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: 'Ocorreu um erro inesperado ao criar o usuário.' });
  }
};

// Função para listar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// Função para atualizar um usuário
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
    }
    const usuarioAtualizado = await User.update(id, { nome, email });
    if (!usuarioAtualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.error(error);
    if (error.message.includes('e-mail já está em uso')) {
        return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: 'Erro ao atualizar usuário.' });
  }
};

//Função para deletar um usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await User.delete(id);
    if (!usuarioDeletado) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário.' });
  }
};

// Função para login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const isPasswordMatch = await bcrypt.compare(senha, user.senha);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
    );
    res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};