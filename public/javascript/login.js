document.getElementById('loginForm').addEventListener('submit', async function (event) {//quando o formulário de login for submetido, executa a função
    event.preventDefault();//previne o comportamento padrão do formulário

    const email = document.getElementById('email').value;//pega o valor do campo email
    const senha = document.getElementById('senha').value;//pega o valor do campo senha

    const response = await fetch('/login', {//faz a requisição para o servidor
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })//envia os dados do formulário
    });

    const result = await response.json();//converte a resposta para json

    if (result.success) {//se o login for bem-sucedido
        sessionStorage.setItem('usuarioLogado', result.success);//salva o usuário logado na sessão
        alert('Login bem-sucedido!');//exibe um alerta
        window.location.href = '/painel';// Redirecionar para outra página
    } else {
        //se o login falhar, exibe um alerta e remove o usuário logado da sessão
        sessionStorage.removeItem('usuarioLogado');
        alert('Falha no login. Verifique suas credenciais.');
    }
});