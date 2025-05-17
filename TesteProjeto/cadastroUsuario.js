const readline = require('readline');

let listaUsuarios = [];

// Função para armazenar os dados do usuário (async permite utilizar "AWAIT" na função)
async function novoCadastro(rl, callbackMenu) {
    const novoUsuario = {};

    novoUsuario.nomeCompleto = await fazerPergunta(rl, 'Digite seu nome completo: ', (nome) => {
        if (!nome.trim()) return 'O nome não pode estar vazio.';
    });

    novoUsuario.cpfUsuario = await fazerPergunta(rl, 'Digite seu CPF: ', (cpf) => {
        cpf = cpf.trim();
        if (!cpf || !validarCPF(cpf)) {
            return 'CPF inválido, digite novamente.';
        }
    });

    novoUsuario.dataNascimento = await fazerPergunta(rl, 'Digite sua data de nascimento (dd/mm/aaaa): ', (data) => {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!regex.test(data)) {
            return 'Formato inválido. Use dd/mm/aaaa.';
        }

        const [dia, mes, ano] = data.split('/').map(Number);
        const dataObj = new Date(ano, mes - 1, dia);

        if (dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes - 1 || dataObj.getDate() !== dia) {
            return 'Data inexistente. Digite uma data real.';
        }

        // Recusa datas futuras
        const hoje = new Date();
        if (dataObj > hoje) {
            return 'Data não pode ser no futuro.';
        }
    });

    novoUsuario.ddd = await fazerPergunta(rl, 'Digite seu DDD: ', (ddd) => {
        if (!ddd.trim() || ddd.length !== 2 || isNaN(ddd)) return 'DDD inválido, digite novamente.';
    });

    novoUsuario.telefone = await fazerPergunta(rl, 'Digite seu telefone: ', (telefone) => {
        if (!telefone.trim() || telefone.length !== 9 || isNaN(telefone)) return 'Telefone inválido, digite novamente.';
    });

    novoUsuario.especialidade = await fazerPergunta(rl, 'Digite sua especialidade: ', (especialidade) => {
        if (!especialidade.trim()) return 'A especialidade não pode estar vazia.';
    });

    novoUsuario.restricao = await fazerPergunta(rl, 'Possui alguma restrição? (Deixe em branco caso não tenha)', () => {
        return;
    });

    novoUsuario.email = await fazerPergunta(rl, 'Digite seu email: ', (email) => {
        if (!email.trim() || !email.includes('@') || !email.includes('.')) return 'E-mail inválido, digite novamente.';
    });

    let senhaValida = false;
    while (!senhaValida) {
        const senha = await fazerPergunta(rl, 'Digite uma senha: ', (senhaDigitada) => {
            if (senhaDigitada.length < 6) {
                return 'A senha deve ter pelo menos 6 caracteres.';
            }
            return null;
        }, true);

        const senhaConfimacao = await fazerPergunta(rl, 'Confirme sua senha: ', (confirmacao) => {
            if (confirmacao !== senha) {
                return 'As senhas não conferem, tente novamente.';
            }
            return null;
        }, true);

        if (senha && senhaConfimacao && senha === senhaConfimacao) {
            novoUsuario.senha = senha;
            senhaValida = true;
        }
    }

    listaUsuarios.push(novoUsuario);
    console.log('Usuário cadastrado com sucesso!\n');
    callbackMenu(); // Retorna ao menu principal
}

// Função de validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // remove tudo que não for dígito

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // evita CPFs com todos os dígitos iguais

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let dig1 = 11 - (soma % 11);
    if (dig1 >= 10) dig1 = 0;
    if (dig1 !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let dig2 = 11 - (soma % 11);
    if (dig2 >= 10) dig2 = 0;
    if (dig2 !== parseInt(cpf.charAt(10))) return false;

    return true;
}

// Função para fazer perguntas de forma assíncrona
function fazerPergunta(rl, texto, validar, esperarResposta = false) {
    return new Promise((resolve) => {
        const perguntar = () => {
            rl.question(texto, (resposta) => {
                const erro = validar ? validar(resposta) : null;
                if (erro) {
                    console.log(erro);
                    perguntar();
                } else {
                    resolve(resposta);
                }
            });
        };
        perguntar();
    });
}

module.exports = { novoCadastro, listaUsuarios, validarCPF, fazerPergunta };
