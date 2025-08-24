// Importa a biblioteca do Supabase
const { createClient } = require('@supabase/supabase-js');

// Importa o dotenv para carregar as variáveis de ambiente
require('dotenv').config();

// Obtém as variáveis de ambiente necessárias
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY; // Usando SUPABASE_KEY conforme seu .env

// Cria uma instância do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Exporta o cliente para que possa ser usado em outros arquivos
module.exports = supabase;