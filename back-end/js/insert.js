const { getTableColumns } = require('./utils');
const { createConnection, closeConnection } = require('./conection.js');

async function insertData(tb, values) {
  // Criar conexão com o banco de dados.
  const db = createConnection();

  try {
    // Coleta as colunas da tabela.
    const columns = await getTableColumns(tb);
    // Verifica se as colunas foram obtidas com sucesso.
    if (!columns.length) {
      throw new Error(`Não foi possível obter colunas da tabela ${tb}.`);
    }
    // Verifica se o número de valores corresponde ao número de colunas.
    if (values.length !== columns.length) {
      throw new Error(`Número de valores (${values.length}) não corresponde ao número de colunas (${columns.length}) para a tabela ${tb}.`);
    }
    // Prepara a consulta SQL para inserção.
    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tb} (${columns.join(', ')}) VALUES (${placeholders})`;
    // Executa a consulta de inserção.
    db.run(sql, values, function (err) {
      if (err) {
        console.error('Erro ao inserir dados:', err.message);
      } else {
        console.log(`Dados inseridos com sucesso! ID: ${this.lastID}`);
      }
    });
  } catch (error) {
    console.error('Erro: ', error.message);
  }
  // Fecha a conexão com o banco de dados.
  closeConnection(db);
}

//Exemplo de inserção na tabela dim_especialidade.
insertData('dim_especialidade', [1, 'Especialidade Teste', 'Descrição Teste']);
