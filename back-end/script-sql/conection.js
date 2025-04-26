//Function to crate the connection with the database.

// Importar o sqlite3.
const sqlite3 = require('sqlite3').verbose();   
// Importar o path.
const path = require('path');
// Caminho do banco de dados.
const dbPath = path.resolve(__dirname, '..', 'sqlite3', 'odonto_sys.db');

// Função para criar conexão com o banco de dados.
const createConnection = () => {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao abrir o banco de dados:', err.message);
    }
  });
  return db;
};

// Função para fechar a conexão com o banco de dados.
const closeConnection = (db) => {
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar o banco de dados:', err.message);
    }
  });
};

// Exportar as funções.
module.exports = { createConnection, closeConnection };
