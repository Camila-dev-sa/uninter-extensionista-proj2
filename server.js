const express = require('express')
const app = express()
const ejs = require('ejs')
const port = 3000;
app.engine('html', ejs.renderFile)
app.get('/', function (req, res) {
  res.render('index.html')
})
app.get('/contato', function (req, res) {
  res.render('contato.html')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})