% DB connection

:- use_module(library(odbc)).

connect_db :-
    odbc_connect('quever', _, [
      alias(postgres),
      open(once)
    ]).

% CRUD operations

get_genres(Row) :-
    connect_db,
    odbc_query('postgres', 'SELECT * FROM genres ORDER BY id ASC', Row).

create_genre(Name) :-
    connect_db,
    odbc_query('postgres', "INSERT INTO genres (name) VALUES ('~w')"-[Name]).

update_genre(Id, Name) :-
    connect_db,
    odbc_query('postgres', "UPDATE genres SET name = '~w' WHERE id = ~w"-[Name, Id]).

delete_genre(Id) :-
    connect_db,
    odbc_query('postgres', "DELETE FROM genres WHERE id = ~w"-[Id]).
