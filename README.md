```markdown
# Pronet — Frontend (EngProject)

Sistema de gestão de projetos de engenharia — Frontend em React + TypeScript.

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) versão **18 ou superior**
- npm (já vem com o Node)

---

## 🚀 Como rodar o projeto

### 1. Extraia o ZIP e entre na pasta

```bash
cd pronet
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto copiando o exemplo:

```bash
cp .env.example .env
```

Edite o `.env` e coloque a URL da API do backend:

```
VITE_API_URL=http://localhost:3000/api
```

> Ajuste a porta conforme o seu backend Node.js estiver rodando.

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

Acesse no navegador: **http://localhost:5173**

---

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx          # Layout principal com sidebar
│   │   └── Sidebar.tsx             # Menu lateral
│   └── ui/
│       ├── Modal.tsx               # Modal reutilizável
│       ├── StatusBadge.tsx         # Badge de status do projeto
│       └── ContratoStatusBadge.tsx # Badge de status do contrato
│
├── hooks/
│   ├── useProjetos.ts              # Hooks React Query (projetos + atividades)
│   ├── useContratos.ts             # Hooks React Query (contratos)
│   ├── useCustos.ts                # Hooks React Query (itens e recursos HH)
│   └── useUsuarios.ts              # Hooks React Query (usuários)
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── ContratosPage.tsx
│   ├── CustosPage.tsx
│   ├── CadastroPage.tsx
│   ├── components/
│   │   ├── NovoContratoModal.tsx   # Modal criar contrato
│   │   ├── AdicionarItemModal.tsx  # Modal adicionar item de material
│   │   ├── AdicionarRecursoModal.tsx # Modal adicionar recurso HH
│   │   └── NovoUsuarioModal.tsx    # Modal criar usuário
│   └── projetos/
│       ├── ProjetosPage.tsx        # Lista de projetos
│       ├── ProjetoDetalhe.tsx      # Detalhe com abas
│       └── components/
│           ├── NovoProjetoModal.tsx
│           ├── NovaAtividadeModal.tsx
│           ├── AbaAtividades.tsx
│           ├── AbaGantt.tsx
│           └── AbaCustos.tsx
│
├── services/
│   ├── api.ts                      # Instância Axios configurada
│   ├── projetos.service.ts
│   ├── contratos.service.ts
│   ├── custos.service.ts
│   └── usuarios.service.ts
│
├── types/
│   ├── projeto.ts
│   ├── contrato.ts
│   ├── custo.ts
│   └── usuario.ts
│
└── utils/
    └── formatters.ts               # Formatação de datas e moeda

public/
└── pronet.png                      # Logo da aplicação
```

---

## 🔌 Integração com o Backend

O projeto consome os seguintes endpoints esperados na API:

### Projetos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/projetos` | Lista todos os projetos |
| GET    | `/projetos/:id` | Busca projeto por ID |
| POST   | `/projetos` | Cria novo projeto |
| PUT    | `/projetos/:id` | Atualiza projeto |
| DELETE | `/projetos/:id` | Exclui projeto |

### Atividades
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/projetos/:id/atividades` | Lista atividades do projeto |
| POST   | `/projetos/:id/atividades` | Cria nova atividade |
| PUT    | `/projetos/:id/atividades/:atividadeId` | Atualiza atividade |
| DELETE | `/projetos/:id/atividades/:atividadeId` | Exclui atividade |

### Custos — Materiais
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/projetos/:id/atividades/:atividadeId/itens` | Lista itens de material |
| POST   | `/projetos/:id/atividades/:atividadeId/itens` | Adiciona item de material |
| DELETE | `/projetos/:id/atividades/:atividadeId/itens/:itemId` | Remove item |

### Custos — Recursos Humanos (HH)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/projetos/:id/atividades/:atividadeId/recursos` | Lista recursos HH |
| POST   | `/projetos/:id/atividades/:atividadeId/recursos` | Adiciona recurso HH |
| DELETE | `/projetos/:id/atividades/:atividadeId/recursos/:recursoId` | Remove recurso |

### Contratos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/contratos` | Lista todos os contratos |
| GET    | `/contratos/:id` | Busca contrato por ID |
| POST   | `/contratos` | Cria novo contrato |
| PUT    | `/contratos/:id` | Atualiza contrato |
| DELETE | `/contratos/:id` | Exclui contrato |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/usuarios` | Lista todos os usuários |
| GET    | `/usuarios/:id` | Busca usuário por ID |
| POST   | `/usuarios` | Cria novo usuário |
| PUT    | `/usuarios/:id` | Atualiza usuário |
| DELETE | `/usuarios/:id` | Exclui usuário |

---

## 🏗️ Build para produção

```bash
npm run build
```

Os arquivos gerados ficarão na pasta `dist/`.

---

## 🛠️ Stack utilizada

| Tecnologia      | Versão | Uso                       |
|-----------------|--------|---------------------------|
| React           | 18     | Interface                 |
| TypeScript      | 5      | Tipagem estática          |
| Vite            | 5      | Build tool                |
| Tailwind CSS    | 3      | Estilização               |
| React Router    | 6      | Navegação                 |
| TanStack Query  | 5      | Estado assíncrono / cache |
| React Hook Form | 7      | Formulários               |
| Zod             | 3      | Validação de formulários  |
| Axios           | 1      | Requisições HTTP          |
| Lucide React    | latest | Ícones                    |
| date-fns        | 3      | Manipulação de datas      |
```