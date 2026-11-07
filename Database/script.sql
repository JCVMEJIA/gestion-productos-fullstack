IF DB_ID(N'GestionProductosDB') IS NULL
BEGIN
    CREATE DATABASE GestionProductosDB;
END
GO

USE GestionProductosDB;
GO

IF OBJECT_ID(N'dbo.Usuarios', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Usuarios
    (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nombre NVARCHAR(MAX) NOT NULL,
        Email NVARCHAR(450) NOT NULL,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        Rol NVARCHAR(MAX) NOT NULL
    );

    CREATE UNIQUE INDEX IX_Usuarios_Email
        ON dbo.Usuarios(Email);
END
GO

IF OBJECT_ID(N'dbo.Productos', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Productos
    (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nombre NVARCHAR(100) NOT NULL,
        Descripcion NVARCHAR(500) NOT NULL,
        Precio DECIMAL(18,2) NOT NULL,
        Stock INT NOT NULL,
        TipoProducto NVARCHAR(50) NOT NULL
    );
END
GO

-- Para crear un administrador:
-- Registra primero un usuario mediante /api/auth/register.
-- Después ejecuta:
-- UPDATE dbo.Usuarios SET Rol = 'Admin'
-- WHERE Email = 'admin@gestion.com';

