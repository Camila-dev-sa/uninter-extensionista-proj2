document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('editarAnalise').style.display = 'none';
    document.getElementById('novoAnaliseForm').style.display = 'none';
    await buscarTodosAnalises();

    let novoAnalise = document.getElementById('novoAnalise');
    novoAnalise.addEventListener('click', function() {
        buscarTodosBebedouros()
        document.getElementById('novoAnaliseForm').style.display = 'block';
    });

    // Seleciona todos os elementos com a classe 'apagar-analise'
    let botoesApagar = document.getElementsByClassName('apagar-analise');

    // Itera sobre a coleção de elementos e adiciona um evento de clique a cada um
    Array.from(botoesApagar).forEach(function(botao) {
        botao.addEventListener('click', function() {
            let idAnalise = this.parentNode.parentNode.children[0].innerText;
            console.log('Apagando analise ' + idAnalise);
            let confirmacao = confirm('Deseja realmente apagar o analise?');
            if (confirmacao) {
                fetch('/apagar-analise?idAnalise=' + idAnalise, {
                    method: 'get'
                })
                .then((response) => {
                    buscarTodosAnalises();
                });
            }
        });
    });

    let botoesEditar = document.getElementsByClassName('editar-analise');

    Array.from(botoesEditar).forEach(function(botao) {
        botao.addEventListener('click', function() {
            buscarTodosBebedouros()
            let idAnalise = this.parentNode.parentNode.children[0].innerText;
            let dataColeta = this.parentNode.parentNode.children[1].innerText;
            let idBebedouro = this.parentNode.parentNode.children[2].innerText;
            let dataResultado = this.parentNode.parentNode.children[3].innerText;
            let resultado = this.parentNode.parentNode.children[4].innerText;

            if (resultado == 'Potável') {
                resultado = 1;
            }
            else if (resultado == 'Não potável'){
                resultado = 0;
            }
            else {
                resultado = '';
            }

            document.getElementById('idAnalise').value = idAnalise;
            document.getElementById('dataColeta').value = dataColeta;
            document.getElementById('idBebedouro').value = idBebedouro;
            document.getElementById('dataResultado').value = dataResultado;
            document.getElementById('resultado').value = resultado;

            //mostra o form de edição editar-analise
            document.getElementById('editarAnalise').style.display = 'block';

            
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
            var potavel = 'Sem resultado'
            if (data[i].resultado == 1) {
                potavel = 'Potável'
            }
            if (data[i].resultado == 0) {
                potavel = 'Não potável'
            }
            conteudo += '<tr>';
            conteudo += '<td>' + data[i].idAnalise + '</td>';
            conteudo += '<td>' + data[i].dataColeta.split("T")[0] + '</td>';
            conteudo += '<td>' + data[i].idBebedouro + '</td>';
            conteudo += '<td>' + data[i].dataResultado?.split("T")[0] + '</td>';
            conteudo += '<td>' + potavel + '</td>';
            conteudo += '<td><button class="btn btn-primary editar-analise">Editar</button>';
            conteudo += '<button class="btn btn-danger apagar-analise">Apagar</button></td>';
            conteudo += '</tr>';
        }

        //cria na tablea tbpdy com o conteudo
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DataColeta</th>
                    <th scope="col">idBebedouro</th>
                    <th scope="col">DataResultado</th>
                    <th scope="col">Resultado</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                ${conteudo}
            </tbody>`
            
    });
}

function buscarTodosBebedouros(){
    console.log('Buscando todos os bebedouros');
    
    fetch('/buscar-todos-bebedouros', {
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
