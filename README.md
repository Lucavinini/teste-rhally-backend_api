# API de Gerenciamento de Usuários - Teste Rhally

Esta é a API back-end para o teste de Desenvolvedor Full Stack da Rhally. A API é responsável pelo gerenciamento de usuários (CRUD) e autenticação via JWT.

## 🛠️ Tecnologias Utilizadas

* Node.js
* Express.js
* MySQL
* JSON Web Token (JWT)

---

## 🗄️ Banco de Dados (MySQL)

Esta seção detalha a estrutura e a modelagem do banco de dados utilizado pela API.

### Modelagem e Normalização

Para a implementação prática da aplicação, foi criada a tabela `usuarios`, que atende a todos os requisitos do CRUD. 

No entanto, para responder à questão do teste sobre escalabilidade e a adição de papéis de usuário (roles), foi projetado o Diagrama Entidade-Relacionamento (DER) a seguir. Ele demonstra a abordagem normalizada, utilizando uma tabela de junção para criar uma relação Muitos-para-Muitos, o que representa a melhor prática para este cenário.

**Diagrama Entidade-Relacionamento (DER):**

![Diagrama da Modelagem de Dados](./docs/ModelagemBancoDeDadosRhally.png) 

### Script de Implementação

O script SQL para a criação da tabela `usuarios`, efetivamente utilizada na aplicação, está localizado no arquivo:
`/database/schema.sql`

### Query Solicitada no Teste

**- Escreva uma query para listar os 5 usuários mais recentes cadastrados.**
```sql
SELECT * FROM usuarios ORDER BY data_criacao DESC LIMIT 5;