DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS genres;

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre_id INT,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- inserta generos

INSERT INTO genres (name) VALUES ('accion');
INSERT INTO genres (name) VALUES ('comedia');
INSERT INTO genres (name) VALUES ('drama');
INSERT INTO genres (name) VALUES ('terror');
INSERT INTO genres (name) VALUES ('infantil');

-- algunas peliculas de prueba

INSERT INTO movies (name, genre_id) VALUES ('terminator', 1);
INSERT INTO movies (name, genre_id) VALUES ('transformers', 1);
INSERT INTO movies (name, genre_id) VALUES ('rapidos_y_furiosos', 1);
INSERT INTO movies (name, genre_id) VALUES ('mision_imposible', 1);
INSERT INTO movies (name, genre_id) VALUES ('avengers', 1);
INSERT INTO movies (name, genre_id) VALUES ('una_noche_en_el_museo', 2);
INSERT INTO movies (name, genre_id) VALUES ('los_pinguinos_del_senor_poper', 2);
INSERT INTO movies (name, genre_id) VALUES ('dolittle', 2);
INSERT INTO movies (name, genre_id) VALUES ('titanic', 3);
INSERT INTO movies (name, genre_id) VALUES ('oppenheimer', 3);
INSERT INTO movies (name, genre_id) VALUES ('el_exorcista', 4);
INSERT INTO movies (name, genre_id) VALUES ('el_conjuro', 4);
INSERT INTO movies (name, genre_id) VALUES ('toy_story', 5);
INSERT INTO movies (name, genre_id) VALUES ('encanto', 5);
INSERT INTO movies (name, genre_id) VALUES ('moana', 5);
INSERT INTO movies (name, genre_id) VALUES ('mi_villano_favorito', 5);
INSERT INTO movies (name, genre_id) VALUES ('madagascar', 5);
