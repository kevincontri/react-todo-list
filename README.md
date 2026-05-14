# React Todo List

Uma aplicação simples e prática de lista de tarefas (Todo List) construída com **React** e **Vite**. Permite adicionar, editar, concluir e remover tarefas, com persistência local via `localStorage`.

## Demo

https://github.com/user-attachments/assets/061ceb39-266c-4444-9e62-475db159218a

---

## Funcionalidades

- Adicionar novas tarefas (limite de até 10 simultâneas)
- Editar tarefas existentes através de um modal
- Marcar tarefas como concluídas
- Remover tarefas individualmente
- Mover ordenação das tarefas com @dnd-kit
- Limpar todas as tarefas de uma só vez
- Persistência automática no `localStorage` (suas tarefas continuam ali ao recarregar a página)
- Mensagem de parabéns ao concluir todas as tarefas
- Contador de tarefas concluídas vs. total

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [dnd-kit](https://dndkit.com/)
- CSS puro

## Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/react-todo-list.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd react-todo-list/app/todo-list
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra o navegador em `http://localhost:5173`

## Scripts disponíveis

| Comando           | Descrição                            |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Gera a build de produção             |
| `npm run preview` | Pré-visualiza a build de produção    |
| `npm run lint`    | Executa o ESLint                     |

## Estrutura do projeto

```
react-todo-list/
└── app/
    └── todo-list/
        ├── public/
        ├── src/
        │   ├── App.jsx        # Componente principal com toda a lógica
        │   ├── App.css        # Estilos da aplicação
        │   ├── main.jsx       # Ponto de entrada do React
        │   └── index.css      # Estilos globais
        ├── index.html
        ├── package.json
        └── vite.config.js
```

## Autor

Feito por **Kevin Contri**.
