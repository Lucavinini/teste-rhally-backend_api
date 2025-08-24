const User = require('../models/User');

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    // 1. Pega os dados (nome, email, senha) do corpo da requisição
    const { nome, email, senha } = req.body;

    // Validação simples para garantir que os campos não estão vazios
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // 2. Chama a função do Model para criar o usuário no banco
    const novoUsuario = await User.create({ nome, email, senha });

    // 3. Envia uma resposta de sucesso com os dados do usuário criado
    res.status(201).json(novoUsuario);

  } catch (error) {
    // Bloco de erro melhorado para tratar casos específicos

    console.error(error);

    // Se o erro for o de e-mail duplicado que defini no Model,
    // retorna um status 409 (Conflict), que é mais específico para este caso.
    if (error.message.includes('e-mail já está em uso')) {
      return res.status(409).json({ message: error.message });
    }
    
    // Para todos os outros erros inesperados, retorna um erro genérico de servidor.
    res.status(500).json({ message: 'Ocorreu um erro inesperado ao criar o usuário.' });
  }
};

// Função para listar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    // 1. Chama a função do Model para buscar todos os usuários no banco
    const usuarios = await User.findAll();

    // 2. Envia a lista de usuários como resposta
    res.status(200).json(usuarios);

  } catch (error) {
    // Em caso de erro, envia uma resposta de erro do servidor
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
};

// Função para atualizar um usuário
exports.updateUser = async (req, res) => {
  try {
    // 1. Pega o ID do usuário dos parâmetros da URL
    const { id } = req.params;
    // 2. Pega o nome e o email do corpo da requisição
    const { nome, email } = req.body;

    // Validação simples
    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
    }

    // 3. Chama a função do Model para atualizar o usuário no banco
    const usuarioAtualizado = await User.update(id, { nome, email });

    // Se o usuário não for encontrado, o model retornará null
    if (!usuarioAtualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // 4. Envia uma resposta de sucesso com os dados do usuário atualizado
    res.status(200).json(usuarioAtualizado);

  } catch (error) {
    console.error(error);
    // Adiciona verificação para email duplicado
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