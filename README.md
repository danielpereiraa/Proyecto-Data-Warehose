# Proyecto Data Warehouse

Trabajo #4 del curso de Desarrollo Web Full Stack de Acámica.

El objetivo es crear un sitio web que permita realizar operaciones CRUD a una base de datos de contactos. Trabajando tanto en Frontend como el Backend.

## Recursos y tecnologías utilizadas

* HTML
* Bootstrap
* Node.js
* Nodemon
* Express
* JWT para autenticación via Token
* MySQL
* Sequelize
* Postman para manejo de endpoints y testing
* Swagger para documentación de API

## Como intalar y utilizar la API:

### 1 - Clonar proyecto
Clonar el repositorio desde el [siguiente link](https://github.com/danielpereiraa/Proyecto-Data-Warehose).

Desde la consola con el siguiente link:
git clone https://github.com/danielpereiraa/Proyecto-Data-Warehose.git .

### 2 - Instalación de dependencias
npm install

### 3 - Creando base de datos
* Abrir XAMPP y asegurarse que el puerto sobre el cual se está ejecutando es el 3306
* Inicializar los servicios de Apache y MySQL
* Abrir el panel de control del servicio MySQL
* Generar una nueva base de datos llamada data_warehouse desde el panel de control
* Importar el archivo warehouse.sql desde el panel de administracion recuerde editar el archivo app/confign/db.config.js con los datos de su entorno

### 4 - Iniciar el servidor
node server

### 5 - Listo para usar!
Para Ingresar Con Usuario Normal:
Usuario: Jose@gmail.com , Contraseña : 2345

Administrador :
Usuario: Pedro@gmail.com , Contraseña :1234