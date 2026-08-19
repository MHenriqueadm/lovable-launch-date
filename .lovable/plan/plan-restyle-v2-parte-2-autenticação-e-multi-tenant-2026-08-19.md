# Plan: RESTYLE V2 - Parte 2 (Autenticação e Multi-tenant)

Implementação da autenticação real com Supabase, gestão de sessão, e infraestrutura para suporte multi-tenant e resolução de barbearia.

## User Review Required

> [!IMPORTANT]
> - A primeira barbearia de teste será criada via bootstrap seguro (não aberta ao público).
> - O cadastro público exigirá convite/chave no futuro, então agora apenas exibirá uma mensagem informativa.
> - O login será o único ponto de entrada para o dashboard.

## Proposed Changes

### 1. Database & Security (Supabase)
- **Migrations:**
  - Garantir trigger de criação automática de `profiles` após `auth.users` ser criado.
  - Refinar RLS de `profiles` para permitir apenas leitura/escrita do próprio usuário.
  - Refinar RLS de `barbershop_users` para permitir leitura apenas das próprias memberships.
  - Criar função auxiliar para bootstrap da primeira barbearia.

### 2. Services & Types
- **Serviços (`src/services/`):**
  - `auth.service.ts`: Métodos para signIn, signOut, resetPassword.
  - `profile.service.ts`: Métodos para getProfile e updateProfile.
  - `barbershop.service.ts`: Métodos para resolveCurrentBarbershop, getBarbershopById.
- **Tipos (`src/types/auth.ts`):**
  - Definir `AuthUserState` e interfaces relacionadas.

### 3. State Management & Context
- **AuthProvider (`src/contexts/AuthContext.tsx`):**
  - Fonte única de verdade para `user`, `session`, `profile` e `isAuthenticated`.
  - Escuta `onAuthStateChange`.
- **BarbershopProvider (`src/contexts/BarbershopContext.tsx`):**
  - Gerencia a barbearia atual, membership e role.
  - Resolve a barbearia a partir das memberships do usuário.

### 4. UI - Authentication Flows
- **Login (`src/routes/login.tsx`):**
  - Integrar com `signInWithPassword`.
  - Adicionar estados de loading e tratamento de erros amigáveis.
  - Implementar mostrar/ocultar senha.
- **Password Recovery:**
  - Criar `src/routes/esqueci-senha.tsx`.
  - Criar `src/routes/redefinir-senha.tsx`.
- **Logout:**
  - Implementar botão Sair no Dashboard Header com limpeza total de cache/estado.

### 5. Routing & Guards
- **Guards:**
  - `AuthGuard`: Protege rotas internas redirecionando para `/login`.
  - `TenantGuard`: Garante que o usuário tem uma barbearia ativa vinculada antes de entrar no Dashboard.
- **Redirection Logic:**
  - Resolver membership após login bem-sucedido.
  - Tratar caso de "Usuário sem barbearia" com feedback apropriado.

## Technical Details
- **Stack:** TanStack Start v1, React Query, Supabase JS Client.
- **Multi-tenancy:** Baseado no UUID da barbearia (`barbershop_id`), nunca no slug para chaves estrangeiras.
- **Session Persistence:** Persistência nativa do Supabase (`localStorage`).
- **Build/Lint:** Garantir que todos os arquivos UI criados/editados sigam o padrão shadcn adaptado para o tema dark premium.

## Next Steps
- Implementar migrações SQL no banco.
- Criar os serviços e provedores de contexto.
- Refatorar a página de Login e criar rotas de recuperação de senha.
- Aplicar Guards nas rotas do TanStack Router.
- Testar fluxos de login/logout/F5.
