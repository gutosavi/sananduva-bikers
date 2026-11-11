# Sananduva Bikers — Landing Page, Inscrições & Painel Administrativo

🔗 **Produção:** [sananduva-bikers.vercel.app](https://sananduva-bikers.vercel.app/)

Aplicação web do grupo de ciclismo **Sananduva Bikers** e do seu evento anual de mountain bike, o **Pedal do Tigre**. Reúne a landing page do evento, o fluxo de inscrição, a lista pública de inscritos e um painel administrativo protegido para a organização.

Construída com **Next.js (App Router)**, **TypeScript**, **Prisma ORM** e **PostgreSQL (Neon Serverless)**, seguindo princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, com validação de dados no servidor e cobertura de testes com **Vitest**.

---

## ✨ Funcionalidades

| Rota          | Acesso    | Descrição                                                            |
| ------------- | --------- | -------------------------------------------------------------------- |
| `/`           | Público   | Landing page: Hero, Sobre, o evento Pedal do Tigre, Apoiadores e FAQ |
| `/inscricoes` | Público   | Formulário de inscrição com validação no cliente e no servidor       |
| `/inscritos`  | Público   | Lista pública para acompanhar os inscritos (sem dados sensíveis)     |
| `/admin`      | Protegido | Painel para listar, editar e excluir inscrições                      |

---

## 🏗️ Arquitetura

O backend segue uma arquitetura em camadas para manter a separação de responsabilidades, a testabilidade e a facilidade de manutenção.

```
[ Cliente / Navegador ]
        │  (HTTP / Fetch)
        ▼
[ proxy.ts ] ── (proteção de /admin e /api/admin)
        │
        ▼
[ API Routes ] ── /api/registrations (POST público)
        │          /api/admin/registrations (GET / PATCH / DELETE autenticados)
        ▼
[ RegistrationService ] ── (regras de negócio + validação com Zod)
        │
        ▼  (interface IRegistrationRepository)
[ PrismaRegistrationRepository ] ── (acesso a dados, tradução de erros do Prisma)
        │
        ▼  (registrationMapper)
[ PostgreSQL / Neon DB ]
```

### Padrões aplicados

- **Domain-Driven Design (DDD):** o domínio (`Participant` / `Registration`) concentra regras de negócio, validações e invariantes.
- **Repository Pattern & Inversão de Dependência (DIP):** o `RegistrationService` depende da abstração `IRegistrationRepository`, o que desacopla as regras de negócio do Prisma e permite injetar repositórios falsos nos testes.
- **Data Mapper:** o `registrationMapper` traduz os registros do banco para entidades de domínio e valida campos enumerados (`gender`, `tshirtSize`) reaproveitando o próprio schema.
- **Mapeamento híbrido (`@map` / `@@map`):**
  - Aplicação: `camelCase` em inglês (`fullName`, `birthDate`, `tshirtSize`).
  - Banco: `snake_case` em português (`nome_completo`, `data_nascimento`, `tamanho_camisa`), facilitando relatórios e consultas SQL pela organização.
- **Singleton do PrismaClient:** instância global em `src/lib/prisma.ts` com `@prisma/adapter-neon`, evitando o esgotamento do pool de conexões em ambiente serverless.

---

## 🔒 Segurança & Validação

### Autenticação e autorização

- Rotas administrativas separadas das públicas: `/api/registrations` aceita apenas `POST`; leitura, edição e exclusão ficam em `/api/admin/registrations`.
- Verificação de sessão com `auth()` **em cada rota** administrativa, além do `proxy.ts` (matcher `["/admin/:path*", "/api/admin/:path*"]`).
- Requisições não autenticadas recebem **401 em JSON** nas APIs e **redirecionamento para o login** nas páginas.
- O `callbackUrl` do login só é aceito se começar com `/admin` (padrão `/admin`), evitando redirecionamentos abertos.

### Validação no servidor (Zod)

- O service recebe `input: unknown` e valida com `safeParse` antes de qualquer acesso ao banco — o servidor não confia no que vem do cliente.
- Schema com limites explícitos: `.max()` nos textos, `z.enum` para gênero, tamanho de camisa e categoria (por `id`), quantidade de almoços extras inteira e limitada (`MAX_EXTRA_LUNCH`).
- **Atualização** com um `updateSchema` próprio (parcial, sem `id` nem `revenue`), validado antes do `findById`.
- O **valor da inscrição (`revenue`) é sempre calculado no servidor**, na criação e na edição.
- `id` validado com `idSchema` no `PATCH` e no `DELETE`.

### Tratamento de erros

- `RegistrationError` representa erros de domínio (mensagem amigável, sem acoplamento a HTTP).
- Violações de unicidade do Prisma (`P2002` em CPF e e-mail) são traduzidas no repositório para `RegistrationError`, com mensagem genérica que não revela qual dado já existe.
- O helper `mapErrorToResponse` padroniza as respostas: `RegistrationError` e `SyntaxError` → **400**; qualquer outro erro → **500** genérico, com log no servidor.
- No cliente, o hook `useRegistrationsForm` distingue erro do servidor (exibe a mensagem recebida) de erro de rede (mensagem genérica). O painel admin também exibe o erro do servidor ao editar.

---

## 🧪 Testes

Suíte de testes unitários com **Vitest** e **Testing Library**:

- **`registrationSchema`** — dados válidos e inválidos, limites e enums.
- **`RegistrationService`** — criação e atualização com repositório falso injetado via `IRegistrationRepository`, cálculo do valor no servidor e tradução de erros.
- **`RegistrationForm`** — comportamento do formulário e envio do payload esperado.

Configuração em `vitest.config.mts` com `vitest.setup.ts` (matchers do `jest-dom` e `cleanup` após cada teste).

```bash
npm run test         # executa a suíte
npx tsc --noEmit     # checagem de tipos
```

---

## 🎨 Interface

- **Tailwind CSS v4** + **shadcn/ui**
- Tipografia: **Neue Machina** nos títulos e **Inter** nos textos
- Paleta: background `#0b0f0c`, superfícies `#17241b` / `#203127`, primária `#f2670b`, texto `#f4f2ec`
- Direção visual esportiva e editorial: fotografia de MTB em grande escala, títulos em caixa alta, grafismos de trilha e altimetria, animações sutis e atenção especial ao mobile

---

## 🛠️ Tecnologias

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Banco de dados:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma v5.22.0
- **Validação:** Zod
- **Autenticação:** Auth.js (NextAuth)
- **Estilo:** Tailwind CSS v4 + shadcn/ui
- **Testes:** Vitest + Testing Library
- **Qualidade de código:** ESLint 9 (Flat Config)
- **Deploy:** Vercel

---

## 📊 Progresso

- [x] Configuração do Next.js App Router e estrutura de versionamento
- [x] Modelagem do domínio `Participant` / `Registration` e contrato `IRegistrationRepository`
- [x] `schema.prisma` com PostgreSQL e mapeamentos em português
- [x] Migrações do banco (`npx prisma migrate dev`)
- [x] `PrismaRegistrationRepository` com CRUD completo (`save`, `update`, `delete`, `findById`, `findByCpf`, `findAll`)
- [x] Singleton do Prisma com adapter do Neon
- [x] API Routes públicas e administrativas
- [x] Formulário de inscrição conectado à API
- [x] Autenticação e proteção do painel admin
- [x] Validação completa no servidor e tratamento padronizado de erros
- [x] Suíte de testes unitários (schema, service e formulário)
- [x] Landing page do evento
- [x] Lista pública de inscritos
- [x] Deploy na Vercel
- [ ] Campo de cupom de desconto na inscrição
- [ ] Atualização dos assets finais (logos de apoiadores e fotos do evento)

---

## 🚀 Como executar

### Pré-requisitos

- **Node.js:** v20.x ou v24.x
- **npm:** v10.x+
- **PostgreSQL:** string de conexão do Neon

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/gutosavi/sananduva-bikers.git
cd sananduva-bikers

# 2. Instalar as dependências
npm install
```

3. Criar o arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://usuario:senha@ep-exemplo.us-east-2.aws.neon.tech/neondb?sslmode=require"
AUTH_SECRET="gere-com-npx-auth-secret"
```

```bash
# 4. Executar as migrações
npx prisma migrate dev

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 📝 Licença

Projeto privado, de uso exclusivo da organização do evento Sananduva Bikers.
