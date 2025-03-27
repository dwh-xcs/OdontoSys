const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function insertData(dsc_especialidade, dsc_descricao) {
  // Caminho do banco de dados
  const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

  // Criar conexão com o banco de dados
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
      console.log('Banco de dados conectado com sucesso!');
    }
  });

  const sql = `INSERT INTO especialidade (dsc_especialidade, dsc_descricao) VALUES (?, ?)`;
  const values = [`${dsc_especialidade}`, `${dsc_descricao}`];

  db.run(sql, values, function (err) {
    if (err) {
      console.error('Erro ao inserir dados:', err.message);
    } else {
      console.log(`Dados inseridos com sucesso! ID: ${this.lastID}`);
    }
  });

  db.close();
}