const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function queryData(table, codigo) {
  // Caminho do banco de dados
  const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

  // Criar conexão com o banco de dados
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
      return;
    }
    console.log('Banco de dados conectado com sucesso!');
  });

  // Construir o nome da coluna
  const coluna = `cod_${table.split("_")[0]}`;

  // Consulta ao banco de dados
  const query = `SELECT * FROM ${table} WHERE ${coluna} = ?`;

  db.all(query, [codigo], (err, rows) => {
    if (err) {
      console.error('Erro ao consultar dados:', err.message);
    } else {
      console.log(`${table} encontrados:`, rows);
    }

    // Fechar a conexão após a consulta
    db.close((closeErr) => {
      if (closeErr) {
        console.error('Erro ao fechar o banco de dados:', closeErr.message);
      } else {
        console.log('Conexão com o banco de dados fechada.');
      }
    });
  });
}

// Exemplo de uso
queryData("especialidade", 1);