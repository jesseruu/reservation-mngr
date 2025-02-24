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

INSERT INTO
    booking.classifications (name)
VALUES
    ('Apta para todo público'),
    ('Recomendada para mayores de 7 años'),
    ('Recomendada para mayores de 12 años'),
    ('Apta para mayores de 15 años'),
    ('Apta para mayores de 18 años');

INSERT INTO
    booking.rooms (name, seat_numbers)
VALUES
    ('Centro Chia', 50),
    ('Centro Mayor', 40),
    ('Galerias', 60),
    ('Metropolis', 30),
    ('Unicentro', 50),
    ('Nuestro Bogota', 50),
    ('Plaza Central', 40),
    ('Portal 80', 40),
    ('Santa Fe', 40),
    ('Titan Plaza', 60);

INSERT INTO
    booking.movies (
        image_url,
        genres,
        title,
        release_date,
        duration,
        classification_id,
        description
    )
VALUES
    ('https://xl.movieposterdb.com/22_10/2022/9114286/xl_black-panther-wakanda-forever-movie-poster_7d7dc251.jpg','{Acción, Aventura, Drama}', 'Black Panther: Wakanda Forever', 2022, 161, 3, 'Los habitantes de Wakanda luchan por proteger su hogar de la intervención de las potencias mundiales mientras lloran la muerte del rey TChalla.'),
    ('https://xl.movieposterdb.com/22_11/2022/1630029/xl_avatar-the-way-of-water-movie-poster_9672cea6.jpg','{Acción, Aventura, Fantasía}', 'Avatar: The Way of Water', 2022, 192, 3, 'Jake Sully vive con su recién formada familia en la luna extrasolar Pandora. Cuando una amenaza familiar regresa para acabar con lo que se había empezado, Jake debe trabajar con Neytiri y el ejército de la raza Navi para proteger su hogar.'),
    ('https://xl.movieposterdb.com/22_04/2/6710474/xl_6710474_7ad8ab0d.jpg','{Acción, Aventura, Comedia}', 'Everything Everywhere All at Once', 2022, 139, 5, 'Una inmigrante china de mediana edad se ve arrastrada a una loca aventura en la que sólo ella puede salvar la existencia explorando otros universos y conectando con las vidas que podría haber llevado.'),
    ('https://xl.movieposterdb.com/14_09/2014/816692/xl_816692_2beaba6e.jpg?v=2025-02-10%2020:28:48','{Comedia, Drama, Ciencia Ficción}', 'Interstellar', 2014, 169, 3, 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.'),
    ('https://xl.movieposterdb.com/22_05/2021/10872600/xl_10872600_c9d86c54.jpg?v=2025-01-06%2020:59:35','{Acción, Aventura, Fantasía}', 'Spider-Man: No Way Home', 2021, 148, 3, 'Una vez revelada la identidad de Spider-Man, Peter pide ayuda al Doctor Extraño. Cuando un hechizo sale mal, comienzan a aparecer peligrosos enemigos de otros mundos, obligando a Peter a descubrir lo que realmente significa ser Spider-Man.'),
    ('https://xl.movieposterdb.com/15_07/2015/1392190/xl_1392190_50142848.jpg','{Acción, Aventura, Ciencia Ficción}', 'Mad Max: Fury Road', 2015, 120, 5, 'En un páramo postapocalíptico, una mujer se rebela contra un gobernante tiránico en busca de su patria con la ayuda de un grupo de prisioneras, un adorador psicótico y un vagabundo llamado Max.'),
    ('https://xl.movieposterdb.com/23_02/2023/6718170/xl_untitled-super-mario-project-movie-poster_c004ecb2.jpg?v=2025-01-27%2014:06:09','{Acción, Aventura, Drama}', 'The Super Mario Bros. Movie', 2023, 92, 2, 'La historia de los Super Mario Bros. en su viaje por el Reino Champiñón'),
    ('https://xl.movieposterdb.com/23_03/2023/26537229/xl_demon-slayer-kimetsu-no-yaiba-to-the-swordsmith-village-movie-poster_411b24e8.jpg?v=2024-06-01%2004:06:30','{Acción, Animación, Comedia}', 'Demon Slayer: Kimetsu No Yaiba - To the Swordsmith Village', 2023, 110, 5, 'Todos los Demonios de Rango Superior se reúnen en el Castillo del Infinito tras la derrota de los Seis Demonios Superiores.'),
    ('https://xl.movieposterdb.com/23_02/2022/1488589/xl_pinocchio-movie-poster_e8e0579e.jpg?v=2024-11-20%2018:55:37','{Acción, Aventura, Animación}', 'Guillermo del Toros Pinocchio', 2022, 117, 2, 'El deseo de un padre trae mágicamente a la vida a un niño de madera en Italia, dándole la oportunidad de cuidar de él.'),
    ('https://xl.movieposterdb.com/22_10/2022/14668630/xl_lyle-lyle-crocodile-movie-poster_c21a9a67.jpg?v=2023-11-08%2017:17:33','{Animación, Drama}', 'Lyle, Lyle, Crocodile', 2022, 106, 2, 'Largometraje basado en el libro infantil sobre un cocodrilo que vive en Nueva York.'),
    ('https://xl.movieposterdb.com/22_02/2019/6105098/xl_6105098_3c46c8c0.jpg?v=2025-02-04%2008:13:21','{Animación, Aventura, Comedia}', 'The Lion King', 2019, 118, 2, 'Tras el asesinato de su padre, un joven príncipe león huye de su reino sólo para aprender el verdadero significado de la responsabilidad y la valentía.'),
    ('https://xl.movieposterdb.com/23_02/2022/15339456/xl_marcel-the-shell-with-shoes-on-movie-poster_cf31a7f5.jpg?v=2024-07-03%2012:31:27','{Animación, Aventura, Drama}', 'Marcel the Shell with Shoes On', 2021, 90, 2, 'Largometraje de adaptación del corto de animación que entrevista a un molusco llamado Marcel.'),
    ('https://xl.movieposterdb.com/22_11/2023/15679400/xl_knock-at-the-cabin-movie-poster_1ec45cda.jpg?v=2024-12-03%2017:49:41','{Animación, Comedia, Drama}', 'Knock at the Cabin', 2023, 100, 5, 'Durante unas vacaciones, una niña y sus padres son tomados como rehenes por unos desconocidos armados que exigen a la familia que tome una decisión para evitar el apocalipsis.'),
    ('https://xl.movieposterdb.com/22_12/2022/9764362/xl_the-menu-movie-poster_5506d7ca.jpeg?v=2025-01-31%2012:52:04','{Terror, Misterio, Thriller}', 'The Menu', 2022, 107, 5, 'Una joven pareja viaja a una isla remota para comer en un exclusivo restaurante donde el chef ha preparado un lujoso menú, con algunas sorpresas impactantes.'),
    ('https://xl.movieposterdb.com/25_02/2023/8760708/xl_m3gan-movie-poster_f845f11f.jpg?v=2025-02-03%2016:51:41','{Terror, Thriller}', 'M3GAN', 2022, 102, 4, 'Un ingeniero de robótica de una empresa de juguetes construye un muñeco parecido a la vida real que empieza a cobrar vida propia.'),
    ('https://xl.movieposterdb.com/21_11/2016/5157456/xl_5157456_1bbc5856.jpg?v=2022-05-06%2009:34:14','{Terror, Ciencia Ficción, Thriller}', 'Viking Wolf', 2022, 97, 4, 'Thale (17 años) acaba de mudarse con sus padres a una pequeña ciudad después de que su madre haya conseguido un nuevo trabajo en la policía local. Después de que un estudiante sea brutalmente asesinado en una fiesta a la que Thale asiste, se convierte en una testigo clave. ¿Fue el asesino un animal? ¿Un lobo?'),
    ('https://xl.movieposterdb.com/23_02/2023/10365998/xl_infinity-pool-movie-poster_9766efd5.jpg?v=2024-03-05%2020:13:30','{Terror, Thriller}', 'Infinity Pool', 2023, 117, 5, 'James y Em Foster están disfrutando de unas vacaciones en la playa con todo incluido en la isla ficticia de La Tolqa, cuando un accidente mortal deja al descubierto la perversa subcultura del complejo de turismo hedonista, violencia temeraria y horrores surrealistas.'),
    ('https://xl.movieposterdb.com/23_02/2023/17663992/xl_scream-vi-movie-poster_d911891f.jpg?v=2024-09-02%2017:55:02','{Crimen, Terror, Thriller}', 'Scream VI', 2023, 123, 5, 'En la próxima entrega, los supervivientes de los asesinatos de Ghostface dejan atrás Woodsboro y comienzan un nuevo capítulo en la ciudad de Nueva York.'),
    ('https://xl.movieposterdb.com/22_11/1997/122590/xl_the-locksmith-movie-poster_d1c1d9ec.jpg?v=2022-11-05%2015:39:22','{Terror, Misterio, Thriller}', 'The Locksmith', 2023, 92, 5, 'Un ladrón recién salido de la cárcel intenta volver a la vida de su hija y su ex prometido. Decidido, se ve obligado a utilizar las habilidades que posee como cerrajero superdotado. Las cosas dan un giro tumultuoso tras una desaparición inesperada.'),
    ('https://xl.movieposterdb.com/08_06/2008/468569/xl_468569_fe24b125.jpg','{Acción, Misterio, Thriller}', 'The Dark Knight', 2008, 152, 4, 'Cuando la amenaza conocida como el Joker siembra el caos y el caos entre los habitantes de Gotham, Batman debe aceptar una de las mayores pruebas psicológicas y físicas de su capacidad para luchar contra la injusticia.'),
    ('https://xl.movieposterdb.com/10_06/2010/1375666/xl_1375666_07030c72.jpg?v=2025-02-01%2019:28:58','{Acción, Crimen, Drama}', 'Inception', 2010, 148, 4, 'A un ladrón que roba secretos corporativos mediante el uso de tecnología para compartir sueños se le encomienda la tarea inversa de plantar una idea en la mente de un director general, pero su trágico pasado puede condenar al proyecto y a su equipo al desastre.'),
    ('https://xl.movieposterdb.com/11_01/2010/947798/xl_947798_b2b1eb0c.jpg?v=2024-12-12%2011:56:59','{Acción, Aventura, Ciencia Ficción}', 'Black Swan', 2010, 108, 5, 'Una bailarina comprometida lucha por mantener la cordura tras ganar el papel protagonista en una producción de «El lago de los cisnes» de Tchaikovsky.'),
    ('https://xl.movieposterdb.com/23_02/2021/10366206/xl_john-wick-chapter-4-movie-poster_2c8df497.jpg?v=2024-11-27%2006:36:07','{Drama, Thriller}', 'John Wick: Chapter 4', 2023, 169, 5, 'John Wick descubre un camino para derrotar a La Mesa Alta. Pero antes de que pueda ganar su libertad, Wick debe enfrentarse a un nuevo enemigo con poderosas alianzas en todo el mundo y fuerzas que convierten a viejos amigos en enemigos.'),
    ('https://xl.movieposterdb.com/21_08/2021/10954652/xl_10954652_748ed199.jpg?v=2024-03-27%2007:18:11','{Acción, Crimen, Thriller}', 'Old', 2021, 108, 4, 'Una familia de vacaciones descubre que la solitaria playa en la que se están relajando durante unas horas les está haciendo envejecer rápidamente, reduciendo toda su vida a un solo día.'),
    ('https://xl.movieposterdb.com/22_11/2019/8772262/xl_midsommar-movie-poster_a64c4d73.jpeg','{Drama, Terror, Misterio}', 'Midsommar', 2019, 148, 5, 'Una pareja viaja al norte de Europa para visitar el legendario festival sueco de mediados de verano de su pueblo natal. Lo que comienza como un retiro idílico se convierte rápidamente en una competición cada vez más violenta y extraña a manos de un culto pagano.'),
    ('https://xl.movieposterdb.com/23_02/2022/12477480/xl_heojil-kyolshim-movie-poster_53a6d967.jpg?v=2024-01-20%2017:42:20','{Crimen, Drama, Misterio}', 'Decision to Leave', 2022, 139, 5, 'Un detective que investiga la muerte de un hombre en las montañas conoce a la misteriosa esposa del fallecido en el transcurso de su tenaz investigación.');