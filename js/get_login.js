const { createConnection, closeConnection } = require('../script-sql/connection.js');

// Documentação:

function get_login(username, password) {
  return new Promise((resolve, reject) => {
    // Criar conexão com o banco de dados.
    const db = createConnection();

    // Consulta ao banco de dados.
    const query = `SELECT * FROM dim_pessoa WHERE dsc_email = ? AND dsc_senha = ?`;

    db.all(query, [username, password], (err, rows) => {
      if (err) {
        reject(false); // Retorna false em caso de erro.
      } else {
        resolve(rows.length > 0); // Retorna true se encontrar registros, caso contrário false.
      }

      // Fecha a conexão com o banco de dados.
      closeConnection(db);
    });
  });
}

module.exports = { get_login };