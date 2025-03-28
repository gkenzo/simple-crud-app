node-version: 20.17.0

# Preparando ambiente

### Inicializando banco de dados e redis

Execute `docker compose up` para inicializar os serviços de banco de dados e redis.

### Preparando backend e frontend

Execute `npm run setup` no diretório raíz para preparar as aplicações.

Caso o comando não possa ser executado, o setup do projeto deverá ser feito manualmente.

Para isso:

* em ambos os diretórios:
  * instale as dependências com `npm run install`
  * gere o arquivo .env copiando os valores de .env.example
* no diretório `backend`:
  * execute o comando `npx prisma deploy && npx prisma db seed && npm run build`
* no diretório `frontend`:
  * `npm run build`

O comando acima deverá executar o seed do banco de dados, mas caso não aconteça, rodar o comando a partir do diretório raiz:

``cd backend && npx prisma db seed``

### Inicializando aplicações:

Para inicializar o backend, execute:

``cd backend && npm run start:prod``

Em outro terminal, execute para inicializar o frontend:

``cd frontend && npm run start``

Acesse http://localhost:3000.

### Executando testes

``cd backend && npm test``

### Notas

Caso  houvesse um prazo maior, implementaria:

Paginação na API;

Testes E2E com cypress;

Testes unitários no frontend com jest;

Autenticação/Autorização;

Níveis de acesso distintos entre usuários;

Upload de imagens de usuários;

Observablidade.
