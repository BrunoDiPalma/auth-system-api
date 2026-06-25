# 📌 Auth System API + Front-end

Sistema full stack de autenticação e gerenciamento de tarefas, com login, registro e CRUD de tarefas por usuário.

---

## 🚀 Deploy

- 🔵 Front-end: https://auth-system-api-one.vercel.app
- 🟢 Back-end: https://auth-system-api-l3wc.onrender.com  

---

## 📷 Preview do projeto

<img width="1600" height="759" alt="64270fd2-4d93-407f-87d5-3ca17ae745af" src="https://github.com/user-attachments/assets/21210ea5-b2a6-4b17-958d-ca500ddf2e39" />


## 🧠 Funcionalidades

### 🔐 Autenticação
- Cadastro de usuário  
- Login com JWT  
- Proteção de rotas  
- Validação de token  

### 👤 Usuário
- Sessão autenticada  
- Rota `/users/me`  

### 📋 Tarefas (CRUD)
- Criar tarefas  
- Listar tarefas do usuário  
- Atualizar tarefa  
- Remover tarefa  

---

## 🛠️ Tecnologias

### ⚙️ Back-end
- Node.js  
- Express  
- TypeScript  
- Prisma ORM  
- SQLite (dev)  
- JWT  
- bcrypt  
- Zod  

### 🎨 Front-end
- React  
- TypeScript  
- Vite  
- Axios  
- React Router  

---

## 📦 Estrutura do projeto

```
auth-system-api/
│
├── backend/
│   ├── src/
│   ├── prisma/
│
├── frontend/
│   ├── src/
```

---

## ⚙️ Como rodar localmente

### 1. Clonar o projeto
```bash
git clone https://github.com/BrunoDiPalma/auth-system-api
```

### 2. Back-end
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### 3. Front-end
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Variáveis de ambiente

### Back-end (.env)
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta"
```

### Front-end (.env)
```
VITE_API_URL=https://auth-system-api-l3wc.onrender.com
```

---

## 📚 Aprendizados

- Autenticação JWT na prática  
- CRUD completo com Prisma  
- Integração frontend + backend  
- Deploy fullstack (Vercel + Render)  
- Organização de projeto

---

## 📌 Status do projeto

- ✔ Finalizado (versão funcional)  
- 🟡 Em melhorias futuras de UI e arquitetura  

---

## 👨‍💻 Autor

Bruno Di Palma
