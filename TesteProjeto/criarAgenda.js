//const { listaUsuarios } = require('./cadastroUsuario.js');
//const { validarCPF } = require('./cadastroUsuario.js');
const { novoCadastro } = require('./cadastroUsuario.js');
//const { eventos } = require('./menuAgenda.js');
let listaAgenda = [];

async function criarAgenda(rl, menuPrincipal, eventos) {
    console.log('\n=== CRIAR AGENDA ===');
    console.log('O paciente já está cadastrado?');
    console.log('1 - Sim');
    console.log('2 - Não');
    console.log('3 - Voltar ao menu de eventos');

    rl.question('\nEscolha uma opção: ', (opcao) => {
        if (opcao.trim() === '1') {
            rl.question('\nDigite o nome do paciente: ', (nome) => {
                //rl.question('Digite o CPF do paciente: ', (cpf) => {
                    // Valida o CPF antes de buscar o paciente
                    //if (!validarCPF(cpf.trim())) {
                     //   console.log('CPF inválido. Por favor, digite novamente.');
                    //    return criarAgenda(rl, callbackMenu); // Reinicia a função
                    //}

                    /* 
                    // validação de usuário no array listaUsuarios
                    const paciente = listaUsuarios.find(
                        usuario => usuario.nomeCompleto === nome.trim() && usuario.cpfUsuario === cpf.trim()
                    );

                    if (paciente) {
                        console.log(`Paciente ${paciente.nomeCompleto} encontrado!`);
                    } else {
                        console.log('Paciente não encontrado. Verifique o nome e o CPF.');
                        callbackMenu(); // Retorna ao menu principal
                        return;
                    }
                    */

                    // Solicita os dados da agenda
                    rl.question('Digite a data da consulta (dd/mm/aaaa): ', (data) => {
                        rl.question('Digite o horário da consulta (hh:mm): ', (hora) => {
                            rl.question('Digite os procedimentos (separados por vírgula): ', (procedimentos) => {
                                rl.question('Observações adicionais (opcional): ', (observacoes) => {
                                    // Cria a agenda com os dados fornecidos pelo usuário
                                    const agenda = {
                                        paciente: nome.trim(), // Usa o nome diretamente
                                        //cpf: cpf.trim(), // Usa o CPF diretamente
                                        data: data.trim(),
                                        hora: hora.trim(),
                                        procedimentos: procedimentos.split(',').map(proc => proc.trim()),
                                        observacoes: observacoes.trim() || "", // Define como string vazia se não for preenchido
                                    };

                                    // Salva a agenda no array listaAgenda
                                    listaAgenda.push(agenda);
                                    console.log('\nAgenda criada com sucesso!');
                                    console.log(agenda);

                                    // Retorna ao menuAgenda
                                    eventos(rl, menuPrincipal);
                                });
                            });
                        });
                    });
                });
            //]);
        } else if (opcao.trim() === '2') {
            console.log('Redirecionando para o cadastro de novo paciente...');
            novoCadastro(rl, () => criarAgenda(rl, menuPrincipal, eventos)); // Chama a função de cadastro
        } else if (opcao.trim() === '3') {
            console.log('Voltando ao menu de eventos...');
            eventos(rl, menuPrincipal); // Retorna ao menu principal
        } else {
            console.log('Opção inválida.');
            criarAgenda(rl,menuPrincipal, callbackMenu); // Reinicia a função
        }
    });
}

module.exports = { criarAgenda, listaAgenda };
