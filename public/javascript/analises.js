document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('editarAnalise').style.display = 'none';//esconde o form de edição editar-analise
    document.getElementById('novoAnaliseForm').style.display = 'none';//esconde o form de cadastro novo-analise
    await buscarTodosAnalises();//busca todos os analises

    let novoAnalise = document.getElementById('novoAnalise');//pega o botão de novo analise
    novoAnalise.addEventListener('click', function() {
        buscarTodosBebedouros()//busca todos os bebedouros e renderiza no select
        document.getElementById('editarAnalise').style.display = 'none'; //mostra o form de cadastro novo-analise
        document.getElementById('novoAnaliseForm').style.display = ''; //mostra o form de cadastro novo-analise
    });

    // Seleciona todos os elementos com a classe 'apagar-analise'
    let botoesApagar = document.getElementsByClassName('apagar-analise');//pega todos os botões de apagar analise
    Array.from(botoesApagar).forEach(function(botao) {//itera sobre a coleção de elementos e adiciona um evento de clique a cada um
        botao.addEventListener('click', function() {
            let idAnalise = this.parentNode.parentNode.children[0].innerText;//pega o id do analise
            let confirmacao = confirm('Deseja realmente apagar o analise?');//pergunta se o usuario quer mesmo excluir
            if (confirmacao) {
                //exclui o analise
                fetch('/apagar-analise?idAnalise=' + idAnalise, {
                    method: 'get'
                })
                .then((response) => {
                    buscarTodosAnalises();//busca todos os analises e renderiza na tabela
                });
            }
        });
    });

    let botoesEditar = document.getElementsByClassName('editar-analise');

    Array.from(botoesEditar).forEach( function(botao) {
        botao.addEventListener('click', async function() {
            await buscarTodosBebedouros()
            let idAnalise = this.parentNode.parentNode.children[0].innerText;
            let dataColeta = reverteData(this.parentNode.parentNode.children[1].innerText);
            let idBebedouro = this.parentNode.parentNode.children[2].innerText;
            let dataResultado = reverteData(this.parentNode.parentNode.children[3].innerText);
            let resultado = this.parentNode.parentNode.children[4].innerText;

            if (resultado == 'Potável') {//se o resultado for potável, coloca 1 no campo resultado
                resultado = 1;
            } else if (resultado == 'Não potável'){//se o resultado for não potável, coloca 0 no campo resultado
                resultado = 0;
            } else {//se não for nenhum dos dois, coloca vazio
                resultado = '';
            }

            document.getElementById('idAnalise').value = idAnalise;
            document.getElementById('dataColeta').value = dataColeta;
            document.getElementById('idBebedouro').value = idBebedouro;
            document.getElementById('dataResultado').value = dataResultado;
            document.getElementById('resultado').value = resultado;

            //mostra o form de edição editar-analise
            document.getElementById('editarAnalise').style.display = '';
            document.getElementById('novoAnaliseForm').style.display = 'none';

            
        });
    });


});

async function buscarTodosAnalises(){
    console.log('Buscando todos os analises');
    
    //faz a requisição para o servidor
    await fetch('/buscar-todas-analises', {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        
        //pega o elemento da tabela
        var tabela = document.getElementById('table-analises');
        var conteudo = '';

        //para cada analise, cria uma linha na tabela
        for (var i = 0; i < data.length; i++){
            var dataColetaBr = formataData(data[i].dataColeta)
            var dataResultado = formataData(data[i].dataResultado)
            var potavel = textoAguaPotavel(data[i].resultado)
            conteudo += '<tr>';
            conteudo += '<td>' + data[i].idAnalise + '</td>';
            conteudo += '<td>' + dataColetaBr + '</td>';
            conteudo += '<td>' + data[i].idBebedouro + '</td>';
            conteudo += '<td>' + dataResultado + '</td>';
            conteudo += '<td>' + potavel + '</td>';
            conteudo += '<td><button class="botoes editar-analise"><img src="./imagens/pen-solid.svg"/></button>';
            conteudo += '<button class="botoes-vermelho apagar-analise"><img src="./imagens/trash-can-solid.svg"/></button></td>';
            conteudo += '</tr>';
        }

        //cria na tablea tbpdy com o conteudo
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Data Coleta</th>
                    <th scope="col">Bebedouro</th>
                    <th scope="col">Data Resultado</th>
                    <th scope="col">Resultado</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                ${conteudo}
            </tbody>`
            
    });
}

async function buscarTodosBebedouros(){
    console.log('Buscando todos os bebedouros');
    
    await fetch('/buscar-todos-bebedouros', {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var selectsIdBebedouro = document.getElementsByClassName('idBebedouro');
        //limpa os options do select
        for (var i = 0; i < selectsIdBebedouro.length; i++){
            selectsIdBebedouro[i].innerHTML = '';
        }
        var option = ''
        for (var i = 0; i < data.length; i++){
            option += '<option value="' + data[i].idBebedouro + '">' + data[i].idBebedouro + ' - ' + data[i].nome + '</option>';
            
        }
        //adiciona os options no select
        for (var i = 0; i < selectsIdBebedouro.length; i++){
            selectsIdBebedouro[i].innerHTML = option;
        }
    });
}
