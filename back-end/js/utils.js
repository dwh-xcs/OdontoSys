// Arquivo: contém funções utilitárias para o sistema.

// Conection Database.
const { createConnection, closeConnection } = require('../script-sql/connection.js');

// Função para obter os nomes das colunas de uma tabela específica.
async function getTableColumns(tb) {
  const db = createConnection();
  return new Promise((resolve, reject) => {
    // Realiza a busca no banco de dados com base no nome da tabela.
    db.all(`PRAGMA table_info(${tb})`, (err, rows) => {
      // Verifica se houve erro na consulta.
      if (err) return reject(err);
      // Verifica se teve retorno na consulta.
      if (!rows.length) return reject(new Error(`Tabela "${tb}" não encontrada.`));
      // Extrai os nomes das colunas.
      resolve(rows.map(row => row.name));
    });
  });
  closeConnection();
}

module.exports = { getTableColumns };
