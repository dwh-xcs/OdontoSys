const readline = require('readline');
const { login } = require('./login.js');
const { novoCadastro } = require('./cadastroUsuario.js');
const { eventos } = require('./menuAgenda.js'); // Importa a função evento
const { configuracoes } = require('./configuracoes.js'); // Importa a função configuracoes  
//const { //criarAgenda } = require('./criarAgenda.js'); // Importa a função criarAgenda

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menuPrincipal() {
    console.log('\n=== ENTRAR NA CONTA ===');
    console.log('1 - Login');
    console.log('2 - Novo Cadastro');
    console.log('3 - Sair');

    rl.question('\nEscolha uma opção: ', (opcao) => {
        switch (opcao.trim()) {
            case '1': 
                login(rl, () => {
                    console.log('Login realizado com sucesso!');
                    eventos(rl, menuPrincipal, configuracoes); // Chama a função evento após o login
                });
                break;
            case '2': 
                novoCadastro(rl, menuPrincipal); 
                break;
            case '3': 
                console.log('Saindo do sistema!'); 
                rl.close(); 
                break;
            default:
                console.log('Opção inválida.');
                menuPrincipal();
        }
    });
}

menuPrincipal();
