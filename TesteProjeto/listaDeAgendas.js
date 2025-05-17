const { listaAgenda } = require('./criarAgenda.js'); // Importa o array listaAgenda

function filtrarAgendas(rl, eventos, menuPrincipal, callback) {
    console.log('\n=== FILTRAR AGENDAS ===');
    console.log('1 - Filtrar por data');
    console.log('2 - Filtrar por nome do paciente');
    console.log('3 - Listar todas as agendas');
    console.log('4 - Voltar ao menu de eventos');

    rl.question('\nEscolha uma opção: ', (opcao) => {
        if (opcao.trim() === '1') {
            rl.question('\nDigite a data para filtrar (dd/mm/aaaa): ', (data) => {
                const agendasFiltradas = listaAgenda.filter(agenda => agenda.data === data.trim());
                if (agendasFiltradas.length === 0) {
                    console.log('\nNenhuma agenda encontrada para a data informada.');
                } else {
                    console.log(`\n=== AGENDAS PARA A DATA ${data.trim()} ===`);
                    agendasFiltradas.forEach((agenda, index) => {
                        console.log(`\nAgenda ${index + 1}:`);
                        console.log(`Paciente: ${agenda.paciente}`);
                        console.log(`Hora: ${agenda.hora}`);
                        console.log(`Procedimentos: ${agenda.procedimentos.join(', ')}`);
                        console.log(`Observações: ${agenda.observacoes || 'Nenhuma'}`);
                    });
                }
                if (callback) callback(agendasFiltradas); // Chama o callback se fornecido
                else filtrarAgendas(rl, eventos, menuPrincipal); // Retorna ao menu de filtragem
            });
        } else if (opcao.trim() === '2') {
            rl.question('\nDigite o nome do paciente para filtrar: ', (nome) => {
                const agendasFiltradas = listaAgenda.filter(agenda => agenda.paciente.toLowerCase().includes(nome.trim().toLowerCase()));
                if (agendasFiltradas.length === 0) {
                    console.log('\nNenhuma agenda encontrada para o paciente informado.');
                } else {
                    console.log(`\n=== AGENDAS PARA O PACIENTE ${nome.trim()} ===`);
                    agendasFiltradas.forEach((agenda, index) => {
                        console.log(`\nAgenda ${index + 1}:`);
                        console.log(`Data: ${agenda.data}`);
                        console.log(`Hora: ${agenda.hora}`);
                        console.log(`Procedimentos: ${agenda.procedimentos.join(', ')}`);
                        console.log(`Observações: ${agenda.observacoes || 'Nenhuma'}`);
                    });
                }
                if (callback) callback(agendasFiltradas); // Chama o callback se fornecido
                else filtrarAgendas(rl, eventos, menuPrincipal); // Retorna ao menu de filtragem
            });
        } else if (opcao.trim() === '3') {
            listarAgendas(); // Lista todas as agendas
            if (callback) callback(listaAgenda); // Chama o callback se fornecido
            else filtrarAgendas(rl, eventos, menuPrincipal); // Retorna ao menu de filtragem
        } else if (opcao.trim() === '4') {
            console.log('\nVoltando ao menu de eventos...');
            eventos(rl, menuPrincipal); // Retorna ao menu de eventos
        } else {
            console.log('\nOpção inválida. Tente novamente.');
            filtrarAgendas(rl, eventos, menuPrincipal, callback); // Reinicia o menu de filtragem
        }
    });
}

function listarAgendas() {
    console.log('\n=== TODAS AS AGENDAS ===');
    if (listaAgenda.length === 0) {
        console.log('Nenhuma agenda cadastrada.');
    } else {
        listaAgenda.forEach((agenda, index) => {
            console.log(`\nAgenda ${index + 1}:`);
            console.log(`Paciente: ${agenda.paciente}`);
            console.log(`Data: ${agenda.data}`);
            console.log(`Hora: ${agenda.hora}`);
            console.log(`Procedimentos: ${agenda.procedimentos.join(', ')}`);
            console.log(`Observações: ${agenda.observacoes || 'Nenhuma'}`);
        });
    }

}

function editarAgenda(rl, eventos, menuPrincipal) {
    console.log('\n=== EDITAR AGENDA ===');
    filtrarAgendas(rl, eventos, menuPrincipal, (agendasFiltradas) => {
        if (agendasFiltradas.length === 0) {
            console.log('\nNenhuma agenda disponível para edição.');
            eventos(rl, menuPrincipal); // Retorna ao menu de eventos
        } else {
            rl.question('\nDigite o número da agenda que deseja editar: ', (numero) => {
                const index = parseInt(numero.trim()) - 1;
                if (isNaN(index) || index < 0 || index >= agendasFiltradas.length) {
                    console.log('\nNúmero inválido. Tente novamente.');
                    editarAgenda(rl, eventos, menuPrincipal); // Reinicia a edição
                } else {
                    const agenda = agendasFiltradas[index];
                    console.log('\n=== EDITANDO AGENDA ===');
                    console.log(`Paciente atual: ${agenda.paciente}`);
                    rl.question('Novo nome do paciente (ou pressione Enter para manter): ', (novoNome) => {
                        
                        if (novoNome.trim()) agenda.paciente = novoNome.trim();
                        console.log(`Data atual: ${agenda.data}`);
                        rl.question('Nova data (ou pressione Enter para manter): ', (novaData) => {
                        
                            if (novaData.trim()) agenda.data = novaData.trim();
                            console.log(`Hora atual: ${agenda.hora}`);
                            rl.question('Nova hora (ou pressione Enter para manter): ', (novaHora) => {
                        
                                if (novaHora.trim()) agenda.hora = novaHora.trim();
                                console.log(`Procedimentos atuais: ${agenda.procedimentos.join(', ')}`);
                                rl.question('Novos procedimentos (separados por vírgula, ou pressione Enter para manter): ', (novosProcedimentos) => {
                        
                                    if (novosProcedimentos.trim()) agenda.procedimentos = novosProcedimentos.split(',').map(proc => proc.trim());
                                    console.log(`Observações atuais: ${agenda.observacoes || 'Nenhuma'}`);
                                    rl.question('Novas observações (ou pressione Enter para manter): ', (novasObservacoes) => {
                        
                                        if (novasObservacoes.trim()) agenda.observacoes = novasObservacoes.trim();
                                        console.log('\nAgenda atualizada com sucesso!');
                                        console.log(agenda);
                                        eventos(rl, menuPrincipal); // Retorna ao menu de eventos
                                    });
                                });
                            });
                        });
                    });
                }
            });
        }
    });
}

module.exports = { listarAgendas, filtrarAgendas, editarAgenda };