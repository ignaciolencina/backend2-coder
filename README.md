# Backend API - CoderHouse

API REST para e-commerce desarrollada con Node.js, Express y MongoDB. Sistema completo de gestión de usuarios, productos, carritos de compra y tickets.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Autenticación](#autenticación)
- [Estructura del Proyecto](#estructura-del-proyecto)

## ✨ Características

- 🔐 Sistema de autenticación con JWT
- 👥 Gestión de usuarios con roles (user/admin)
- 📦 CRUD completo de productos
- 🛒 Sistema de carritos de compra
- 🎫 Generación de tickets de compra
- 📧 Sistema de recuperación de contraseña por email
- 🔒 Middlewares de autorización y validación
- 📊 Arquitectura en capas (DAO, Repository, DTO)
- ✅ Validación de datos con Joi

## 🛠 Tecnologías

- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: Passport.js + JWT
- **Validación**: Joi
- **Email**: Nodemailer
- **Encriptación**: bcryptjs
- **Logging**: Morgan

## 📥 Instalación

1. **Clona el repositorio**
```bash
git clone <url-del-repositorio>
cd backend2-coder
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
```bash
cp .env.sample .env
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos

# JWT
SECRET_KEY=tu_clave_secreta_jwt

# Email (para recuperación de contraseñas)
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_password_de_aplicacion

# Servidor
PORT=3000
```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📡 Endpoints

### 🔐 Autenticación (`/api/v1/auth`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/login` | Iniciar sesión | ❌ |
| GET | `/current` | Usuario actual | ✅ |
| POST | `/logout` | Cerrar sesión | ❌ |
| POST | `/forgot-password` | Solicitar recuperación | ❌ |
| POST | `/reset-password` | Restablecer contraseña | ❌ |

#### Ejemplos de uso:

**Login (Se propociona el usuario que tiene los permisos de admin)**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "soyadmin@email.com",
  "password": "SoyAdmin123!"
}
```

**Recuperar contraseña**

Se debe copiar el token que se proporciona en el mail, el botón de redirección aún no se encuentra en funcionamiento.
```bash
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "usuario@email.com"
}
```

### 👥 Usuarios (`/api/v1/users`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/` | Crear usuario | ❌ |
| GET | `/` | Listar usuarios | ❌ |
| GET | `/:id` | Obtener usuario | ❌ |

**Crear usuario**
```bash
POST /api/v1/users
Content-Type: application/json

{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@email.com",
  "age": 25,
  "password": "Password123!"
}
```

### 📦 Productos (`/api/v1/products`)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/` | Listar productos | user, admin |
| GET | `/:id` | Obtener producto | user, admin |
| POST | `/` | Crear producto | admin |
| PUT | `/:id` | Actualizar producto | admin |
| DELETE | `/:id` | Eliminar producto | admin |

**Crear producto**
```bash
POST /api/v1/products
Authorization: (Cookie de sesión incluida automáticamente por el cliente)
Content-Type: application/json

{
  "name": "Producto Ejemplo",
  "description": "Descripción del producto",
  "code": "ABC12345",
  "price": 1500,
  "stock": 10,
  "category": "Electronica"
}
```

### 🛒 Carritos (`/api/v1/carts`)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/` | Crear carrito | user |
| GET | `/my-carts` | Mis carritos | user |
| GET | `/` | Listar todos | admin |
| GET | `/:id` | Obtener carrito | user, admin |
| PUT | `/:cartId/product/:productId` | Agregar/actualizar producto | user, admin |
| DELETE | `/:cartId/product/:productId` | Eliminar producto | user, admin |
| DELETE | `/:id` | Eliminar carrito | user, admin |
| POST | `/:cartId/purchase` | Realizar compra | user, admin |

**Agregar producto al carrito**
```bash
PUT /api/v1/carts/64f123.../product/64f456...
Authorization: (Cookie de sesión incluida automáticamente por el cliente)
Content-Type: application/json

{
  "quantity": 2
}
```

**Realizar compra**
```bash
POST /api/v1/carts/64f123.../purchase
Authorization: (Cookie de sesión incluida automáticamente por el cliente)
```

### 🎫 Tickets (`/api/v1/tickets`)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/my-tickets` | Mis tickets | user |
| GET | `/` | Listar todos | admin |
| GET | `/:id` | Obtener ticket | user, admin |

## 🔐 Autenticación

La API utiliza **JWT tokens** almacenados en **cookies HTTP-only**. 

### Flujo de autenticación:

1. **Login**: El cliente envía credenciales
2. **Token**: El servidor responde con un JWT en una cookie
3. **Requests**: El cliente incluye automáticamente la cookie
4. **Logout**: Se limpia la cookie

### Roles de usuario:
- **user**: Usuarios normales (pueden gestionar sus carritos y ver productos)
- **admin**: Administradores (acceso completo)

## 📁 Estructura del Proyecto

```
src/
├── config/                 # Configuraciones
│   └── emailConfig.js
├── controllers/            # Controladores por módulo
│   ├── auth/
│   ├── carts/
│   ├── products/
│   ├── tickets/
│   └── users/
├── dao/                    # Data Access Objects
│   └── mongo/
├── database/               # Configuración de BD
├── dto/                    # Data Transfer Objects
├── helpers/                # Utilidades y validaciones
├── middlewares/            # Middlewares personalizados
├── models/                 # Esquemas de Mongoose
├── repositories/           # Capa de repositorio
├── routes/                 # Definición de rutas
├── services/              # Lógica de negocio
└── server.js              # Punto de entrada
```

## 📋 Validaciones

### Usuario
- **first_name**: 3-30 caracteres
- **last_name**: 3-30 caracteres  
- **email**: Formato válido, 7-50 caracteres
- **age**: 1-100 años
- **password**: 8-15 caracteres (mayúscula, minúscula, número, símbolo)

### Producto
- **code**: Formato ABC12345 (3 letras + 5 números)
- **price**: Número entero mayor a 0
- **stock**: Número entero
- Todos los campos son requeridos

### Carrito
- **quantity**: Número mayor o igual a 1

## 📧 Sistema de Email

Funcionalidades de email implementadas:
- ✅ Recuperación de contraseña
- ✅ Confirmación de cambio de contraseña
- 📧 Templates HTML responsivos

## 🔒 Seguridad

- 🔐 Passwords hasheadas con bcrypt
- 🍪 JWT en cookies HTTP-only
- 🛡️ Validación de datos de entrada
- 🚫 Autorización por roles
- 🔒 Tokens de recuperación seguros

## 📝 Respuestas de la API

Todas las respuestas siguen el formato:

```json
{
  "data": "...",
  "message": "Descripción de la operación"
}
```

### Códigos de estado:
- `200`: Operación exitosa
- `201`: Recurso creado
- `400`: Datos inválidos
- `401`: No autenticado
- `403`: Sin permisos
- `404`: Recurso no encontrado
- `409`: Conflicto (ej: email duplicado)
- `500`: Error interno


## 👤 Autor

**Ignacio Lencina**
- Proyecto de Backend 2 - CoderHouse
