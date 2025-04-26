const { getTableColumns } = require('./utils');
const { createConnection, closeConnection } = require('./conection.js');

function queryData(table, codigo) {
  // Criar conexão com o banco de dados.
  const db = createConnection();

  // Construir o nome da coluna
  const coluna = `cod_${table.split("_")[1]}`;

  // Consulta ao banco de dados
  const query = `SELECT * FROM ${table} WHERE ${coluna} = ?`;

  db.all(query, [codigo], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar dados:', err.message);
    } else {
      console.log(`${table} encontrados:`, rows);
    }

  // Fecha a conexão com o banco de dados.
  closeConnection(db);
  });
}

module.exports = queryData;