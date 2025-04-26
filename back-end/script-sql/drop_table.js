// Script para remover a tabela do banco de dados SQLite.

// Function to drop the table.
// Importar as funções
const { createConnection, closeConnection } = require('./conection.js');

// Criar conexão.
const db = createConnection();

// Comando SQL para remover a tabela.
const sql = `DROP TABLE IF EXISTS ft_agenda`;
db.run(sql, (err) => {
  if (err) {
    console.error('Erro ao remover tabela:', err.message);
  } else {
    console.log('Tabela ft_agenda removida com sucesso!');
  }

  // Fechar a conexão.
  closeConnection(db);
});