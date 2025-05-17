const { createConnection, closeConnection } = require('../script-sql/connection.js');

// Documentação:
// Função para consultar dados de uma tabela específica no banco de dados.
// A função recebe o nome da tabela e um código específico para filtrar os dados.
// Com o nome da tabela, a função constrói o nome da coluna correspondente e executa uma consulta SQL para obter os dados filtrados.
// A consulta é feita utilizando o método `db.all`, que retorna todos os resultados correspondentes à consulta.


function queryData(table, filters = {}, outputFormat = 1) {
  return new Promise((resolve, reject) => {
    if (outputFormat !== 1 && outputFormat !== 2) {
      return reject(new Error("O parâmetro 'outputFormat' deve ser 1 (JSON) ou 2 (Tabela)."));
    }

    const db = createConnection();
    let query = `SELECT * FROM ${table} WHERE 1=1`;
    const params = [];

    for (const [key, value] of Object.entries(filters)) {
      if (value !== null && value !== undefined) {
        query += ` AND ${key} = ?`;
        params.push(value);
      }
    }

    db.all(query, params, (err, rows) => {
      closeConnection(db); // fecha a conexão

      if (err) {
        console.error("Erro ao consultar dados:", err.message);
        return reject(err);
      }

      if (outputFormat === 2) {
        console.table(rows);
        return resolve("Tabela exibida no console.");
      }

      return resolve(rows);
    });
  });
}

module.exports = { queryData };

// Exemplo de uso da função queryData com filtros dinâmicos.
queryData(
  'dim_pessoa', // Nome da tabela.
  { cod_pessoa: 1 }, // Filtros dinâmicos.
  1, // Formato de saída: 1 para JSON, 2 para tabela.
  (err, result) => {
    if (err) {
      console.error("Erro:", err);
    } else {
      console.log("Resultado:", result);
    }
  }
);