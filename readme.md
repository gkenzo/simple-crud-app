node-version: 20.17.0

# Preparando ambiente

### Inicializando banco de dados e redis

Execute `docker compose up` para inicializar os serviços de banco de dados e redis

### Preparando backend e frontend

Execute `npm run setup` no diretório raíz para preparar as aplicações

### Inicializando aplicações:

Para inicializar o backend, execute:

``cd backend && npm run start:prod``

Em outro terminal, execute para inicializar o frontend:

``cd frontend && npm run start``

Acesse http://localhost:3000

### Executando testes

``cd backend && npm test``

### Notas

Caso  houvesse um prazo maior, implementaria:

Paginação na API

Testes E2E com cypress

Testes unitários no frontend com jest

Autenticação/Autorização

Níveis de acesso distintos entre usuários

Upload de imagens de usuários

Observablidade
