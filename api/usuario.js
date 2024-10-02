const dbTrabalho = require('./mysql')
const usuario = {
    async login (req, res) {
        var email = req.body.email;
        var senha = req.body.senha;
        dbTrabalho.query('SELECT * FROM Usuarios WHERE email = ? AND senha = ?', [email, senha], (err, rows) => {
            let logou = false;
            if (err) {
                logou =  false;
            }
            if(rows[0]) {
                logou =  rows[0].nome;
            }
            console.log(logou);
            
            if (logou !== false) {
                res.redirect('/painel')
            } else {
                res.redirect('/login')
            }
        });
    },
}

module.exports = usuario