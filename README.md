# API de Gerenciamento de Usuários - Teste Rhally

Esta é a API back-end desenvolvida como parte do teste técnico para a vaga de Estágio de Desenvolvedor Full Stack da Rhally. A API é responsável pelo gerenciamento completo de usuários (CRUD) e utiliza um sistema de autenticação seguro baseado em JSON Web Token (JWT).

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução para o JavaScript no lado do servidor.
* **Express.js:** Framework para a construção da API REST, gerenciamento de rotas e middlewares.
* **Supabase (PostgreSQL):** Plataforma utilizada para o banco de dados, escolhida pela agilidade e facilidade de configuração.
* **JSON Web Token (JWT):** Para a implementação da autenticação e proteção de rotas.
* **bcryptjs:** Biblioteca para a criptografia (hashing) de senhas, garantindo a segurança das credenciais dos usuários.

---

## 🏗️ Arquitetura e Escalabilidade

Esta seção responde à questão do teste: *"Explique como você organizaria a estrutura de pastas do projeto para manter escalabilidade."*

A API foi estruturada seguindo o princípio da **Separação de Responsabilidades** (*Separation of Concerns*), onde cada parte do código tem um papel bem definido. Isso facilita a manutenção, o teste e a adição de novas funcionalidades no futuro.

A estrutura de pastas principal é a seguinte:

#### Estrutura do Projeto `src/`

- **config/**  
  Arquivos de configuração (ex: conexão com o banco de dados)

- **controllers/**  
  Lógica de negócio e controle das requisições. Recebe dados, chama o `model` e envia respostas.

- **middlewares/**  
  Funções intermediárias entre requisição e resposta (ex: autenticação, logs, tratamento de erros)

- **models/**  
  Camada que interage diretamente com o banco de dados. Contém queries e manipulação de dados.

- **routes/**  
  Define as URLs da API e direciona para o `controller` correspondente.


Essa organização permite adicionar novas funcionalidades sem impactar o código existente, mantendo o projeto escalável e estruturado.

## 🔐 Autenticação e Segurança

Esta seção responde à questão do teste: *"Use JWT para autenticação e explique como protegeria rotas privadas."*

A autenticação é realizada pela rota `POST /api/login`. Se as credenciais (`email` e `senha`) forem válidas, a API gera um **Token JWT** e o retorna ao cliente.

Para proteger rotas privadas (como `GET /api/users`), a estratégia utilizada é a seguinte:

1.  **Envio do Token:** O cliente (front-end) deve enviar o token JWT em toda requisição para uma rota protegida. A convenção é enviá-lo no cabeçalho `Authorization` no formato `Bearer <token>`.

2.  **Middleware de Autenticação:** No back-end, um **middleware** de autenticação (`src/middlewares/authMiddleware.js`) é aplicado às rotas que precisam de proteção. O fluxo deste middleware é:
    a. Ele intercepta a requisição antes que ela chegue à sua lógica principal.
    b. Verifica se o cabeçalho `Authorization` existe e se o token está presente.
    c. Usa a biblioteca `jsonwebtoken` e a chave secreta (`JWT_SECRET`) para verificar a **assinatura** do token.
    d. Se a assinatura for válida e o token não tiver expirado, o middleware confirma que a requisição é autêntica e libera o acesso à rota solicitada.
    e. Se o token for inválido, ausente ou expirado, o middleware bloqueia a requisição e retorna um erro `401 Unauthorized`.



## 🗄️ Banco de Dados

Esta seção detalha a estrutura do banco de dados utilizado pela API.

### Alteração do Banco de Dados e Justificativa

No teste técnico, foi solicitada a utilização do MySQL para a modelagem e implementação do banco de dados, o que foi realizado. Criei a tabela de usuários e a configurei com as colunas id, nome, email, senha e data_criacao.

No entanto, durante a fase de desenvolvimento, encontrei um problema de conexão persistente entre a minha aplicação local e o banco de dados hospedado na nuvem no Railway. O erro ETIMEDOUT (Tempo Esgotado) foi a principal barreira, impedindo a comunicação entre o meu código e o servidor de banco de dados, mesmo após revisar as variáveis de ambiente e tentar diferentes configurações.

Para garantir a entrega do projeto dentro do prazo e focar na implementação das funcionalidades de API (CRUD), optei por utilizar o Supabase. Essa plataforma, que utiliza PostgreSQL, é uma alternativa robusta e me permite continuar o desenvolvimento do back-end sem comprometer a integridade e a arquitetura do projeto.

O Supabase simplifica a criação e a conexão com o banco de dados, permitindo que eu me concentre na lógica de negócio e na construção das APIs REST, conforme solicitado no teste.

### Modelagem e Normalização

Esta subseção responde à questão: *"Explique como faria para normalizar a tabela caso fosse necessário adicionar papéis de usuário (ex: admin, cliente)."*

A estrutura foi planejada prevendo a escalabilidade para múltiplos papéis de usuário. A abordagem correta é a **normalização do banco de dados**, criando uma relação Muitos-para-Muitos entre usuários e papéis através de uma tabela de junção.

**Diagrama Entidade-Relacionamento (DER):**

![Diagrama da Modelagem de Dados](./docs/ModelagemBancoDeDadosRhally.png)

### Script de Implementação

Esta subseção responde à questão: *"Crie o script SQL para a tabela de usuários (id autoincrement, nome, email único, senha, data_criacao)."*

O script SQL para a criação da tabela `usuarios` está localizado no arquivo `/database/schema.sql`.

```sql
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Query Solicitada no Teste
Esta subseção responde à questão: *"Escreva uma query para listar os 5 usuários mais recentes cadastrados."*


```SQL
SELECT * FROM usuarios ORDER BY data_criacao DESC LIMIT 5;
```