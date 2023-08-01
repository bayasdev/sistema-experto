% DB connection

:- use_module(library(odbc)).

connect_db :-
    odbc_connect('quever', _, [
      alias(postgres),
      open(once)
    ]).

% CRUD operations

get_movies(Row) :-
    connect_db,
    odbc_query('postgres', 'SELECT * FROM movies ORDER BY id ASC', Row).

create_movie(Name, GenreId) :-
    connect_db,
    odbc_query('postgres', "INSERT INTO movies (name, genre_id) VALUES ('~w', '~w')"-[Name, GenreId]).

update_movie(Id, Name, GenreId) :-
    connect_db,
    odbc_query('postgres', "UPDATE movies SET name = '~w', genre_id = '~w' WHERE id = ~w"-[Name, GenreId, Id]).

delete_movie(Id) :-
    connect_db,
    odbc_query('postgres', "DELETE FROM movies WHERE id = ~w"-[Id]).
