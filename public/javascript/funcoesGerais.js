function formataData(data) {
    if(data == null){
        return 'Sem data';
    }
    let dataFormatada = data.split('T')[0];
    dataFormatada = dataFormatada.split('-');
    dataFormatada = dataFormatada[2] + '/' + dataFormatada[1] + '/' + dataFormatada[0];
    return dataFormatada;
}

function reverteData(data) {
    if(data == null){
        return 'Sem data';
    }
    let dataFormatada = data.split('/');
    dataFormatada = dataFormatada[2] + '-' + dataFormatada[1] + '-' + dataFormatada[0];
    return dataFormatada;
}

function textoAguaPotavel(resultado) {
    if (resultado == 1) {
        return 'Potável'
    }
    if (resultado == 0) {
        return 'Não potável'
    }
    return 'Sem resultado'
}

function validaLogin(){
    let login = sessionStorage.getItem('usuarioLogado');
    if(login == false || login == null || login == undefined){
        window.location.href = '/login';
    }
}