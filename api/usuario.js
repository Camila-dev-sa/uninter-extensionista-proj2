const dbTrabalho = require('./mysql')// Importando o módulo de conexão com o banco de dados
const usuario = {
    async login (req, res) {// Função de login
        var email = req.body.email;// Pega o email do corpo da requisição
        var senha = req.body.senha;// Pega a senha do corpo da requisição
        var logou = false;// Variável para verificar se o usuário logou
        dbTrabalho.query(// Query para verificar se o usuário existe
            'SELECT * FROM Usuarios WHERE email = ? AND senha = ?', // Query
            [email, senha], // Parâmetros
            async (err, rows) => {// Função de callback
                if(rows[0]) {// Se o usuário existir no banco de dados
                    // Salva o nome do usuário na sessão
                    logou =  rows[0].nome;
                }
                res.json({success: logou});// Retorna se o usuário logou ou não
        });
    },
}

module.exports = usuario