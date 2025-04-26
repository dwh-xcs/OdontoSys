const { getTableColumns } = require('./utils');
const { createConnection, closeConnection } = require('../script-sql/connection.js');

// Documentação:
// Função para consultar dados de uma tabela específica no banco de dados.
// A função recebe o nome da tabela e um código específico para filtrar os dados.
// Com o nome da tabela, a função constrói o nome da coluna correspondente e executa uma consulta SQL para obter os dados filtrados.
// A consulta é feita utilizando o método `db.all`, que retorna todos os resultados correspondentes à consulta.

function queryData(table, codigo) {
  // Criar conexão com o banco de dados.
  const db = createConnection();

  // Construir o nome da coluna.
  const coluna = `cod_${table.split("_")[1]}`;

  // Consulta ao banco de dados.
  const query = `SELECT * FROM ${table} WHERE ${coluna} = ?`;

  db.all(query, [codigo], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar dados:', err.message);
    } else {
      if (rows.length > 0) {
        console.log(`Resultado para a tabela: ${table}`);
        console.table(rows);
      } else {
        console.log('\x1b[33m%s\x1b[0m', `⚠️  Nenhum resultado encontrado para ${table} com código ${codigo}.`);
      }
    }
    // Fecha a conexão com o banco de dados.
    closeConnection(db);
  });
}

module.exports = { queryData };

console.log("query.js carregado com sucesso!");
// Exemplo de consulta na tabela dim_especialidade.
queryData('dim_especialidade', 2);