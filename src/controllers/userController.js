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
    // O status 201 é o padrão para "Created" (Criado)
    res.status(201).json(novoUsuario);

  } catch (error) {
    // Se ocorrer um erro (ex: email duplicado), envia uma resposta de erro
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário.', error: error.message });
  }
};