# AbandonedCode - Frontend

Interface profissional do blog AbandonedCode construída com **Vite + React + TypeScript**.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultrarrápido
- **React Router DOM** - Navegação entre páginas
- **React Query** - Cache e gerenciamento de estado de servidor
- **React Hook Form** - Validação de formulários
- **Axios** - Cliente HTTP

## ✨ Funcionalidades

### Posts
- Listar todos os posts com filtros por status (PUBLISHED/DRAFT)
- Visualizar detalhes completos de um post
- Criar novos posts com validação
- Editar posts existentes
- Publicar posts (DRAFT → PUBLISHED)
- Deletar posts

### Categorias
- Visualizar árvore hierárquica de categorias (até 3 níveis)
- Criar novas categorias com categoria pai opcional
- Deletar categorias
- Navegação por categorias no sidebar
- Preview de caminho completo ao criar categoria

### Design System
- CSS Variables para cores consistentes
- Componentes reutilizáveis (buttons, cards, badges)
- Estados de loading e erro
- Layout responsivo para mobile e desktop
- Transições e animações suaves

## 📁 Estrutura

```
src/
├── components/
│   └── layout/
│       ├── Layout.tsx        # Layout principal
│       ├── Header.tsx        # Cabeçalho com navegação
│       └── Sidebar.tsx       # Sidebar com categorias
├── pages/
│   ├── Home.tsx              # Lista de posts
│   ├── PostDetail.tsx        # Detalhes do post
│   ├── PostForm.tsx          # Criar/editar post
│   ├── Categories.tsx        # Gerenciar categorias
│   └── CategoryForm.tsx      # Criar categoria
├── services/
│   └── api.ts                # Cliente HTTP (Axios)
├── types/
│   └── api.ts                # Interfaces TypeScript
├── App.tsx                   # Rotas da aplicação
├── main.tsx                  # Entry point
└── index.css                 # Design system global
```

## 🔌 API Backend

Este frontend consome a API REST em:
```
http://localhost:8080/api
```

Endpoints utilizados:
- `GET/POST /api/posts` - Listar/criar posts
- `GET/PUT/DELETE /api/posts/{id}` - Operações em post específico
- `POST /api/posts/{id}/publish` - Publicar post
- `GET/POST /api/categories` - Listar/criar categorias
- `GET/DELETE /api/categories/{id}` - Operações em categoria específica
- `GET /api/categories/{path}` - Buscar categoria por path hierárquico

## ⚙️ Como rodar

### Pré-requisitos
- Node.js 18+
- Backend Spring Boot rodando em `localhost:8080`

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

Acesse: **http://localhost:5175** (ou porta disponível)

### Build de Produção
```bash
npm run build
npm run preview
```

## 🎨 Customização

Edite as variáveis CSS em `src/index.css` para personalizar cores e estilos:

```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --success: #10b981;
  --danger: #ef4444;
  /* ... */
}
```
