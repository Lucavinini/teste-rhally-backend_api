const pool = require('../config/database');
// Vou usar uma biblioteca para criptografar a senha antes de salvar
const bcrypt = require('bcryptjs');

class User {
  // Método estático para criar um novo usuário
  static async create({ nome, email, senha }) {
    // Criptografa a senha do usuário para não salvá-la em texto puro
    const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o "custo" da criptografia

    // Executa a query SQL para inserir o novo usuário no banco
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    );

    // Retorna o id do usuário recém-criado
    const id = result.insertId;
    return { id, nome, email }; // Retornamos o usuário sem a senha
  }
}

module.exports = User;