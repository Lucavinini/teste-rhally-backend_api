// Importa a instância do aplicativo Express
const app = require('./src/app');

// Importa o cliente Supabase configurado
const supabase = require('./src/config/database');

const port = process.env.PORT || 3001;

const startServer = async () => {
    try {
        console.log('Tentando conectar ao Supabase...');

        // O Supabase não usa um método `getConnection` como o MySQL.
        // O cliente já gerencia a conexão. Para testá-la, fazemos uma query simples.
        const { data, error } = await supabase
            .from('usuarios')
            .select('id')
            .limit(1);

        if (error) {
            throw new Error(error.message);
        }

        console.log('✅ Conexão com o banco de dados Supabase estabelecida com sucesso!');

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (err) {
        console.error('❌ Erro ao conectar com o banco de dados Supabase:', err.message);
        process.exit(1);
    }
};

startServer();