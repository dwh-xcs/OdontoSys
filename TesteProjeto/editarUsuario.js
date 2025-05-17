const { listaUsuarios } = require('./cadastroUsuario.js'); // Importa o array listaUsuarios
const { fazerPergunta } = require('./cadastroUsuario.js'); // Importa a função para perguntas

async function editarUsuario(rl, menuPrincipal, eventos) {
    console.log('\n=== EDITAR USUÁRIO ===');

    if (listaUsuarios.length === 0) {
        console.log('Nenhum usuário cadastrado.');
        eventos(rl, menuPrincipal); // Retorna ao menu de eventos
        return;
    }

    // Lista os usuários cadastrados
    console.log('\nUsuários cadastrados:');
    listaUsuarios.forEach((usuario, index) => {
        console.log(`${index + 1} - ${usuario.nomeCompleto} (CPF: ${usuario.cpfUsuario})`);
    });

    // Pergunta qual usuário será editado
    rl.question('\nDigite o número do usuário que deseja editar: ', async (numero) => {
        const index = parseInt(numero.trim()) - 1;

        if (isNaN(index) || index < 0 || index >= listaUsuarios.length) {
            console.log('Número inválido. Tente novamente.');
            editarUsuario(rl, menuPrincipal, eventos); // Reinicia a edição
            return;
        }

        const usuario = listaUsuarios[index];
        console.log(`\n=== EDITANDO USUÁRIO: ${usuario.nomeCompleto} ===`);

        // Edita os campos do usuário
        usuario.ddd = await fazerPergunta(rl, `DDD atual: ${usuario.ddd}. Novo DDD (ou pressione Enter para manter): `, (ddd) => {
            if (ddd.trim() && (ddd.length !== 2 || isNaN(ddd))) return 'DDD inválido, digite novamente.';
        }) || usuario.ddd;

        usuario.telefone = await fazerPergunta(rl, `Telefone atual: ${usuario.telefone}. Novo telefone (ou pressione Enter para manter): `, (telefone) => {
            if (telefone.trim() && (telefone.length !== 9 || isNaN(telefone))) return 'Telefone inválido, digite novamente.';
        }) || usuario.telefone;

        usuario.especialidade = await fazerPergunta(rl, `Especialidade atual: ${usuario.especialidade}. Nova especialidade (ou pressione Enter para manter): `, (especialidade) => {
            if (especialidade.trim() === '') return 'A especialidade não pode estar vazia.';
        }) || usuario.especialidade;

        usuario.restricao = await fazerPergunta(rl, `Restrição atual: ${usuario.restricao || 'Nenhuma'}. Nova restrição (ou pressione Enter para manter): `) || usuario.restricao;

        usuario.email = await fazerPergunta(rl, `E-mail atual: ${usuario.email}. Novo e-mail (ou pressione Enter para manter): `, (email) => {
            if (email.trim() && (!email.includes('@') || !email.includes('.'))) return 'E-mail inválido, digite novamente.';
        }) || usuario.email;

        // Edita a senha com confirmação
        let senhaValida = false;
        while (!senhaValida) {
            const novaSenha = await fazerPergunta(rl, 'Digite a nova senha (ou pressione Enter para manter): ', (senha) => {
                if (senha.trim() && senha.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
            }, true);

            if (!novaSenha.trim()) break; // Mantém a senha atual se o usuário pressionar Enter

            const confirmacaoSenha = await fazerPergunta(rl, 'Confirme a nova senha: ', (confirmacao) => {
                if (confirmacao !== novaSenha) return 'As senhas não conferem, tente novamente.';
            }, true);

            if (novaSenha === confirmacaoSenha) {
                usuario.senha = novaSenha;
                senhaValida = true;
            }
        }

        console.log('\nUsuário atualizado com sucesso!');
        console.log(usuario);

        eventos(rl, menuPrincipal); // Retorna ao menu de eventos
    });
}

module.exports = { editarUsuario };