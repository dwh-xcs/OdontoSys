const { createConnection, closeConnection } = require('../script-sql/connection.js');
const { queryData } = require('./query.js');

// Documentação:
// Função para atualizar dados em uma tabela específica no banco de dados.
// A função recebe o nome da tabela, um código específico para identificar o registro a ser atualizado, o nome da coluna a ser atualizada e os novos valores.
// Com o nome da tabela, a função constrói o nome da coluna correspondente e executa uma consulta SQL para atualizar os dados filtrados.

async function updateData(table, codigo, updates) {
  const db = createConnection();

  // Detectar nome da coluna-chave primária (ex: cod_endereco)
  const pk = `cod_${table.split("_")[1]}`;

  try {
    const campos = Object.keys(updates);
    const valores = Object.values(updates);

    if (!campos.length) throw new Error("Nenhum campo para atualizar.");

    // Monta SET dinamicamente: "col1 = ?, col2 = ?, ..."
    const setClause = campos.map(col => `${col} = ?`).join(', ');

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${pk} = ?`;

    // Executar query
    return await new Promise((resolve, reject) => {
      db.run(sql, [...valores, codigo], function (err) {
        closeConnection(db);

        if (err) {
          return reject(err);
        }

        resolve({
          message: "Atualização realizada com sucesso.",
          linhas_afetadas: this.changes
        });
      });
    });

  } catch (error) {
    closeConnection(db);
    throw error;
  }
}

module.exports = { updateData };

// Exemplo de atualização na tabela dim_especialidade.
//updateData('dim_especialidade', 2, 'dsc_especialidade', 'especialidade 1');