# 🚴‍♂️ Sananduva Bikers — Sistema de Inscrições & Painel Administrativo

Aplicação web desenvolvida para o gerenciamento de inscrições, dados dos participantes e controle administrativo do evento de ciclismo **Sananduva Bikers**.

O sistema foi construído utilizando **Next.js (App Router)**, **TypeScript**, **Prisma ORM** e **PostgreSQL (Neon Serverless)**, seguindo rigorosamente os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**.

## 🏗️ Arquitetura & Conceitos Chave

As camadas de backend e acesso a dados seguem uma arquitetura em camadas para manter a separação de responsabilidades, alta testabilidade e facilidade de manutenção.

```text
[ Cliente / Navegador ]
        │  (HTTP / Fetch)
        ▼
[ API Routes / Handlers ] ── (src/app/api/registrations/route.ts)
        │
        ▼
[ RegistrationService ]  ── (Regras de Negócio e Validações)
        │
        ▼  (Interface IRegistrationRepository)
[ PrismaRegistrationRepository ] ── (Acesso a Dados & CRUD)
        │
        ▼  (registrationMapper)
[ PostgreSQL / Neon DB ] ── (Banco Relacional Serverless)
```

### Padrões Arquiteturais Aplicados

- **Domain-Driven Design (DDD):** O modelo do domínio (`Participant` / `Registration`) encapsula as regras de negócio, validações e invariantes.

- **Repository Pattern & Inversão de Dependência (DIP):** A camada de serviço depende de abstrações (`IRegistrationRepository`), desacoplando as regras de negócio de detalhes do Prisma ou do banco de dados.

- **Data Mapper Pattern:** Mappers (`fromPrismaRegistration`) fazem a tradução entre as consultas brutas do banco de dados e as entidades de domínio.

- **Estratégia de Mapeamento Híbrido (`@map` / `@@map`):**
  - **Aplicação em TypeScript:** _camelCase_ em inglês (`fullName`, `birthDate`, `tshirtSize`).
  - **Camada de Banco de Dados:** _snake_case_ em português (`nome_completo`, `data_nascimento`, `tamanho_camisa`) para facilitar a leitura por membros da organização em relatórios e consultas SQL.

- **Singleton Client Pattern:** A conexão do `PrismaClient` é instanciada como um singleton global (`src/lib/prisma.ts`) utilizando o `@prisma/adapter-neon` para evitar o esgotamento do pool de conexões em ambiente serverless.

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma v5.22.0
- **Qualidade de Código & Linter:** ESLint 9 (Flat Config)

## 📊 Progresso do Projeto

- [x] Configuração inicial do ambiente Next.js App Router e estrutura limpa de versionamento.
- [x] Modelagem da entidade de domínio `Participant`/`Registration` e contratos (`IRegistrationRepository`).
- [x] Configuração do `schema.prisma` com estrutura PostgreSQL e mapeamentos em português.
- [x] Execução de migrações no banco de dados (`npx prisma migrate dev`).
- [x] Implementação do `PrismaRegistrationRepository` com operações completas de CRUD (`save`, `update`, `delete`, `findById`, `findByCpf`, `findAll`).
- [x] Criação do Singleton para gerenciamento do pool de conexões com o Neon.
- [x] Configuração do ESLint para suporte a variáveis descartáveis em desestruturação (`_id`).
- [x] Implementação das API Routes (`POST /api/registrations`, `GET /api/registrations`).
- [x] Conexão dos componentes de formulário com as rotas de API via `fetch`.
- [ ] Desenvolvimento do Layout / Interface do Usuário (Formulário de Inscrição & Dashboard Admin).

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js:** `v20.x` ou `v24.x`
- **npm:** `v10.x`+
- **Banco PostgreSQL:** String de conexão do Neon (`DATABASE_URL`)

### Passo a Passo

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/sananduva-bikers.git
   cd sananduva-bikers
   ```

2. **Instalar as dependências:**

   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto:

   ```env
   DATABASE_URL="postgresql://usuario:senha@ep-exemplo.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```

4. **Executar as Migrações do Prisma:**

   ```bash
   npx prisma migrate dev
   ```

5. **Iniciar o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse <http://localhost:3000> no seu navegador.

## 📝 Licença

Este projeto é privado e de uso exclusivo da organização do evento **Sananduva Bikers**.
