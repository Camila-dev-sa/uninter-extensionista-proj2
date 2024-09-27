create database Trabalho;
use Trabalho;

create table Usuario (
	idUsuario int not null,
    nome varchar(50) not null,
    email varchar(50) not null,
    primary key (idUsuario)
);

create table Bebedouro (
    idBebedouro int not null,
    nome varchar(50) not null,
    localizacao varchar(20) not null,
    primary key (idBebedouro)
);

create table Analises (
	idAnalise int not null,
    dataColeta date not null,
    dataResutado date not null,
    resultado boolean not null,
    foreign key (idBebedouro) references Bebedouro (idBebedouro)
);