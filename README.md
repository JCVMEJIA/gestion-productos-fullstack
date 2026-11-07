Sistema de Gestión de Productos

Aplicación Full Stack para la gestión de productos.

Tecnologías utilizadas

Backend
.NET 10
ASP.NET Core Web API
Entity Framework Core
SQL Server
JWT para autenticación
BCrypt para hash de contraseñas

Frontend
React 19
Vite
React Router
JavaScript
CSS

Funcionalidades

Registro e inicio de sesión.
Autenticación mediante JWT.
Contraseñas protegidas mediante BCrypt.
Autorización basada en roles (ADMIN y User).
Consulta de productos para usuarios autenticados.
CRUD de productos para administradores.
Validaciones de datos en frontend y backend.
Rutas protegidas en el frontend.

Estructura del proyecto

GestionProductos/
├── Backend/
│   └── GestionProductos.API/
├── Frontend/
│   └── gestion-productos/
├── Database/
│   └── script.sql
└──README.md


Requisitos PROGRAMAS
NET 10 SDK
Node.js y npm
SQL Server
Git

Configuración de la base de datos

Iniciar SQL Server.
Ejecutar el archivo Database/script.sql.
Configurar la cadena de conexión en el backend mediante User Secrets.

Desde Backend/GestionProductos.API ejecutar:

bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=GestionProductosDB;User Id=sa;Password=TU_PASSWORD;TrustServerCertificate=True"


Reemplazar TU_PASSWORD por la contraseña configurada en SQL Server

Configuración del JWT

Desde la carpeta Backend/GestionProductos.API, ejecutar:

bash
dotnet user-secrets set "Jwt:Key" "CAMBIAR_POR_UNA_CLAVE_SEGURA_DE_AL_MENOS_32_CARACTERES"


Ejecución del backend

Desde Backend/GestionProductos.API:

bash
dotnet restore
dotnet run

La API estará disponible en la dirección indicada por ASP.NET Core al iniciar.

Ejecución del frontend

Desde Frontend/gestion-productos:

bash
npm install
npm run dev

Vite mostrará la dirección local del frontend, normalmente http://localhost:5173.

Endpoints principales

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario | Público |
| POST | `/api/auth/login` | Iniciar sesión | Público |
| GET | `/api/productos` | Listar productos | Autenticado |
| GET | `/api/productos/{id}` | Consultar producto | Autenticado |
| POST | `/api/productos` | Crear producto | Admin |
| PUT | `/api/productos/{id}` | Actualizar producto | Admin |
| DELETE | `/api/productos/{id}` | Eliminar producto | Admin |

Roles de usuario

User: puede consultar productos.
Admin:puede consultar, crear, actualizar y eliminar productos.

Para asignar el rol Admin, registrar primero un usuario y actualizar su campo Rol en la tabla Usuarios mediante SQL.

Seguridad

Las contraseñas se almacenan utilizando BCrypt.
Los endpoints protegidos requieren un token JWT válido.
Las operaciones de escritura requieren el rol Admin.


Autor: Juan Carlos Veria Mejia

Proyecto desarrollado prueba técnica de desarrollo Full Stack.
