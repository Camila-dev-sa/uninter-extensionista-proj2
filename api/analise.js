const dbTrabalho = require('./mysql')

const analise = {
    cadastrarAnalise (req, res) {
        var dataColeta = req.body.dataColeta;
        var idBebedouro = req.body.idBebedouro;
        dbTrabalho.query('INSERT INTO Analises (dataColeta, idBebedouro) VALUES (?, ?)', [dataColeta, idBebedouro], (err) => {
            res.redirect('/analises');
        });
    },

    atualizarAnalise (req, res) {
        var idAnalise = req.body.idAnalise;
        var dataColeta = req.body.dataColeta;
        var dataResultado = req.body.dataResultado || null;
        var resultado = req.body.resultado || null;
        var idBebedouro = req.body.idBebedouro;

        console.log('Atualizando analise ' + idAnalise, dataColeta, dataResultado, resultado, idBebedouro);
        

        dbTrabalho.query('UPDATE Analises SET dataColeta = ?, dataResultado = ?, resultado = ?, idBebedouro = ? WHERE idAnalise = ?', [dataColeta, dataResultado, resultado, idBebedouro, idAnalise], (err) => {
            res.redirect('/analises');
        });
    },

    adicionarResultado (req, res) {
        var idAnalise = req.body.idAnalise;
        var resultado = req.body.resultado;

        dbTrabalho.query('UPDATE Analises SET resultado = ? WHERE idAnalise = ?', [resultado, idAnalise], (err) => {
            res.redirect('/analises');
        });
    },

    apagarAnalise (req, res) {
        var idAnalise = req.query.idAnalise;
        dbTrabalho.query('DELETE FROM Analises WHERE idAnalise = ?', [idAnalise], (err) => {
            res.redirect('/analises');
        });
    },

    buscarTodasAnalises(req, res) {
        dbTrabalho.query('SELECT * FROM Analises', (err, rows) => {
            res.json(rows);
        });
    },

    buscarAnalisePorId(req, res) {
        var idAnalise = req.query.id;

        dbTrabalho.query('SELECT * FROM Analises WHERE idAnalise = ?', [idAnalise], (err, rows) => {
            res.json(rows);
        });
    }
}

module.exports = analise