create schema escuela
use schema escuela

create table maestro (
ID int,
nombre varchar(50),
PRIMARY KEY (ID)
);


create table alumno (
ID int,
nombre varchar(50),
maestro_id int,
PRIMARY KEY (ID),
FOREIGN KEY (maestro_id) REFERENCES maestro(ID)
);

