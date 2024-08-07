# Aplicación de tareas con CRUD

## Instrucciones

- Se inició el proyecto en node.js a traves del comando npm init -y.

- Se instalaron las dependecias de express y mysql2.

- Se crearon los archivos app.js, db.js, controllers.js y routes.js y ubicados en las rutas correspondientes para así realizar la modularización.

- Se creó una base de datos con el nombre de tasks_db, la cual tiene un campo llamado taks en donde se pueden encontrar las siguientes columnas: id (como clave primaria y autoincremental) title (como un varchar de maximo de 255 caracteres), description (como text), isCompleted (como un booleano).

- En el archivo db.js se realizó la conexión con la base de datos ubicado en localhost.

- En el archivo controllers.js se ingrearon las consultas a la base de datos y las validaciones para que los campos sean obligatorios, el title no supere la cantidad máxima de caracteres.

- En el archivo routes.js se crearon las solicitudes HTTP de una ApiREST (GET, POST, PUT, DELETE) para la gestion de las tareas.

- Por último, en el archivo app.js se inició el servidor en el puerto 3000 y se importaron las solictudes HTTP del archivo routes.
