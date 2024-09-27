const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ejs = require('ejs')
const port = 3000;
app.engine('html', ejs.renderFile);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.render('login.html')
})
app.get('/login', function (req, res) {
  res.render('login.html')
})
app.get('/contato', function (req, res) {
  res.render('contato.html')
})

app.post('/form-login', function (req, res) {
  var email = req.body.email;
  var senha = req.body.senha;
  console.log(email, senha)
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})