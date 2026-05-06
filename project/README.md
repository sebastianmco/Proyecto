# Node.js + PostgreSQL REST API + Frontend

CRUD de usuarios con Node.js, Express, PostgreSQL y frontend estático.

---

## 🗂 Estructura del proyecto

```
.
├── src/
│   ├── index.js              # Entry point Express
│   ├── config.js             # Variables de entorno
│   ├── db.js                 # Pool PostgreSQL (soporta DATABASE_URL)
│   ├── initDb.js             # Auto-crea la tabla al arrancar
│   ├── controllers/
│   │   └── index.controller.js
│   └── routes/
│       └── users.routes.js
├── frontend/
│   ├── index.html            # SPA — interfaz CRUD
│   └── vercel.json           # Config de despliegue Vercel
├── database/
│   ├── db.sql                # Schema original
│   └── init.sql              # Schema seguro (IF NOT EXISTS)
├── render.yaml               # Config despliegue Render
├── Dockerfile                # Para correr con Docker
└── docker-compose.yml        # Desarrollo local completo
```

---

## 🚀 Despliegue en Render (Backend + BD)

### Paso 1 — Subir código a GitHub
```bash
git init
git add .
git commit -m "feat: REST API lista para producción"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 2 — Crear la base de datos en Render
1. Entra a [render.com](https://render.com) → **New → PostgreSQL**
2. Nombre: `users-db` | Plan: **Free** → **Create Database**
3. Copia el valor de **Internal Database URL** (lo usarás en el paso 3)

### Paso 3 — Crear el Web Service en Render
1. **New → Web Service** → conecta tu repo de GitHub
2. Configura:
   - **Name**: `users-api`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
3. En **Environment Variables** agrega:
   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | (pega el Internal Database URL del paso 2) |
   | `NODE_ENV` | `production` |
4. Click **Create Web Service**
5. Espera ~2 min. Tu URL será algo como `https://users-api.onrender.com`

**Verifica que funciona:**
```
https://users-api.onrender.com/health        → {"status":"ok"}
https://users-api.onrender.com/api/users     → [...]
```

---

## 🌐 Despliegue en Vercel (Frontend)

### Paso 1 — Edita la URL del backend
Abre `frontend/index.html` y cambia esta línea:
```js
const BACKEND_URL = window.BACKEND_URL || 'http://localhost:3000';
```
Por:
```js
const BACKEND_URL = 'https://users-api.onrender.com'; // tu URL de Render
```

### Paso 2 — Subir solo la carpeta `frontend/` a Vercel

**Opción A — Desde la web (más fácil):**
1. Ve a [vercel.com](https://vercel.com) → **Add New Project**
2. Importa tu repositorio de GitHub
3. En **Root Directory** pon: `frontend`
4. Click **Deploy**

**Opción B — Con CLI:**
```bash
npm i -g vercel
cd frontend
vercel --prod
```

Tu frontend quedará en: `https://tu-proyecto.vercel.app`

---

## 💻 Desarrollo local (Docker)

```bash
docker compose up --build -d
```

| Servicio   | URL |
|------------|-----|
| Frontend   | http://localhost:8080 |
| Backend    | http://localhost:3000/api/users |
| PostgreSQL | localhost:5432 |

---

## 📡 Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/users | Listar usuarios |
| GET | /api/users/:id | Obtener uno |
| POST | /api/users | Crear usuario |
| PUT | /api/users/:id | Actualizar |
| DELETE | /api/users/:id | Eliminar |
| GET | /health | Health check |

### Body para POST y PUT
```json
{ "name": "John Doe", "email": "john@example.com" }
```
