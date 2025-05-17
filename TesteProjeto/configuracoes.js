const { editarUsuario } = require("./editarUsuario");

function configuracoes(rl, menuPrincipal, eventos) {
    console.log('\n=== ESCOLHA UMA OPÇÃO ===');
    console.log('1 - Editar um usuário');
    console.log('2 - Voltar ao menu de eventos');

    rl.question('\nEscolha uma opção: ', (opcao) => {
        switch (opcao.trim()) {
            case '1': 
                console.log('Editando um usuário...');
                editarUsuario(rl, menuPrincipal, eventos); // Retorna ao menu de configurações
                break;
            case '2': 
                console.log('Voltando ao menu de eventos...');
                eventos(rl, menuPrincipal); // Retorna ao menu de eventos
                break;
            default:
                console.log('Opção inválida.');
                configuracoes(rl, menuPrincipal, eventos); // Retorna ao menu de configurações
        }
    });
}

module.exports = { configuracoes };