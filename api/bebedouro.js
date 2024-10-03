//Nesse arquivo estão as funções que realizam as operações de CRUD no banco de dados para a tabela Bebedouros
//Ja esta comentado no usuario.js linha a linha
const dbTrabalho = require('./mysql')

const bebedouro = {
    cadastrarBebedouro (req, res) {
        var nome = req.body.nomeBebedouro;
        var localizacao = req.body.localizacaoBebedouro;

        dbTrabalho.query('INSERT INTO Bebedouros (nome, localizacao) VALUES (?, ?)', [nome, localizacao], (err) => {
            console.log(err);
            
            res.redirect('/bebedouros');
        });
    },

    atualizarBebedouro (req, res) {
        var idBebedouro = req.body.idBebedouro;
        var nome = req.body.nomeBebedouro;
        var localizacao = req.body.localizacaoBebedouro;

        dbTrabalho.query('UPDATE Bebedouros SET nome = ?, localizacao = ? WHERE idBebedouro = ?', [nome, localizacao, idBebedouro], (err) => {
            res.redirect('/bebedouros');
        });
    },

    apagarBebedouro (req, res) {
        var idBebedouro = req.query.idBebedouro;
        dbTrabalho.query('DELETE FROM Bebedouros WHERE idBebedouro = ?', [idBebedouro], (err) => {
            res.redirect('/bebedouros');
        });
    },

    buscarTodosBebedouros(req, res) {
        dbTrabalho.query('SELECT * FROM Bebedouros', (err, rows) => {
            res.json(rows);
        });
    },

    buscarBebedouroPorId(req, res) {
        var idBebedouro = req.params.idBebedouro;

        dbTrabalho.query('SELECT * FROM bebedouro WHERE idBebedouro = ?', [idBebedouro], (err, rows) => {
            res.json(rows);
        });
    },

    buscarBebedoutosComAnalises(req, res) {
        //busca todos os bebedouros e a ultima analise de cada um
        dbTrabalho.query('SELECT * FROM Bebedouros b LEFT JOIN Analises a ON b.idBebedouro = a.idBebedouro WHERE a.idAnalise = (SELECT MAX(idAnalise) FROM Analises WHERE idBebedouro = b.idBebedouro)', (err, rows) => {
            res.json(rows);
        });
    }
}

module.exports = bebedouro