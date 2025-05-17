// Importação das dependências.
const express = require('express'); // Framework para criar a API.
const cors = require('cors'); // Permite comunicação entre diferentes domínios.
const { getTableColumns } = require('../js/utils'); // Importa a função getTableColumns.
const { get_login } = require('../js/get_login'); // Importa a função get_login.
const { queryData } = require('../js/query'); // Importa a função get_login.
const { insertData } = require('../js/insert'); // Importa a função insertData.
const { updateData } = require('../js/update'); // Importa a função updateData.
const app = express(); // Criação da instância do Express.
const port = 3000; // Porta onde a API será executada.

// Middleware para permitir o envio de dados no formato JSON.
app.use(cors()); // Permite chamadas externas à API.
app.use(express.json()); // Permite o uso de JSON no corpo das requisições.

// Middleware de autenticação personalizado.
app.use(async (req, res, next) => {
    // Verifica se o cabeçalho Authorization está presente e se é do tipo Basic.
    const authHeader = req.headers.authorization;

    // Se não estiver presente ou não for do tipo Basic, retorna erro 401.
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Credenciais não fornecidas' });
    }

    // Decodifica as credenciais do cabeçalho Authorization.
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    try {
        // Verifica as credenciais usando a função get_login.
        const isAuthenticated = await get_login(username, password);
        if (!isAuthenticated) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Se autenticado, prossegue para a próxima rota.
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

//
// Seção sobre procedimentos da tabela dim_procedimento.
//

// Descrição: Rota GET para buscar procedimentos com base em filtros.
// Exemplo de uso: GET /procedimentos?cod_procedimento=1.
app.get('/procedimentos', async (req, res) => {
  try {
    const filtros = req.query; // Extrai os filtros da URL.
    const procedimentos = await queryData('dim_procedimento', filtros, 1); 
    res.status(200).json(procedimentos); //Retorna os dados localizados.
  } catch (error) {
    console.error('Erro ao buscar procedimentos:', error.message); // Log do erro no console.
    res.status(500).json({ message: 'Erro ao buscar procedimentos' }); // Retorna erro 500 se algo der errado.
  }
});

// Descrição: Rota GET para inserir procedimentos na tabela dim_procedimento.
// Exemplo de uso: POST /procedimentos?
// {
//   "nme_procedimento": "Raio-X",
//   "dsc_procedimento": "Radiologia",
//   "dsc_pos_procedimento": "Raio-X de tórax",
//   "dsc_status": 1,
//   "dsc_restricao": "Nenhuma"
// }
app.post('/procedimentos', async (req, res) => {
  try {
    const dados = req.body; // Extrai os dados do corpo da requisição.

    if (!dados || typeof dados !== 'object') { // Verifica se dados foram enviados.
      return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
    }
    const tabela = 'dim_procedimento';
    const colunas = await getTableColumns(tabela); // Coleta colunas esperadas da tabela.

    const valores = colunas.map(col => { // Monta array de valores na ordem correta das colunas.
      if (col === 'cod_procedimento') {
        return null; // Ignora o campo código, pois é autoincremento.
      }
      if (!(col in dados)) { // Verifica se o campo está presente nos dados.
        throw new Error(`Campo obrigatório ausente: ${col}`);
      }
      return dados[col];
    });

    await insertData(tabela, valores); // Insere os dados na tabela.

    res.status(201).json({ message: 'Procedimento inserido com sucesso!' }); // Retorna mensagem de sucesso.
  } catch (error) {// Captura erros durante o processo de inserção.
    console.error('Erro ao inserir procedimento:', error.message); 
    res.status(500).json({ message: 'Erro ao inserir procedimento', erro: error.message });
  }
});

// Descrição: Rota GET para atualizar procedimentos na tabela dim_endereco.
// Exemplo de uso: PUT /procedimento/1
// {
//   "dsc_procedimento": "Radiologia"
// }
app.put('/procedimentos/:id', async (req, res) => {
  const codigo = parseInt(req.params.id, 10); // Obtém o ID a ser atualizado a partir da URL.
  const dadosAtualizados = req.body; // Obtém os dados atualizados do corpo da requisição.
  const tabela = 'dim_procedimento'; // Nome da tabela onde os dados serão atualizados. 

  if (isNaN(codigo)) { // Verifica se o ID é um número válido.
    return res.status(400).json({ message: 'ID inválido.' });
  }

  if (!dadosAtualizados || typeof dadosAtualizados !== 'object') { // Verifica se os dados atualizados são válidos.
    return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
  }

  try {
    // Coleta colunas esperadas da tabela.
    const colunas = await getTableColumns(tabela);
    const camposInvalidos = Object.keys(dadosAtualizados).filter(c => !colunas.includes(c));

    if (camposInvalidos.length > 0) { // Verifica se há campos inválidos.
      return res.status(400).json({
        message: `Campos inválidos: ${camposInvalidos.join(', ')}`
      });
    }
    
    const resultado = await updateData(tabela, codigo, dadosAtualizados); // Chama a função updateData para atualizar os dados no banco de dados. 
    res.status(200).json(resultado); // Retorna a resposta com o resultado da atualização.

  } catch (error) { // Captura erros durante o processo de atualização.
    console.error('Erro ao atualizar procedimento:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar procedimento', erro: error.message });
  }
});

//
// Seção sobre especialidades da tabela dim_especialidade.
//

// Descrição: Rota GET para buscar especialidades com base em filtros.
// Exemplo de uso: GET /especialidades?cod_especialidade=1.
app.get('/especialidades', async (req, res) => {
  try {
    const filtros = req.query; // Extrai os filtros da URL.
    const especialidades = await queryData('dim_especialidade', filtros, 1); 
    res.status(200).json(especialidades); //Retorna os dados localizados.
  } catch (error) {
    console.error('Erro ao buscar especialidades:', error.message); // Log do erro no console.
    res.status(500).json({ message: 'Erro ao buscar especialidades' }); // Retorna erro 500 se algo der errado.
  }
});

// Descrição: Rota GET para inserir especialidades na tabela dim_especialidade.
// Exemplo de uso: POST /especialidades?
// {
//   "dsc_especialidade": "Radiologia",
//   "dsc_descricao": "Radiologia geral",
// }
app.post('/especialidades', async (req, res) => {
  try {
    const dados = req.body; // Extrai os dados do corpo da requisição.

    if (!dados || typeof dados !== 'object') { // Verifica se dados foram enviados.
      return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
    }
    const tabela = 'dim_especialidade';
    const colunas = await getTableColumns(tabela); // Coleta colunas esperadas da tabela.

    const valores = colunas.map(col => { // Monta array de valores na ordem correta das colunas.
      if (col === 'cod_especialidade') {
        return null; // Ignora o campo código, pois é autoincremento.
      }
      if (!(col in dados)) { // Verifica se o campo está presente nos dados.
        throw new Error(`Campo obrigatório ausente: ${col}`);
      }
      return dados[col];
    });

    await insertData(tabela, valores); // Insere os dados na tabela.

    res.status(201).json({ message: 'Especialidade inserido com sucesso!' }); // Retorna mensagem de sucesso.
  } catch (error) {// Captura erros durante o processo de inserção.
    console.error('Erro ao inserir especilidade:', error.message); 
    res.status(500).json({ message: 'Erro ao inserir especilidade', erro: error.message });
  }
});

// Descrição: Rota GET para atualizar especialidades na tabela dim_endereco.
// Exemplo de uso: PUT /especialidade/1
// {
//   "dsc_especialidade": "Radiologia"
// }
app.put('/especialidades/:id', async (req, res) => {
  const codigo = parseInt(req.params.id, 10); // Obtém o ID a ser atualizado a partir da URL.
  const dadosAtualizados = req.body; // Obtém os dados atualizados do corpo da requisição.
  const tabela = 'dim_especialidade'; // Nome da tabela onde os dados serão atualizados. 

  if (isNaN(codigo)) { // Verifica se o ID é um número válido.
    return res.status(400).json({ message: 'ID inválido.' });
  }

  if (!dadosAtualizados || typeof dadosAtualizados !== 'object') { // Verifica se os dados atualizados são válidos.
    return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
  }

  try {
    // Coleta colunas esperadas da tabela.
    const colunas = await getTableColumns(tabela);
    const camposInvalidos = Object.keys(dadosAtualizados).filter(c => !colunas.includes(c));

    if (camposInvalidos.length > 0) { // Verifica se há campos inválidos.
      return res.status(400).json({
        message: `Campos inválidos: ${camposInvalidos.join(', ')}`
      });
    }
    
    const resultado = await updateData(tabela, codigo, dadosAtualizados); // Chama a função updateData para atualizar os dados no banco de dados. 
    res.status(200).json(resultado); // Retorna a resposta com o resultado da atualização.

  } catch (error) { // Captura erros durante o processo de atualização.
    console.error('Erro ao atualizar especialidade:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar especialidade', erro: error.message });
  }
});

//
// Seção sobre endereços na tabela dim_endereco.
//

// Descrição: Rota GET para buscar endereços com base em filtros.
// Exemplo de uso: GET /enderecos?cod_endereco=1.
app.get('/enderecos', async (req, res) => {
    try {
      const filtros = req.query; // Extrai os filtros da URL.
      const enderecos = await queryData('dim_endereco', filtros, 1); 
      res.status(200).json(enderecos); //Retorna os dados localizados.
    } catch (error) {
      console.error('Erro ao buscar endereços:', error.message); // Log do erro no console.
      res.status(500).json({ message: 'Erro ao buscar endereços' }); // Retorna erro 500 se algo der errado.
    }
});

// Descrição: Rota GET para buscar endereços com base em filtros.
// Descrição: Rota GET para inserir endereços na tabela dim_endereco.
// Exemplo de uso: POST /enderecos?
// {
//   "dsc_rua": "Avenida Paulista",
//   "cod_cep": "00000-000",
//   "dsc_numero": 13302,
//   "dsc_complemento": null
// }
app.post('/enderecos', async (req, res) => {
    try {
      const dados = req.body; // Extrai os dados do corpo da requisição.
      if (!dados || typeof dados !== 'object') { // Verifica se dados foram enviados.
        return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
      }
      
      const tabela = 'dim_endereco';
      const colunas = await getTableColumns(tabela); // Coleta colunas esperadas da tabela.
  
      const valores = colunas.map(col => { // Monta array de valores na ordem correta das colunas.
        if (col === 'cod_endereco') {
          return null; // Ignora o campo código, pois é autoincremento.
        }
        if (!(col in dados)) { // Verifica se o campo está presente nos dados.
          throw new Error(`Campo obrigatório ausente: ${col}`);
        }
        return dados[col];
      });
  
      await insertData(tabela, valores); // Insere os dados.
  
      res.status(201).json({ message: 'Endereço inserido com sucesso!' }); // Retorna mensagem de sucesso.
    } catch (error) { // Captura erros durante o processo de inserção.
      console.error('Erro ao inserir endereço:', error.message);
      res.status(500).json({ message: 'Erro ao inserir endereço', erro: error.message });
    }
});

// Descrição: Rota GET para atualizar endereços na tabela dim_endereco.
// Exemplo de uso: PUT /enderecos/1
// {
//   "dsc_complemento": "Apartamento 1306 Bloco A"
// }
app.put('/enderecos/:id', async (req, res) => {
  const codigo = parseInt(req.params.id, 10); // Obtém o ID a ser atualizado a partir da URL.
  const dadosAtualizados = req.body; // Obtém os dados atualizados do corpo da requisição.
  const tabela = 'dim_endereco'; // Nome da tabela onde os dados serão atualizados. 

  if (isNaN(codigo)) { // Verifica se o ID é um número válido.
    return res.status(400).json({ message: 'ID inválido.' });
  }

  if (!dadosAtualizados || typeof dadosAtualizados !== 'object') { // Verifica se os dados atualizados são válidos.
    return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
  }

  try {
    // Coleta colunas esperadas da tabela.
    const colunas = await getTableColumns(tabela);
    const camposInvalidos = Object.keys(dadosAtualizados).filter(c => !colunas.includes(c));

    if (camposInvalidos.length > 0) { // Verifica se há campos inválidos.
      return res.status(400).json({
        message: `Campos inválidos: ${camposInvalidos.join(', ')}`
      });
    }
    
    const resultado = await updateData(tabela, codigo, dadosAtualizados); // Chama a função updateData para atualizar os dados no banco de dados. 
    res.status(200).json(resultado); // Retorna a resposta com o resultado da atualização.

  } catch (error) { // Captura erros durante o processo de atualização.
    console.error('Erro ao atualizar endereço:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar endereço', erro: error.message });
  }
});

//
// Seção sobre pessoas na tabela dim_pessoa.
//

// Descrição: Rota GET para buscar pessoas com base em filtros.
// Exemplo de uso: GET /pessoas?cod_pessoa=1.
app.get('/pessoas', async (req, res) => {
  try {
    const filtros = req.query; // Extrai os filtros da URL.
    const pessoas = await queryData('dim_pessoa', filtros, 1); 
    res.status(200).json(pessoas); //Retorna os dados localizados.
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error.message); // Log do erro no console.
    res.status(500).json({ message: 'Erro ao buscar pessoas' }); // Retorna erro 500 se algo der errado.
  }
});

// Descrição: Rota GET para buscar pessoa com base em filtros.
// Descrição: Rota GET para inserir pessoa na tabela dim_pessoa.
// Exemplo de uso: POST /pessoas?
// {
//   "cod_especialidade": 1,
//   "cod_endereco": 1,
//   "nme_pessoa": "João da Silva",
//   "cod_cpf": "123.456.789-00",
//   "dsc_restricao": "Nenhuma",
//   "dsc_status": 1,
//   "dsc_data_nascimento": "1990-01-01",
//   "num_celular": "(11) 91234-5678",
//   "dsc_email": "joao@gmail.com",
//   "dsc_senha": "senha123"
// }
app.post('/pessoas', async (req, res) => {
  try {
    const dados = req.body; // Extrai os dados do corpo da requisição.
    if (!dados || typeof dados !== 'object') { // Verifica se dados foram enviados.
      return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
    }
    
    const tabela = 'dim_pessoa';
    const colunas = await getTableColumns(tabela); // Coleta colunas esperadas da tabela.

    const valores = colunas.map(col => { // Monta array de valores na ordem correta das colunas.
      if (col === 'cod_pessoa') {
        return null; // Ignora o campo código, pois é autoincremento.
      }
      if (!(col in dados)) { // Verifica se o campo está presente nos dados.
        throw new Error(`Campo obrigatório ausente: ${col}`);
      }
      return dados[col];
    });

    await insertData(tabela, valores); // Insere os dados.

    res.status(201).json({ message: 'Pessoa inserido com sucesso!' }); // Retorna mensagem de sucesso.
  } catch (error) { // Captura erros durante o processo de inserção.
    console.error('Erro ao inserir pessoa:', error.message);
    res.status(500).json({ message: 'Erro ao inserir pessoa', erro: error.message });
  }
});

// Descrição: Rota GET para atualizar pessoas na tabela dim_pessoa.
// Exemplo de uso: PUT /pessoas/1
// {
//   "dsc_complemento": "Apartamento 1306 Bloco A"
// }
app.put('/pessoas/:id', async (req, res) => {
const codigo = parseInt(req.params.id, 10); // Obtém o ID a ser atualizado a partir da URL.
const dadosAtualizados = req.body; // Obtém os dados atualizados do corpo da requisição.
const tabela = 'dim_pessoa'; // Nome da tabela onde os dados serão atualizados. 

if (isNaN(codigo)) { // Verifica se o ID é um número válido.
  return res.status(400).json({ message: 'ID inválido.' });
}

if (!dadosAtualizados || typeof dadosAtualizados !== 'object') { // Verifica se os dados atualizados são válidos.
  return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
}

try {
  // Coleta colunas esperadas da tabela.
  const colunas = await getTableColumns(tabela);
  const camposInvalidos = Object.keys(dadosAtualizados).filter(c => !colunas.includes(c));

  if (camposInvalidos.length > 0) { // Verifica se há campos inválidos.
    return res.status(400).json({
      message: `Campos inválidos: ${camposInvalidos.join(', ')}`
    });
  }
  
  const resultado = await updateData(tabela, codigo, dadosAtualizados); // Chama a função updateData para atualizar os dados no banco de dados. 
  res.status(200).json(resultado); // Retorna a resposta com o resultado da atualização.

} catch (error) { // Captura erros durante o processo de atualização.
  console.error('Erro ao atualizar pessoa:', error.message);
  res.status(500).json({ message: 'Erro ao atualizar pessoa', erro: error.message });
}
});

//
// Seção sobre agendas na tabela ft_agenda.
//

// Descrição: Rota GET para buscar agendas com base em filtros.
// Exemplo de uso: GET /agendas?cod_agenda=1.
app.get('/agendas', async (req, res) => {
  try {
    const filtros = req.query; // Extrai os filtros da URL.
    const agendas = await queryData('ft_agenda', filtros, 1); 
    res.status(200).json(agendas); //Retorna os dados localizados.
  } catch (error) {
    console.error('Erro ao buscar endereços:', error.message); // Log do erro no console.
    res.status(500).json({ message: 'Erro ao buscar endereços' }); // Retorna erro 500 se algo der errado.
  }
});


// Descrição: Rota GET para buscar agenda com base em filtros.
// Descrição: Rota GET para inserir agenda na tabela ft_agenda.
// Exemplo de uso: POST /agendas?
// {
//  "cod_profissional": 1,
//  "cod_pessoa": 1,
//  "cod_procedimento": 1,
//  "dsc_observacao": "Nenhuma",
//  "dsc_status": 1,
//  "dsc_data": "2023-10-01",
//  "dsc_hora": "10:00"
// }
app.post('/agendas', async (req, res) => {
  try {
    const dados = req.body; // Extrai os dados do corpo da requisição.
    if (!dados || typeof dados !== 'object') { // Verifica se dados foram enviados.
      return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
    }
    
    const tabela = 'ft_agenda';
    const colunas = await getTableColumns(tabela); // Coleta colunas esperadas da tabela.

    const valores = colunas.map(col => { // Monta array de valores na ordem correta das colunas.
      if (col === 'cod_agenda') {
        return null; // Ignora o campo código, pois é autoincremento.
      }
      if (!(col in dados)) { // Verifica se o campo está presente nos dados.
        throw new Error(`Campo obrigatório ausente: ${col}`);
      }
      return dados[col];
    });

    await insertData(tabela, valores); // Insere os dados.

    res.status(201).json({ message: 'Agenda inserido com sucesso!' }); // Retorna mensagem de sucesso.
  } catch (error) { // Captura erros durante o processo de inserção.
    console.error('Erro ao inserir agenda:', error.message);
    res.status(500).json({ message: 'Erro ao inserir agenda', erro: error.message });
  }
});

// Descrição: Rota GET para atualizar agendas na tabela ft_agenda.
// Exemplo de uso: PUT /agendas/1
// {
//   "dsc_complemento": "Apartamento 1306 Bloco A"
// }
app.put('/agendas/:id', async (req, res) => {
const codigo = parseInt(req.params.id, 10); // Obtém o ID a ser atualizado a partir da URL.
const dadosAtualizados = req.body; // Obtém os dados atualizados do corpo da requisição.
const tabela = 'ft_agenda'; // Nome da tabela onde os dados serão atualizados. 

if (isNaN(codigo)) { // Verifica se o ID é um número válido.
  return res.status(400).json({ message: 'ID inválido.' });
}

if (!dadosAtualizados || typeof dadosAtualizados !== 'object') { // Verifica se os dados atualizados são válidos.
  return res.status(400).json({ message: 'Dados inválidos no corpo da requisição.' });
}

try {
  // Coleta colunas esperadas da tabela.
  const colunas = await getTableColumns(tabela);
  const camposInvalidos = Object.keys(dadosAtualizados).filter(c => !colunas.includes(c));

  if (camposInvalidos.length > 0) { // Verifica se há campos inválidos.
    return res.status(400).json({
      message: `Campos inválidos: ${camposInvalidos.join(', ')}`
    });
  }
  
  const resultado = await updateData(tabela, codigo, dadosAtualizados); // Chama a função updateData para atualizar os dados no banco de dados. 
  res.status(200).json(resultado); // Retorna a resposta com o resultado da atualização.

} catch (error) { // Captura erros durante o processo de atualização.
  console.error('Erro ao atualizar pessoa:', error.message);
  res.status(500).json({ message: 'Erro ao atualizar pessoa', erro: error.message });
}
});

// Inicia o servidor na porta especificada.
app.listen(port, '0.0.0.0', () => {
    console.log(`API rodando em http://localhost:${port}`); // Mensagem de confirmação no console.
});