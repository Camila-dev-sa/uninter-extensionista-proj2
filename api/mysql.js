const mysql = require('mysql2');

const dbTrabalho = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'trabalho'
});
//'root', 'localhost', '$A$005$(DL.R#|XqEI!-nF6Et.AtlrO1RMPgK3vOkvj9I9iZlaVEWBOBGkbEQyz8I.'

// Conecta ao banco de dados
dbTrabalho.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

module.exports = dbTrabalho;