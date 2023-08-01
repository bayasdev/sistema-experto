% DB connection module

:- module(db, [connect_db/0]).


:- use_module(library(odbc)).

connect_db :-
    odbc_connect('quever', _, [
      alias(postgres),
      open(once)
    ]).
