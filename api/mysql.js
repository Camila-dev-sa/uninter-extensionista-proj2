const mysql = require('mysql2');// Importa o módulo mysql2 para conexão com o banco de dados

const dbTrabalho = mysql.createConnection({// Cria a conexão com o banco de dados
    host: 'localhost',// Host do banco de dados
    user: 'root',// Usuário do banco de dados
    password: 'root',// Senha do banco de dados
    database: 'trabalho'// Nome do banco de dados
});

// Conecta ao banco de dados
dbTrabalho.connect((err) => {// Função de callback
    if (err) {// Se houver erro
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');// Se não houver erro, exibe essa mensagem no console
});

// Exporta a conexão com o banco de dados para ser utilizada em outros usuarios.js, analises.js e bebedouros.js
module.exports = dbTrabalho;