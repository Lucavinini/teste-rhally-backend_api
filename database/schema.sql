-- Garante que o banco de dados 'user_management' exista.
CREATE DATABASE IF NOT EXISTS user_management;

-- Define o banco de dados 'user_management' como o padrão para as próximas queries.
USE user_management;

-- Cria a tabela 'usuarios' se ela ainda não existir.
CREATE TABLE IF NOT EXISTS usuarios (
    -- 'id' é a chave primária, um número inteiro que se auto-incrementa a cada novo registro.
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- 'nome' do usuário, não pode ser nulo.
    nome VARCHAR(255) NOT NULL,
    
    -- 'email' do usuário, não pode ser nulo e deve ser único na tabela.
    email VARCHAR(255) NOT NULL UNIQUE,
    
    -- 'senha' do usuário, não pode ser nula. Será armazenada como um hash.
    senha VARCHAR(255) NOT NULL,
    
    -- 'data_criacao' registra quando o usuário foi criado, com o valor padrão sendo a data e hora atuais.
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);