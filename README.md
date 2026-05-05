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
│   │   ├── MainLayout.tsx     # Layout principal com sidebar
│   │   └── Sidebar.tsx        # Menu lateral
│   └── ui/
│       ├── Modal.tsx          # Modal reutilizável
│       └── StatusBadge.tsx    # Badge de status do projeto
│
├── hooks/
│   └── useProjetos.ts         # Hooks React Query (projetos + atividades)
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── ContratosPage.tsx
│   └── projetos/
│       ├── ProjetosPage.tsx           # Lista de projetos
│       ├── ProjetoDetalhe.tsx         # Detalhe com abas
│       └── components/
│           ├── NovoProjetoModal.tsx   # Modal criar projeto
│           ├── NovaAtividadeModal.tsx # Modal criar atividade
│           ├── AbaAtividades.tsx      # Aba de atividades
│           ├── AbaGantt.tsx           # Gráfico de Gantt
│           └── AbaCustos.tsx          # Controle de custos
│
├── services/
│   ├── api.ts                 # Instância Axios configurada
│   └── projetos.service.ts    # Chamadas à API
│
├── types/
│   └── projeto.ts             # Tipos TypeScript
│
└── utils/
    └── formatters.ts          # Formatação de datas e moeda
```

---

## 🔌 Integração com o Backend

O projeto consome os seguintes endpoints esperados na API:

| Método | Rota                                          | Descrição                   |
|--------|-----------------------------------------------|-----------------------------|
| GET    | `/projetos`                                   | Lista todos os projetos      |
| GET    | `/projetos/:id`                               | Busca projeto por ID         |
| POST   | `/projetos`                                   | Cria novo projeto            |
| PUT    | `/projetos/:id`                               | Atualiza projeto             |
| DELETE | `/projetos/:id`                               | Exclui projeto               |
| GET    | `/projetos/:id/atividades`                    | Lista atividades do projeto  |
| POST   | `/projetos/:id/atividades`                    | Cria nova atividade          |
| PUT    | `/projetos/:id/atividades/:atividadeId`       | Atualiza atividade           |
| DELETE | `/projetos/:id/atividades/:atividadeId`       | Exclui atividade             |

---

## 🏗️ Build para produção

```bash
npm run build
```

Os arquivos gerados ficarão na pasta `dist/`.

---

## 🛠️ Stack utilizada

| Tecnologia         | Versão  | Uso                              |
|--------------------|---------|----------------------------------|
| React              | 18      | Interface                        |
| TypeScript         | 5       | Tipagem estática                 |
| Vite               | 5       | Build tool                       |
| Tailwind CSS       | 3       | Estilização                      |
| React Router       | 6       | Navegação                        |
| TanStack Query     | 5       | Estado assíncrono / cache        |
| React Hook Form    | 7       | Formulários                      |
| Zod                | 3       | Validação de formulários         |
| Axios              | 1       | Requisições HTTP                 |
| Lucide React       | latest  | Ícones                           |
| date-fns           | 3       | Manipulação de datas             |
