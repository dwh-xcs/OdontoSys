const { getTableColumns } = require('./utils.js');
const { createConnection, closeConnection } = require('../script-sql/connection.js');

// Documentação:
// Função para inserir dados em uma tabela específica no banco de dados.
// A função recebe o nome da tabela e um array de valores a serem inseridos.
// Com o nome da tabela, a função obtém as colunas correspondentes e verifica se o número de valores corresponde ao número de colunas.
// Se tudo estiver correto, a função prepara e executa a consulta de inserção no banco de dados.

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
        console.error(`(${tb})Erro ao inserir dados:`, err.message);
      } else {
        console.log(`(${tb}) Dados inseridos com sucesso! ID: ${this.lastID}`);
      }
      
    });
  } catch (error) {

    console.error('Erro: ', error.message);
  } finally {
    // Fecha a conexão com o banco de dados.
    closeConnection(db);
  }
}

module.exports = { insertData };

// Exemplo de inserção na tabela dim_especialidade.
//insertData('dim_especialidade', [2, 'Especialidade Teste', 'Descrição Teste']);
