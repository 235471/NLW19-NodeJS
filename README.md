# NLW-19 NodeJS Project

## Descrição

Este projeto é uma aplicação Node.js para gerenciar inscrições de usuários em um evento. Os usuários podem convidar outros a se cadastrarem usando links de referência, acumulando pontos em um sistema de ranking para premiação no final. A aplicação também rastreia quantas vezes o link de referência foi acessado e fornece rotas para verificar a colocação de um usuário específico no ranking.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Fastify**: Framework web para Node.js.
- **PostgreSQL**: Banco de dados relacional para armazenar informações dos usuários.
- **Redis**: Banco de dados em memória para gerenciar o sistema de ranking e rastreamento de acessos.
- **Drizzle ORM**: ORM para interagir com o PostgreSQL.
- **Zod**: Biblioteca para validação de esquemas de dados.
- **Docker**: Para containerização dos serviços PostgreSQL e Redis.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
  - **drizzle/**: Configurações e esquemas do Drizzle ORM.
    - **client.ts**: Configuração do cliente PostgreSQL.
    - **schema/subscriptions.ts**: Esquema da tabela de inscrições.
  - **functions/**: Funções principais da aplicação.
    - **getRanking.ts**: Função para obter o ranking dos usuários.
    - **getSubscriberInviteClicks.ts**: Função para obter o número de cliques no link de referência de um usuário.
    - **getSubscriberInviteCount.ts**: Função para obter o número de convites de um usuário.
    - **getSubscriberRankingPlacement.ts**: Função para obter a colocação de um usuário no ranking.
    - **inviteLink.ts**: Função para acessar o link de convite.
    - **subscribeToEvent.ts**: Função para inscrever um usuário no evento.
  - **redis/**: Configuração do cliente Redis.
    - **client.ts**: Configuração do cliente Redis.
  - **routes/**: Rotas da aplicação.
    - **getRankingRoute.ts**: Rota para obter o ranking.
    - **getSubscriberInviteClicksRoute.ts**: Rota para obter o número de cliques no link de referência de um usuário.
    - **getSubscriberInviteCountRoute.ts**: Rota para obter o número de convites de um usuário.
    - **getSubscriberRankingPlacementRoute.ts**: Rota para obter a colocação de um usuário no ranking.
    - **inviteLinkRoute.ts**: Rota para acessar o link de convite.
    - **subscribeToEventRoute.ts**: Rota para inscrever um usuário no evento.
  - **env.ts**: Configuração das variáveis de ambiente.
  - **server.ts**: Configuração e inicialização do servidor Fastify.

## Instalação e Execução

### Pré-requisitos

- Docker
- Node.js
- npm ou yarn

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/235471/NWL19-NodeJS
   cd NWL-19-NodeJS
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   PORT=<sua_porta>
   POSTGRES_URL=<sua_url_postgres>
   REDIS_URL=<sua_url_redis>
   WEB_URL=<sua_url_web>
   ```
4. Inicie os serviços PostgreSQL e Redis usando Docker Compose:
   ```bash
   docker-compose up -d
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```
6. Acesse a documentação da API em [http://localhost:<sua_porta>/api-docs](http://localhost:<sua_porta>/api-docs).

### Rotas da API

#### Inscrições

- **POST** `/subscriptions`: Inscreve um usuário no evento.
  - **Body**:
    ```json
    {
      "name": "Nome do Usuário",
      "email": "email@exemplo.com",
      "referrer": "ID do Referenciador (opcional)"
    }
    ```

#### Convites

- **GET** `/invites/:subscriberId`: Acessa o link de convite e redireciona o usuário.

#### Ranking

- **GET** `/ranking`: Obtém o ranking dos usuários.
- **GET** `/subscribers/:subscriberId/ranking/clicks`: Obtém o número de cliques no link de referência de um usuário.
- **GET** `/subscribers/:subscriberId/ranking/count`: Obtém o número de convites de um usuário.
- **GET** `/subscribers/:subscriberId/ranking/placement`: Obtém a colocação de um usuário no ranking.