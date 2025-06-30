# Backend 2 - CoderHouse

**Descripción:** Proyecto de backend 2 de Coderhouse con autenticación JWT y roles de usuario

## 🚀 Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crear un archivo `.env` basado en `.env.sample`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
SECRET_KEY=tu_clave_secreta_muy_segura
```

### 3. Ejecutar el proyecto

**Modo desarrollo:**
```bash
npm run dev
```

## 📋 Endpoints Disponibles

### 🔐 Autenticación (`/api/v1/sessions`)

#### POST `/api/v1/sessions/login`
Iniciar sesión y obtener token JWT.

**Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "MiPassword123!"
}
```


#### GET `/api/v1/sessions/current`
Verificar token actual y obtener información del usuario autenticado.

**Headers:**
```
Authorization: Bearer tu_jwt_token_aqui
```


### 👥 Usuarios (`/api/v1/users`)

#### POST `/api/v1/users`
Registrar un nuevo usuario.

**Body (JSON):**
```json
{
  "first_name": "María",
  "last_name": "González",
  "email": "maria@gmail.com",
  "age": 28,
  "password": "MiPassword123!"
}
```

**Validaciones:**
- `first_name`: 3-30 caracteres, requerido
- `last_name`: 3-30 caracteres, requerido
- `email`: formato válido, 7-50 caracteres, único, requerido
- `age`: número entero entre 1-100, requerido
- `password`: 8-15 caracteres, debe contener mayúscula, minúscula, número y carácter especial, requerido


#### GET `/api/v1/users`
Obtener lista de todos los usuarios.


#### GET `/api/v1/users/:id`
Obtener un usuario específico por ID.

**Parámetros:**
- `id`: ID del usuario (MongoDB ObjectId)


### 🔒 Panel de Administrador (`/api/v1/admin`)

#### GET `/api/v1/admin/panel`
Acceder al panel de administrador (solo usuarios con rol `admin`).

> [!IMPORTANT]
> A fines prácticos para poder tener un usuario con rol `admin` y hacer las pruebas se debe cambiar de manera manual en la db mongo.

**Headers:**
```
Authorization: Bearer tu_jwt_token_aqui
```


## 🔄 Flujo de Autenticación

### 1. Registrar usuario
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez", 
    "email": "juan@ejemplo.com",
    "age": 25,
    "password": "MiPassword123!"
  }'
```

### 2. Iniciar sesión
```bash
curl -X POST http://localhost:3000/api/v1/sessions/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "MiPassword123!"
  }'
```

### 3. Usar token en rutas protegidas
```bash
curl -X GET http://localhost:3000/api/v1/sessions/current \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 4. Acceder al panel de admin (solo si eres admin)
```bash
curl -X GET http://localhost:3000/api/v1/admin/panel \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 👤 Roles de Usuario

- **`user`**: Rol por defecto, acceso básico
- **`admin`**: Acceso completo incluyendo panel de administrador

## 🛡️ Middleware de Seguridad

### Autenticación JWT
- Todas las rutas protegidas requieren token válido
- Token expira en 1 hora
- Se envía en header: `Authorization: Bearer <token>`

### Validación de Roles
- Middleware `requireRole()` controla acceso por roles
- Verificación automática en rutas sensibles

### Validación de Datos
- Esquemas Joi para validar entrada de datos
- Mensajes de error descriptivos
- Sanitización automática de campos

## 🔧 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación por tokens
- **Passport.js** - Middleware de autenticación
- **bcryptjs** - Hash de contraseñas
- **Joi** - Validación de esquemas
- **Morgan** - Logger HTTP
