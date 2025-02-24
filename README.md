# Reservation Manager
Manager para la administracion la reversa de peliculas

En el seguiente archivo puede encontrar información para ejecutar la API

## Comandos
Los siguientes comandos son necesarios para iniciar la API

```bash
# Instalar dependencias
npm i

# Iniciar la API
npm start
```

## Pasos preliminares

Esta API hace uso de una base de datos postgres. La estructura de la base de datos se puede ver en la carpeta `src/models` pero otra forma es ejecutar el archivo donde de la carpeta `scripts`.

Allí se encontrara todos los scripts para crear las tablas e información de base adicional.

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS booking;

CREATE TABLE
    booking.users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        UNIQUE (email),
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL
    );

CREATE TABLE
    booking.classifications (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL
    );

CREATE TABLE
    booking.movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        release_date INTEGER NOT NULL,
        genres VARCHAR[] NOT NULL,
        duration INT NOT NULL,
        classification_id INT NOT NULL,
        image_url TEXT,
        description TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
        UNIQUE (title),
        CONSTRAINT fk_movies_classification FOREIGN KEY (classification_id) REFERENCES booking.classifications (id)
    );

CREATE TABLE
    booking.rooms (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        seat_numbers INT NOT NULL,
        UNIQUE (name),
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL
    );

CREATE TABLE
    booking.seats (
        id SERIAL PRIMARY KEY,
        seat_code VARCHAR NOT NULL,
        room_id INT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
        CONSTRAINT fk_seats_room FOREIGN KEY (room_id) REFERENCES booking.rooms (id)
    );

CREATE TABLE
    booking.reservations (
        id SERIAL PRIMARY KEY,
        user_uuid UUID NOT NULL,
        movie_id INT NULL,
        room_id INT NULL,
        start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
        CONSTRAINT fk_reservations_user FOREIGN KEY (user_uuid) REFERENCES booking.users (id),
        CONSTRAINT fk_reservations_movie FOREIGN KEY (movie_id) REFERENCES booking.movies (id),
        CONSTRAINT fk_reservations_room FOREIGN KEY (room_id) REFERENCES booking.rooms (id)
    );
```
## Credenciales

Para su uso local debe generar un archvo `.env ` para el cargue de información sensible. La información necesaria para el funcionamiento de la api es la siguiente:
```zsh
DB_NAME=
DB_PASSWORD=
DB_USER=
DB_HOST=
API_PORT=
API_PATH=/api/v1
JWT_SECRET=reservation_token
LIMIT=10
OFFSET=0
ACCESS_KEY=
SECRET_ACCESS_KEY=
EMAIL=
```
`ACCESS_KEY`,`SECRET_ACCESS_KEY` e `EMAIL` son credenciales necesarias para envio por correos usando el servicio de AWS SES, para ello debe configurar una politica con acceso al servicio y exportar los secretos de conexion de AWS

Las variables que empiezan con DB son de base de datos, se uso una RDS de AWS con el motor postgres.

## Endpoinds

Algunos endpoinds de prueba son los siguientes:

### Traer todos las reservas
```curl
curl --location 'http://localhost:3001/api/v1/reservations' \
--header 'X-RqUID: 320bf6e6-393f-4d40-a119-4640ab8a51f3'
```

### Traer todas las peliculas
```curl
curl --location 'http://localhost:3001/api/v1/movies?limit=10&offset=0' \
--header 'X-RqUID: 320bf6e6-393f-4d40-a119-4640ab8a51f3'
```

### Crear una pelicula
```curl
curl --location 'http://localhost:3001/api/v1/movies' \
--header 'X-RqUID: 320bf6e6-393f-4d40-a119-4640ab8a51f3' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Luther: The Fallen Sun",
    "releaseDate": 2010,
    "genres": ["Crimen", "Drama", "Misterio"],
    "duration": "129",
    "imageUrl": "https://test.com",
    "classification": "Apta para mayores de 18 años",
    "description": "El brillante pero caído en desgracia detective John Luther se fuga de la cárcel para dar caza a un sádico asesino en serie que está aterrorizando Londres."
}'
```

### Traer las salas
```curl
curl --location 'http://localhost:3001/api/v1/rooms' \
--header 'X-RqUID: 320bf6e6-393f-4d40-a119-4640ab8a51f3'
```

### Crear salas

```curl
curl --location 'http://localhost:3001/api/v1/rooms' \
--header 'X-RqUID: 320bf6e6-393f-4d40-a119-4640ab8a51f3' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Plaza España",
    "seatNumbers": 50
}'
```

### Hacer una reservacion
```curl
curl --location 'http://localhost:3001/api/v1/users/ed310fc4-fdd0-409d-b6a3-f3dc755e4c13/reservations' \
--header 'X-RqUID: 320bf6e6-393f-4d40-a119-4640ab8a51f3' \
--header 'Content-Type: application/json' \
--data '{
    "movieId": "1",
    "roomId": "1",
    "startTime": "2025/02/25 21:00:00",
    "seats": [
        {"seatCode": "A1"}
    ]
}'
```