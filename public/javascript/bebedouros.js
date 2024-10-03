
document.addEventListener('DOMContentLoaded', function() {//quando a página carregar, executa a função
    validaLogin()
    document.getElementById('editarBebedouro').style.display = 'none';
    document.getElementById('novoBebedouroForm').style.display = 'none';
    buscarTodosBebedouros();

    let novoBebedouro = document.getElementById('novoBebedouro');
    novoBebedouro.addEventListener('click', function() {
        document.getElementById('novoBebedouroForm').style.display = 'block';
        document.getElementById('editarBebedouro').style.display = 'none';
    });

});

function buscarTodosBebedouros(){
    console.log('Buscando todos os bebedouros');
    
    //faz a requisição para o servidor
    fetch('/buscar-todos-bebedouros', {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        
        //pega o elemento da tabela
        var tabela = document.getElementById('table-bebedouros');
        var conteudo = '';

        //para cada bebedouro, cria uma linha na tabela
        for (var i = 0; i < data.length; i++){
            conteudo += '<tr>';
            conteudo += '<td>' + data[i].idBebedouro + '</td>';
            conteudo += '<td>' + data[i].nome + '</td>';
            conteudo += '<td>' + data[i].localizacao + '</td>';
            conteudo += '<td><button class="botoes editar-bebedouro"><img src="./imagens/pen-solid.svg"/></button>';
            conteudo += '<button class="botoes-vermelho apagar-bebedouro"><img src="./imagens/trash-can-solid.svg"/></button></td>';
            conteudo += '</tr>';
        }

        //cria na tabela tbody com o conteudo
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Localização</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                ${conteudo}
            </tbody>`
        
        // Seleciona todos os elementos com a classe 'apagar-bebedouro'
        let botoesApagar = document.getElementsByClassName('apagar-bebedouro');

        // Itera sobre a coleção de elementos e adiciona um evento de clique a cada um
        Array.from(botoesApagar).forEach(function (botao) {
            botao.addEventListener('click', function () {
                let idBebedouro = this.parentNode.parentNode.children[0].innerText;
                console.log('Apagando bebedouro ' + idBebedouro);
                let confirmacao = confirm('Deseja realmente apagar o bebedouro?');
                if (confirmacao) {
                    fetch('/apagar-bebedouro?idBebedouro=' + idBebedouro, {
                        method: 'get'
                    })
                        .then((response) => {
                            buscarTodosBebedouros();
                        });
                }
            function focus(idBededouro) {
                document.getElementById(id).focus();
            }
            });
        });

        // Seleciona todos os elementos com a classe 'editar-bebedouro'
        let botoesEditar = document.getElementsByClassName('editar-bebedouro');
        // Itera sobre a coleção de elementos e adiciona um evento de clique a cada um
        Array.from(botoesEditar).forEach(function (botao) {

            botao.addEventListener('click', function () {

                let idBebedouro = this.parentNode.parentNode.children[0].innerText;//pega o id do bebedouro
                let nomeBebedouro = this.parentNode.parentNode.children[1].innerText;//pega o nome do bebedouro
                let localizacaoBebedouro = this.parentNode.parentNode.children[2].innerText;//pega a localização do bebedouro

                document.getElementById('idBebedouro').value = idBebedouro;//coloca o id do bebedouro no campo idBebedouro
                document.getElementById('nomeBebedouro').value = nomeBebedouro;//coloca o nome do bebedouro no campo nomeBebedouro
                document.getElementById('localizacaoBebedouro').value = localizacaoBebedouro;//coloca a localização do bebedouro no campo localizacaoBebedouro

                //mostra o form de edição editar-bebedouro
                document.getElementById('editarBebedouro').style.display = 'block';//mostra o form de edição
                document.getElementById('novoBebedouroForm').style.display = 'none';//esconde o form de cadastro novo-bebedouro


            });
        });
            
    });
}
