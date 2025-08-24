// Importa o framework Express
const express = require('express');
const cors = require('cors'); //

// Importa as rotas de usuário que criei
const userRoutes = require('./routes/userRoutes');

// Cria uma instância da aplicação Express
const app = express();

// Permite que todas as origens acessem sua API.
// Para um projeto de teste, isso é aceitável.
app.use(cors()); // <-- 2. APLICA O MIDDLEWARE DO CORS

// Middleware que permite que o Express entenda requisições com corpo em formato JSON
app.use(express.json());

// Rota de teste para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API do teste da Rhally está no ar! 🚀');
});

// Diz para a aplicação usar as rotas definidas no userRoutes
// quando o caminho começar com '/api'
app.use('/api', userRoutes);

// Exporta a instância do app para que o server.js possa usá-la
module.exports = app;