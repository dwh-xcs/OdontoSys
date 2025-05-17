const { get_login } = require('../js/get_login');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function login(rl, callbackMenu) {
    rl.question('Digite seu e-mail: ', (email) => {
      if (!email.trim() || !email.includes('@') || !email.includes('.com')) {
        console.log('E-mail inválido. Deve conter @ e .com.');
        return login(rl, callbackMenu);
      }
  
      rl.question('Digite sua senha: ', async (senha) => {
        if (!senha.trim() || senha.length < 6) {
          console.log('Senha inválida. Deve conter pelo menos 6 dígitos.');
          return login(rl, callbackMenu);
        }
  
        try {
          const isValid = await get_login(email, senha);
  
          if (isValid) {
            console.log('\n✅ Login realizado com sucesso!');
            usuariosLogados.push({ email });
  
            await create_user(email); // Chama a função create_user com o email
            callbackMenu(); // Redireciona para o menu
          } else {
            console.log('\n❌ Credenciais inválidas. Tente novamente.');
            return login(rl, callbackMenu);
          }
        } catch (err) {
          console.error('Erro ao verificar login:', err);
          return login(rl, callbackMenu);
        }
      });
    });
}

module.exports = { login };

// async function login(rl, callbackMenu) {
//     rl.question('Digite seu e-mail: ', (email) => {
//         if (!email.trim() || !email.includes('@') || !email.includes('.com')) {
//             console.log('E-mail inválido. Deve conter @ e .com.');
//             return dadosLogin(rl, callbackMenu);
//         }

//         rl.question('Digite sua senha: ', (senha) => {
//             if (!senha.trim() || senha.length < 6) {
//                 console.log('Senha inválida. Deve conter pelo menos 6 dígitos.');
//                 return dadosLogin(rl, callbackMenu);
//             }

//             console.log('\n Bem-vindo(a) ao OdontoSys!');
//             usuariosLogados.push({email});
//             callbackMenu();
//            // eventos(rl, callbackMenu); // Chama a função eventos após o login
//         });
//     });
// }