// Importa o framework Express
const express = require('express');

// Cria uma instância da aplicação Express
const app = express();

// Middleware que permite que o Express entenda requisições com corpo em formato JSON
app.use(express.json());

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API do teste da Rhally está no ar! 🚀');
});

// Exporta a instância do app para que o server.js possa usá-la
module.exports = app;