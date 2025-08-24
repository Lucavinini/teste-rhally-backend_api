const app = require('./src/app');
const pool = require('./src/config/database');

const port = process.env.PORT || 3001;

const startServer = async () => {
    try {
        console.log(`Tentando conectar em ${process.env.DB_HOST}:${process.env.DB_PORT} como ${process.env.DB_USER}`);
        const connection = await pool.getConnection();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
        connection.release();

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (err) {
        console.error('❌ Erro ao conectar com o banco de dados:', err.code, err.message);
        process.exit(1);
    }
};

startServer();
