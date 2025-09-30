LUIDI AUGUSTO
Atividade -- Projeto Final Back-End -- CRUD-Biblioteca



# Tecnologias
- Node.js
- Express.js
- Prisma ORM
- SQLite
- Postman

Token: admin:1234 -- Basic YWRtaW46MTIzNA==

# Rotas

## Auth
| Método | URL             | Permissão | Descrição           |
|--------|-----------------|-----------|-------------------|
| POST   | /auth/register  | Pública   | Criar novo usuário |

## Livros
| Método | URL                     | Permissão    | Descrição            |
|--------|-------------------------|-------------|--------------------|
| GET    | /books                  | User/Admin  | Listar todos os livros |
| GET    | /books/:id              | User/Admin  | Detalhes de 1 livro |
| POST   | /books                  | Admin       | Criar livro         |
| PATCH  | /books/:id              | Admin       | Atualizar livro     |
| DELETE | /books/:id              | Admin       | Deletar livro       |
| POST   | /books/:id/borrow       | User/Admin  | Pegar emprestado    |
| POST   | /books/:id/return       | User/Admin  | Devolver livro      |

---

# Banco de Dados

## Tabelas

- **users**
  - `id` (INTEGER, PK)
  - `username` (TEXT, único, obrigatório)
  - `password` (TEXT, obrigatório)
  - `isAdmin` (BOOLEAN, default: false)

- **books**
  - `id` (INTEGER, PK)
  - `title` (TEXT, obrigatório)
  - `autor` (TEXT, obrigatório)
  - `available` (BOOLEAN, default: true)


---

# Instalação

```bash
git clone <url-do-repo>
cd API-Gestao-Biblioteca
npm install
npx prisma migrate dev --name init
node prisma/seed.js # popular banco
npm start
