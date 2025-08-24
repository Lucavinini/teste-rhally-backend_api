// Importa o cliente Supabase que configurei
const supabase = require('../config/database');
// Ainda usando o bcryptjs para criptografar a senha
const bcrypt = require('bcryptjs');

class User {
  // Método estático para criar um novo usuário
  static async create({ nome, email, senha }) {
    // 1. Criptografa a senha do usuário
    const hashedPassword = await bcrypt.hash(senha, 10);

    // 2. Usa o cliente Supabase para inserir os dados na tabela 'usuarios'
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        { nome: nome, email: email, senha: hashedPassword },
      ])
      .select('id, nome, email'); // Pede para o Supabase retornar esses campos após a inserção

    // 3. Trata possíveis erros
    if (error) {
      // Se o erro for de violação de unicidade (email duplicado), por exemplo
      if (error.code === '23505') {
        throw new Error('Este e-mail já está em uso.');
      }
      throw error; // Lança outros erros
    }

    // 4. Retorna os dados do usuário criado (sem a senha)
    // O Supabase retorna os dados em um array, então pegamos o primeiro item.
    return data ? data[0] : null;

  }
    //Método estático para buscar todos os usuários
  static async findAll() {
    // 1. Usa o cliente Supabase para buscar todos os dados da tabela 'usuarios'
    // Seleciona apenas os campos que quero retornar (sem a senha)
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nome, email, data_criacao');

    // 2. Trata possíveis erros
    if (error) {
      throw error;
    }

    // 3. Retorna os dados encontrados
    return data;
  }

  // Método estático para atualizar um usuário pelo ID
  static async update(id, { nome, email }) {
    // 1. Usa o cliente Supabase para atualizar a linha na tabela 'usuarios'
    // onde o 'id' corresponde ao que foi passado
    const { data, error } = await supabase
      .from('usuarios')
      .update({ nome, email })
      .eq('id', id) // A cláusula 'where' do Supabase: .eq() significa 'equals'
      .select('id, nome, email');

    // 2. Trata possíveis erros
    if (error) {
      // Se o erro for de violação de unicidade (email duplicato)
      if (error.code === '23505') {
        throw new Error('Este e-mail já está em uso.');
      }
      throw error;
    }

    // 3. Retorna os dados atualizados. Se o ID não existir, data será null ou um array vazio.
    return data ? data[0] : null;
  }

  //delette
  static async delete(id) {
  const { data, error } = await supabase
    .from('usuarios')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    throw error;
  }

  return data && data.length > 0 ? data[0] : null;
}
// Método estático para encontrar um usuário pelo email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*') // Pega todas as colunas, incluindo a senha para comparação
      .eq('email', email)
      .single(); // Espera um único resultado

    if (error && error.code !== 'PGRST116') { // Ignora erro de "nenhuma linha encontrada"
      throw error;
    }

    return data;
  }
}

module.exports = User;