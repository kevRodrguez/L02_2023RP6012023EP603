
## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias

4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo



## Script de la base de datos

-- Tabla de roles
CREATE TABLE roles (
    rolId SERIAL PRIMARY KEY,
    rol VARCHAR(100) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    usuarioId SERIAL PRIMARY KEY,
    rolId INT NOT NULL,
    nombreUsuario VARCHAR(100) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    CONSTRAINT fk_usuarios_roles FOREIGN KEY (rolId) REFERENCES roles (rolId)
);

-- Tabla de publicaciones
CREATE TABLE publicaciones (
    publicacionId SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    usuarioId INT NOT NULL,
    CONSTRAINT fk_publicaciones_usuarios FOREIGN KEY (usuarioId) REFERENCES usuarios (usuarioId)
);

-- Tabla de comentarios
CREATE TABLE comentarios (
    comentarioId SERIAL PRIMARY KEY,
    publicacionId INT NOT NULL,
    comentario TEXT NOT NULL,
    usuarioId INT NOT NULL,
    CONSTRAINT fk_comentarios_publicaciones FOREIGN KEY (publicacionId) REFERENCES publicaciones (publicacionId),
    CONSTRAINT fk_comentarios_usuarios FOREIGN KEY (usuarioId) REFERENCES usuarios (usuarioId)
);

-- Tabla de calificaciones
CREATE TABLE calificaciones (
    calificacionId SERIAL PRIMARY KEY,
    publicacionId INT NOT NULL,
    usuarioId INT NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    CONSTRAINT fk_calificaciones_publicaciones FOREIGN KEY (publicacionId) REFERENCES publicaciones (publicacionId),
    CONSTRAINT fk_calificaciones_usuarios FOREIGN KEY (usuarioId) REFERENCES usuarios (usuarioId)
);



--roles
INSERT INTO roles (rol) VALUES 
('Administrador'),
('Moderador'),
('Usuario'),
('Invitado');

SELECT * FROM roles

--usuarios
INSERT INTO usuarios (rolId, nombreUsuario, clave, nombre, apellido) VALUES
(1, 'admin01', 'admin123', 'Carlos', 'Martínez'),
(2, 'mod01', 'mod123', 'Laura', 'Gómez'),
(3, 'user01', 'user123', 'Andrés', 'López'),
(3, 'user02', 'user123', 'María', 'Pérez'),
(4, 'guest01', 'guest123', 'Invitado', 'Anonimo');

SELECT * FROM usuarios


--publicaciones
INSERT INTO publicaciones (titulo, descripcion, usuarioId) VALUES
('Primer Post de Carlos', 'Bienvenidos a la plataforma, este es el primer post oficial.', 1),
('Reglas del Foro', 'Aquí se detallan las reglas básicas de convivencia en la comunidad.', 2),
('Mi primera experiencia', 'Quiero compartir cómo fue mi primer día usando esta app.', 3),
('Tips y Consejos', 'Algunos consejos útiles para aprovechar mejor la plataforma.', 4),
('Saludos a todos', 'Soy nuevo aquí, espero aprender mucho.', 5);

SELECT * FROM publicaciones

--comentarios
INSERT INTO comentarios (publicacionId, comentario, usuarioId) VALUES
(1, 'Excelente inicio, gracias por la bienvenida.', 3),
(1, '¡Muy buen post, Carlos!', 4),
(2, 'Las reglas están claras, todo perfecto.', 5),
(3, 'Me alegra leer tu experiencia, yo también me sentí igual.', 2),
(3, 'Gracias por compartir, bienvenido a la comunidad.', 1),
(4, 'Muy útiles estos consejos, los pondré en práctica.', 5),
(5, 'Bienvenido, esperamos que disfrutes la app.', 3),
(5, 'Saludos también, encantado de tenerte aquí.', 4);

SELECT * FROM comentarios
