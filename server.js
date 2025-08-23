// Importa a aplicação Express configurada do arquivo app.js
const app = require('./src/app');

// Define a porta em que o servidor irá rodar.
// Usamos 3001 para não conflitar com o front-end (que geralmente usa a 3000).
const PORT = 3001;

// Inicia o servidor e o faz "escutar" por requisições na porta definida.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});