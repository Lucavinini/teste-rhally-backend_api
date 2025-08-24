const jwt = require('jsonwebtoken');

// Middleware para verificar a autenticação do usuário
const authMiddleware = (req, res, next) => {
  // Pega o cabeçalho 'authorization' da requisição
  const authHeader = req.headers.authorization;

  // 1. Verifica se o cabeçalho de autorização existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  // 2. O cabeçalho vem no formato "Bearer TOKEN". Vamos separar o token.
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Erro no formato do token.' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token mal formatado.' });
  }

  // 3. Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Se o token for inválido ou expirado, retorna um erro
      return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }

    // Se o token for válido, adicionamos o ID do usuário na requisição
    // para que as próximas funções (controllers) possam usá-lo
    req.userId = decoded.id;

    // A função next() passa a requisição para a próxima etapa (o controller)
    return next();
  });
};

module.exports = authMiddleware;