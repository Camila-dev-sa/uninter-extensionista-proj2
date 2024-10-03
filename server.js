const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ejs = require('ejs')
const port = 3000;

app.engine('html', ejs.renderFile);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usuario = require('./api/usuario.js')
const bebedouro = require('./api/bebedouro.js')
const analise = require('./api/analise.js')

app.get('/', function (req, res) {
  res.render('painel.html')
})

app.get('/login', function (req, res) {
  res.render('login.html')
})

app.get('/contato', function (req, res) {
  res.render('contato.html')
})

app.get('/painel', function (req, res) {
  res.render('painel.html')
})

app.get('/analises', function (req, res) {
  res.render('analises.html')
})

app.get('/bebedouros', function (req, res) {
  res.render('bebedouros.html')
})

app.get('/novo-bebedouro', function (req, res) {
  res.render('novo-bebedouro.html')
})

//Apis
app.post('/login', async function (req, res) {
  let logou = await usuario.login(req, res)
  console.log(logou);
  
})

app.post('/cadastrar-bebedouro', async function (req, res) {
  bebedouro.cadastrarBebedouro(req, res)
})

app.get('/buscar-todos-bebedouros', async function (req, res) {
  bebedouro.buscarTodosBebedouros(req, res)
})

app.post('/atualizar-bebedouro', async function (req, res) {
  bebedouro.atualizarBebedouro(req, res)
})

app.get('/apagar-bebedouro', async function (req, res) {
  bebedouro.apagarBebedouro(req, res)
})

app.get('/buscar-bebedouros-com-analises', async function (req, res) {
  bebedouro.buscarBebedoutosComAnalises(req, res)
})

app.get('/buscar-todas-analises', async function (req, res) {
  analise.buscarTodasAnalises(req, res)
})

app.post('/cadastrar-analise', async function (req, res) {
  analise.cadastrarAnalise(req, res)
})

app.post('/atualizar-analise', async function (req, res) {
  analise.atualizarAnalise(req, res)
})

app.get('/apagar-analise', async function (req, res) {
  analise.apagarAnalise(req, res)
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
})