document.addEventListener('DOMContentLoaded', function () {//quando a página carregar, executa a função
    buscarBebedourosComAnalises();
});

function buscarBebedourosComAnalises(){
    fetch('/buscar-bebedouros-com-analises', {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        let table = document.getElementById('table-bebedouros-com-analises');
        let content = '';
        /**
         * [
    {
        "idBebedouro": 2,
        "nome": "teste2",
        "localizacao": "local1",
        "idAnalise": 2,
        "dataColeta": "2024-09-30T03:00:00.000Z",
        "dataResultado": "2024-09-30T03:00:00.000Z",
        "resultado": 1
    }
]
         */

        for (let i = 0; i < data.length; i++){
            content += '<tr>';
            content += '<td>' + data[i].idBebedouro + '</td>';
            content += '<td>' + data[i].nome + '</td>';
            content += '<td>' + data[i].localizacao + '</td>';
            content += '<td>' + data[i].idAnalise + '</td>';
            content += '<td>' + data[i].dataColeta + '</td>';
            content += '<td>' + data[i].dataResultado + '</td>';
            content += '<td>' + data[i].resultado + '</td>';
            content += '</tr>';
        }

        table.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Numero do bebedouro</th>
                    <th scope="col">Nome Bebedouro</th>
                    <th scope="col">Localização Bebedouro</th>
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