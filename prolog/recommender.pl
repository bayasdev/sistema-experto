:- use_module(db).

% DB operations

get_movies_db(Row) :-
    connect_db,
    odbc_query('postgres', 'SELECT * FROM movies ORDER BY id ASC', Row).

% asserts all movies from the database as facts

assert_movies :-
    retractall(movie(_,_,_)),
    get_movies_db(Row),
    Row = row(Id, Name, GenreId),
    assert(movie(Id, Name, GenreId)),
    fail.
assert_movies.

% recommend movies by genre

recommend_movies(GenreId, MovieID, MovieName) :-
    movie(MovieID, MovieName, GenreId).
