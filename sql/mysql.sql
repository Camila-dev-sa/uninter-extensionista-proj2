create database Trabalho;
use Trabalho;

create table Usuarios (
	idUsuario int primary key auto_increment,
    nome varchar(50) not null,
    senha varchar (50) not null,
    email varchar(50) not null unique 
);

create table Bebedouros (
    idBebedouro int primary key auto_increment,
    nome varchar(50) not null,
    localizacao varchar(50) not null
);

create table Analises (
    idAnalise int primary key auto_increment,
    dataColeta date not null,
    dataResultado date,
    resultado boolean,
    idBebedouro int not null,
    foreign key (idBebedouro) references Bebedouros (idBebedouro)
);

INSERT INTO Usuarios (nome, senha, email) VALUES ('Camila Santos', '1234', 'camila@trabalho.com');
