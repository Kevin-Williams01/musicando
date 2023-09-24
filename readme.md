# Musicando

### Esta es la base de datos musicando, a continuación vas a ver como fue creada
_Esta base de datos está compuesta por las siguientes tablas_
- Artistas
- Canciones
- Albumes
- Generos

_Las relaciones están definidas de la siguiente forma_
- Una canción tiene un album
- Un albun tiene muchas canciones

- Una canción tiene un genero
- Un genero tiene muchas canciones

- Una canción tiene un artista
- Un artista tiene muchas canciones


Todos los elementos para llevar a cabo este proyecto se encuentran adjuntos. ¡no te olvides de descargarlo ni de leer el readme!



Esta instancia consiste en desarrollar un CRUD de una aplicación conectada a la base de datos que se encuentra dentro del zip. El desarrollo a implementar es solo de backend tipo API REST.

Para ello te mencionamos varios de los módulos que vas a tener que usar:

Express
Sequelize
Mysql2
Entre otros
Respecto a la base de datos, vas a tener que importarla como se vio varias veces en la clase, el script de importación se encuentra en el material.

En nuestro proyecto de Express queremos modelar la base de datos mediante sequelize.

Deberán estar presentes los siguientes endpoints:

/canciones (GET) que muestre un listado de las canciones con sus propiedades

/canciones (POST) para crear un nuevo registro de una canción

/canciones/:id (GET) que muestre una canción

/canciones/:id (PUT) para editar una canción

/canciones/:id (DELETE) para eliminar una canción

/generos (GET) listado de todos los géneros con sus canciones

Aclaración: para todos los endpoints se debe devolver un json con su código de estado y el resultado correspondiente, en caso de haberlo.