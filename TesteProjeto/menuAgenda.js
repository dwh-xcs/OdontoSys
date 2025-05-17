const { configuracoes } = require("./configuracoes");
const { criarAgenda } = require("./criarAgenda");
const { filtrarAgendas , editarAgenda} = require("./listaDeAgendas"); // Importa a função listarAgendas

function eventos(rl, menuPrincipal) {
    console.log('\n=== MENU ===');
    console.log('1 - Criar agenda');
    console.log('2 - Lista de agendas');
    console.log('3 - Editar agenda');
    console.log('4 - Configurações');
    console.log('5 - Sair');

    rl.question('\nEscolha uma opção: ', (opcao) => {
        switch (opcao.trim()) {
            case '1': 
                console.log('Criando agenda...');
                criarAgenda(rl, menuPrincipal, eventos); // Retorna ao menu principal após criar a agenda
                break;
            case '2': 
                console.log('Listando agendas...');
                filtrarAgendas(rl, eventos, menuPrincipal); // Retorna ao menu de eventos
                break;
            case '3': 
                console.log('Editando agenda...');
                editarAgenda(rl,eventos, menuPrincipal); // Retorna ao menu de eventos
                break;
            case '4': 
                console.log('Abrindo configurações...');
                configuracoes(rl, menuPrincipal, eventos); // Chama a função configurações
                break;
            case '5': 
                console.log('Saindo do sistema!');
                rl.close(); 
                break;
            default:
                console.log('Opção inválida.');
                eventos(rl, menuPrincipal); // Retorna ao menu de eventos
        }
    });
}

module.exports = { eventos };


