/*const readline = require('readline');
const readlineSync = require('readline-sync');

// Criação da interface de entrada e saída (input/output)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 
//Array
let usuariosCadastrados = [];
let acessos = [];

function login(){
    console.log('\n=== ENTRAR NA CONTA ===');
    console.log('1 - Login');
    console.log('2 - Novo Cadastro');
    console.log('3 - Sair');

    rl.question('\nEscolha uma opção: ', (opcao) => {
        switch(opcao){
            case '1': dadosLogin(); break;
            case '2': cadastrar(); break;
            case '3': sair(); break;
            default:
                console.log('Opções inválida, tente novamente');
            login();
            break;
        }
    });
}
/*
function dadosLogin(){
    rl.question('Usuário: ', (user) => {
        rl.question("Senha: ", (password) =>{
            acessos.push({user, password});
            console.log(`Bem vindo ${user}! `);
            login();   //SERA ALTERADO PARA O MENU PRINCIPAL DO SISTEMA
        });
    });
}
*/
/*
function cadastrar() {
    rl.question('Nome Completo: ', (nome) => {
        if (!nome.trim()) {
            console.log('O nome não pode estar vazio.');
            return cadastrar();
        }

        rl.question('CPF: ', (cpf) => {
            if (!cpf.trim() || cpf.length !== 11 || isNaN(cpf)) {
                console.log('CPF inválido. Deve conter 11 números.');
                return cadastrar();
            }

            rl.question('Telefone: ', (telefone) => {
                if (!telefone.trim() || telefone.length < 11 || isNaN(telefone)) {
                    console.log('Telefone inválido. Deve conter pelo menos 11 números.');
                    return cadastrar();
                }

                rl.question('Especialidade: ', (especialidade) => {
                    if (!especialidade.trim()) {
                        console.log('A especialidade não pode estar vazia.');
                        return cadastrar();
                    }

                    rl.question('Crie sua senha: ', (senha) => {
                        if (!senha.trim() || senha.length < 6) {
                            console.log('A senha deve ter pelo menos 6 caracteres.');
                            return cadastrar();
                        }

                        rl.question('Confirme a senha: ', (confirma_senha) => {
                            if (senha !== confirma_senha) {
                                console.log('As senhas não coincidem. Tente novamente.');
                                return cadastrar();
                            }

                            // Adiciona o usuário ao array de usuários
                            usuariosCadastrados.push({ nome, cpf, telefone, especialidade, senha });
                            console.log('Cadastro realizado com sucesso!');
                            login();
                        });
                    });
                });
            });
        });
    });
}/*
/*
function sair(){
    console.log('Sistema finalizado!');
    rl.close();
}*/
/*
//Inicializa o sistema login
login();
*/