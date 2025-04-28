const { createConnection, closeConnection } = require('../script-sql/connection.js');
const { queryData } = require('./query.js');

// Documentação:
// Função para atualizar dados em uma tabela específica no banco de dados.
// A função recebe o nome da tabela, um código específico para identificar o registro a ser atualizado, o nome da coluna a ser atualizada e os novos valores.
// Com o nome da tabela, a função constrói o nome da coluna correspondente e executa uma consulta SQL para atualizar os dados filtrados.

async function updateData(table, codigo, column, values) {
  // Criar conexão com o banco de dados.
  const db = createConnection();

  // Construir o nome da coluna.
  const coluna = `cod_${table.split("_")[1]}`;

  // Consulta SQL com placeholders para evitar injeção de SQL.
  const sql = `UPDATE ${table} SET ${column} = ? WHERE ${coluna} = ?`;

  // Executar a consulta.
  db.run(sql, [values, codigo], function (err) {
    if (err) {
      console.error('Erro ao atualizar dados:', err.message);
    } else {
      console.log(`Dados atualizados com sucesso! Linhas afetadas: ${this.changes}`);
      // Consultar os dados atualizados.
      queryData(table, codigo);
    }

    // Fechar a conexão após a execução.
    closeConnection(db);
  });
}

// Exemplo de atualização na tabela dim_especialidade.
//updateData('dim_especialidade', 2, 'dsc_especialidade', 'especialidade 1');