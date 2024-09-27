create database Trabalho;
use Trabalho;

create table Usuario (
	idUsuario int primary key auto_increment,
    nome varchar(50) not null,
    email varchar(50) not null
);

create table Bebedouro (
    idBebedouro int primary key auto_increment,
    nome varchar(50) not null,
    localizacao varchar(50) not null
);

create table Analises (
	idAnalise int primary key auto_increment,
    dataColeta date not null,
    dataResultado date not null,
    resultado boolean not null,
    foreign key (idBebedouro) references Bebedouro (idBebedouro)
);