document.addEventListener('DOMContentLoaded', function () {//quando a página carregar, executa a função
    //esconde todos os botões de painel
    btnPainel = document.getElementsByClassName('btnPainel');
    Array.from(btnPainel).forEach(function(botao){
        botao.style.display = 'none';
    });
    let usuarioLogado = sessionStorage.getItem('usuarioLogado');
    //se o usuário estiver logado, exibe os botões de painel de controle do bebendouro e análise
    if(usuarioLogado){
        btnLogado = document.getElementsByClassName('usuarioLogado');
        Array.from(btnLogado).forEach(function(botao){
            botao.style.display = '';
        });
    }else{
        //se o usuário não estiver logado, exibe os botões de login
        btnNaoLogado = document.getElementsByClassName('usuarioNaoLogado');
        Array.from(btnNaoLogado).forEach(function(botao){
            botao.style.display = '';
        });
    }
    //busca os bebedouros com análises
    buscarBebedourosComAnalises();
});

function buscarBebedourosComAnalises(){
    fetch('/buscar-bebedouros-com-analises', { method: 'GET' })//faz a requisição para o servidor
    .then((response) => { return response.json(); })//converte a resposta para json
    .then((data) => {
        //pega o elemento da tabela
        let table = document.getElementById('table-bebedouros-com-analises');
        //cria o conteúdo da tabela
        let content = '';

        for (let i = 0; i < data.length; i++){
            //formata as datas
            var dataColetaBr = formataData(data[i].dataColeta)
            var dataResultado = formataData(data[i].dataResultado)

            //verifica se a água é potável
            var potavel = textoAguaPotavel(data[i].resultado)

            //cria a linha da tabela
            content += '<tr>';
            content += '<td>' + data[i].idBebedouro + '</td>';
            content += '<td>' + data[i].nome + '</td>';
            content += '<td>' + data[i].localizacao + '</td>';
            content += '<td>' + data[i].idAnalise + '</td>';
            content += '<td>' + dataColetaBr + '</td>';
            content += '<td>' + dataResultado + '</td>';
            content += '<td>' + potavel + '</td>';
            content += '</tr>';
        }

        //cria a tabela com o conteúdo e insere no html
        table.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Número</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Localização</th>
                    <th scope="col">Análise</th>
                    <th scope="col">Data Coleta</th>
                    <th scope="col">Data Resultado</th>
                    <th scope="col">Resultado</th>
                </tr>
            </thead>
            <tbody>
                ${content}
            </tbody>`
        
    });
}